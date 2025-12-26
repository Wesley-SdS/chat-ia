/**
 * ChatLoading Component
 * Single Responsibility: Display loading indicator
 * Following SRP
 */

export function ChatLoading() {
  return (
    <div className="flex justify-center mt-2">
      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-orange-600" />
    </div>
  );
}


