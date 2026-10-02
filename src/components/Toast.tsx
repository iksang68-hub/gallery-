import React from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <aside
      aria-label="알림 메시지"
      aria-live="polite"
      className="fixed top-24 right-4 sm:right-8 z-50 flex items-center gap-3 bg-[#0d150d] text-[#e1c718] border-2 border-[#e1c718] px-5 py-3.5 shadow-[0_4px_25px_rgba(225,199,24,0.4)] backdrop-blur-md transition-all duration-300 toast-enter rounded-none max-w-sm"
    >
      <div className="flex-1 font-mono-code text-sm font-semibold tracking-wide flex items-center gap-2">
        <span>{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-stone-400 hover:text-[#e1c718] text-xs font-mono-code p-1 transition-colors"
          aria-label="닫기"
        >
          ✕
        </button>
      )}
    </aside>
  );
};
