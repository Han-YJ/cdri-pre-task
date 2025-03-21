import { cn } from '@/utils/styles';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  anchorRef?: React.RefObject<HTMLElement | null>;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  allowBackgroundInteraction?: boolean; // 기존 페이지 사용 허용 여부
}

const Modal = ({
  isOpen,
  onClose,
  children,
  anchorRef,
  position = 'center',
  allowBackgroundInteraction = false,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [styles, setStyles] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (isOpen && anchorRef?.current) {
      const anchorRect = anchorRef.current.getBoundingClientRect();
      const modalElement = modalRef.current;

      if (modalElement) {
        let newStyles: React.CSSProperties = { position: 'absolute' };

        switch (position) {
          case 'bottom':
            newStyles = {
              ...newStyles,
              top: anchorRect.bottom + 8,
              left: anchorRect.left + anchorRect.width / 2 - modalElement.offsetWidth / 2, // 부모의 가로 중앙에 맞추기
            };
            break;
          case 'top':
            newStyles = {
              ...newStyles,
              top: anchorRect.top - modalElement.offsetHeight - 8,
              left: anchorRect.left,
            };
            break;
          case 'left':
            newStyles = {
              ...newStyles,
              top: anchorRect.top,
              left: anchorRect.left - modalElement.offsetWidth - 8,
            };
            break;
          case 'right':
            newStyles = { ...newStyles, top: anchorRect.top, left: anchorRect.right + 8 };
            break;
          case 'center':
          default:
            newStyles = {
              ...newStyles,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            };
            break;
        }

        setStyles(newStyles);
      }
    }
  }, [isOpen, anchorRef, position]);

  if (!isOpen) return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay  */}
      {!allowBackgroundInteraction && (
        <div
          className="bg-opacity-10 pointer-events-auto absolute inset-0 bg-black"
          onClick={onClose}
        />
      )}

      <div
        ref={modalRef}
        style={anchorRef ? styles : undefined}
        className={cn(
          'pointer-events-auto rounded-lg bg-white p-6 shadow-lg',
          anchorRef ? 'absolute z-50' : 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
