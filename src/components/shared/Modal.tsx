import { cn } from '@/utils/styles';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  anchorRef?: React.RefObject<HTMLElement | null>;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  allowBackgroundInteraction?: boolean; // 기존 페이지 사용 허용 여부 (& overlay)
}

/**
 * Modal component
 * @param isOpen
 * @param onClose
 * @param children
 * @param anchorRef 모달의 위치 설정할 ref (optional)
 * @param position 모달의 위치 설정 ('top', 'bottom', 'left', 'right', 'center')
 * @param allowBackgroundInteraction 배경 클릭 시 모달이 닫히지 않도록 설정하는 옵션 (기본값: false)
 */
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

  const getModalPosition = (anchorRect: DOMRect, modalElement: HTMLElement) => {
    const baseStyles: React.CSSProperties = { position: 'absolute' };

    switch (position) {
      case 'bottom':
        return {
          ...baseStyles,
          top: anchorRect.bottom + 8,
          left: anchorRect.left + anchorRect.width / 2 - modalElement.offsetWidth / 2,
        };
      case 'top':
        return {
          ...baseStyles,
          top: anchorRect.top - modalElement.offsetHeight - 8,
          left: anchorRect.left,
        };
      case 'left':
        return {
          ...baseStyles,
          top: anchorRect.top,
          left: anchorRect.left - modalElement.offsetWidth - 8,
        };
      case 'right':
        return { ...baseStyles, top: anchorRect.top, left: anchorRect.right + 8 };
      case 'center':
      default:
        return {
          ...baseStyles,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        };
    }
  };

  const modalStyles = useMemo(() => {
    if (isOpen && anchorRef?.current && modalRef.current) {
      const anchorRect = anchorRef.current.getBoundingClientRect();
      const modalElement = modalRef.current;
      return getModalPosition(anchorRect, modalElement);
    }
    return {};
  }, [isOpen, anchorRef, position]);

  useEffect(() => {
    if (isOpen) {
      setStyles(modalStyles);
    }
  }, [modalStyles, isOpen]);

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
