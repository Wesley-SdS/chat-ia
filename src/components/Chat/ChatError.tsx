/**
 * ChatError Component
 * Single Responsibility: Display error messages
 * Following SRP
 */

interface ChatErrorProps {
  error: string;
  onClose: () => void;
}

export function ChatError({ error, onClose }: ChatErrorProps) {
  return (
    <div className="flex justify-center mt-2">
      <div
        className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Erro: </strong>
        <span className="block sm:inline">{error}</span>
        <button
          onClick={onClose}
          className="absolute top-0 bottom-0 right-0 px-4 py-3"
          aria-label="Fechar mensagem de erro"
        >
          <span className="text-red-700 dark:text-red-200">×</span>
        </button>
      </div>
    </div>
  );
}


