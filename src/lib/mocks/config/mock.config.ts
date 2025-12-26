/**
 * Mock Configuration
 * Single Responsibility: Manage mock settings
 * Following SRP
 */

export class MockConfig {
  /**
   * Checks if mocks should be enabled
   */
  static isMockEnabled(): boolean {
    return process.env.NEXT_PUBLIC_USE_MOCKS === 'true' || 
           process.env.NODE_ENV === 'test' ||
           !process.env.OPENAI_API_KEY;
  }

  /**
   * Gets mock delay in milliseconds
   */
  static getMockDelay(): number {
    return parseInt(process.env.NEXT_PUBLIC_MOCK_DELAY || '1000', 10);
  }

  /**
   * Checks if should use mock OpenAI
   */
  static shouldUseMockOpenAI(): boolean {
    return this.isMockEnabled() && process.env.NEXT_PUBLIC_MOCK_OPENAI !== 'false';
  }

  /**
   * Checks if should use mock documents
   */
  static shouldUseMockDocuments(): boolean {
    return this.isMockEnabled() && process.env.NEXT_PUBLIC_MOCK_DOCUMENTS !== 'false';
  }
}

