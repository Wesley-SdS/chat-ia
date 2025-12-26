/**
 * Rate Limiter Service
 * Single Responsibility: Handle rate limiting
 * Following SRP - can be extended with different implementations
 */

import { RateLimitResult } from '@/types/chat.types';
import { RATE_LIMIT_CONFIG } from '@/constants/chat.constants';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

/**
 * In-memory rate limiter (for edge runtime)
 * For production, consider using Redis/Upstash
 */
export class RateLimiterService {
  private store: RateLimitStore = {};
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(
    maxRequests = RATE_LIMIT_CONFIG.MAX_REQUESTS,
    windowMs = RATE_LIMIT_CONFIG.WINDOW_MS
  ) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  /**
   * Checks if request is allowed and increments counter
   */
  checkLimit(identifier: string): RateLimitResult {
    const now = Date.now();
    const record = this.store[identifier];

    // Clean up expired records
    this.cleanup(now);

    if (!record || now > record.resetTime) {
      // Create new record
      this.store[identifier] = {
        count: 1,
        resetTime: now + this.windowMs,
      };
      return {
        allowed: true,
        remaining: this.maxRequests - 1,
        reset: now + this.windowMs,
      };
    }

    if (record.count >= this.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        reset: record.resetTime,
      };
    }

    // Increment counter
    record.count++;
    return {
      allowed: true,
      remaining: this.maxRequests - record.count,
      reset: record.resetTime,
    };
  }

  /**
   * Gets client identifier from request
   */
  static getClientIdentifier(req: Request): string {
    // In production, use IP address or user ID
    // For edge runtime, we'll use a combination of headers
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const ip = forwarded?.split(',')[0] || realIp || 'unknown';
    
    // You can also use user ID from auth token if available
    return ip;
  }

  /**
   * Cleans up expired records
   */
  private cleanup(now: number): void {
    Object.keys(this.store).forEach((key) => {
      if (now > this.store[key].resetTime) {
        delete this.store[key];
      }
    });
  }

  /**
   * Resets rate limit for an identifier (useful for testing)
   */
  reset(identifier: string): void {
    delete this.store[identifier];
  }
}

// Singleton instance for edge runtime
export const rateLimiter = new RateLimiterService();


