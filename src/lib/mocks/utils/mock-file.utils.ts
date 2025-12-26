/**
 * Mock File Utilities
 * Single Responsibility: Create mock File objects for testing
 * Following SRP
 */

export class MockFileUtils {
  /**
   * Creates a mock File object
   */
  static createMockFile(
    name: string,
    content: string,
    type: string = 'text/plain'
  ): File {
    const blob = new Blob([content], { type });
    return new File([blob], name, { type });
  }

  /**
   * Creates a mock text file
   */
  static createMockTextFile(name: string = 'test.txt', content?: string): File {
    return this.createMockFile(
      name,
      content || 'Este é um arquivo de texto de exemplo.\n\nConteúdo para testes.',
      'text/plain'
    );
  }

  /**
   * Creates a mock markdown file
   */
  static createMockMarkdownFile(name: string = 'test.md', content?: string): File {
    return this.createMockFile(
      name,
      content || '# Documento Markdown\n\nConteúdo de exemplo.',
      'text/markdown'
    );
  }

  /**
   * Creates a mock CSV file
   */
  static createMockCSVFile(name: string = 'test.csv', content?: string): File {
    return this.createMockFile(
      name,
      content || 'Nome,Idade\nJoão,30\nMaria,25',
      'text/csv'
    );
  }

  /**
   * Creates a mock PDF file (simulated)
   */
  static createMockPDFFile(name: string = 'test.pdf'): File {
    // Create a file that simulates PDF
    const blob = new Blob(['PDF content'], { type: 'application/pdf' });
    return new File([blob], name, { type: 'application/pdf' });
  }

  /**
   * Creates a mock Word file (simulated)
   */
  static createMockWordFile(name: string = 'test.docx'): File {
    const blob = new Blob(['Word content'], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    return new File([blob], name, {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
  }
}

