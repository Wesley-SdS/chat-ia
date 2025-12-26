/**
 * Error Handler Service
 * Single Responsibility: Handle and format errors
 * Following SRP and Single Responsibility Principle
 */

import OpenAI from 'openai';

// Response is a global Web API in Edge Runtime, no need to import

export class ErrorHandlerService {
  /**
   * Handles OpenAI API errors
   */
  static handleOpenAIError(error: unknown): Response {
    if (error instanceof OpenAI.APIError) {
      console.error('OpenAI API Error:', {
        status: error.status,
        message: error.message,
        code: error.code,
      });

      return new Response(
        JSON.stringify({
          error: 'OpenAI API error',
          message: this.getUserFriendlyMessage(error),
        }),
        {
          status: error.status || 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return this.handleGenericError(error);
  }

  /**
   * Handles generic errors
   */
  static handleGenericError(error: unknown): Response {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';

    console.error('Unexpected error:', error);

    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: isDevelopment ? errorMessage : 'An unexpected error occurred. Please try again later.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  /**
   * Handles validation errors
   */
  static handleValidationError(message: string): Response {
    return new Response(
      JSON.stringify({
        error: 'Validation error',
        message,
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  /**
   * Handles JSON parsing errors
   */
  static handleJsonParseError(): Response {
    return new Response(
      JSON.stringify({
        error: 'Invalid request',
        message: 'Invalid JSON in request body',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  /**
   * Gets user-friendly error messages
   */
  private static getUserFriendlyMessage(error: OpenAI.APIError): string {
    if (error.status === 401) {
      return 'Invalid API key. Please check your configuration.';
    }
    if (error.status === 429) {
      return 'Rate limit exceeded. Please try again later.';
    }
    if (error.status === 500) {
      return 'OpenAI service is temporarily unavailable. Please try again later.';
    }
    return error.message || 'An error occurred while processing your request';
  }
}


