/**
 * Environment Configuration
 * Single Responsibility: Validate and provide environment variables
 * Following SRP and Fail-Fast principle
 */

export class EnvironmentConfig {
  private static validated = false;

  /**
   * Validates all required environment variables
   */
  static validate(): void {
    if (this.validated) {
      return;
    }

    // If mocks are enabled, skip validation
    if (process.env.NEXT_PUBLIC_USE_MOCKS === 'true' || process.env.NODE_ENV === 'test') {
      this.validated = true;
      return;
    }

    const required = ['OPENAI_API_KEY'];
    const missing: string[] = [];

    for (const key of required) {
      if (!process.env[key]) {
        missing.push(key);
      }
    }

    if (missing.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missing.join(', ')}`
      );
    }

    // Validate OpenAI API key format
    if (!process.env.OPENAI_API_KEY?.startsWith('sk-')) {
      throw new Error('Invalid OPENAI_API_KEY format');
    }

    this.validated = true;
  }

  /**
   * Gets OpenAI API key
   */
  static getOpenAIApiKey(): string {
    this.validate();
    return process.env.OPENAI_API_KEY!;
  }

  /**
   * Gets Node environment
   */
  static getNodeEnv(): 'development' | 'production' | 'test' {
    return (process.env.NODE_ENV as any) || 'development';
  }

  /**
   * Checks if running in development
   */
  static isDevelopment(): boolean {
    return this.getNodeEnv() === 'development';
  }

  /**
   * Gets app URL
   */
  static getAppUrl(): string {
    return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  }
}


