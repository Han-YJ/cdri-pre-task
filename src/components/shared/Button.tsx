import { cn } from '@/utils/styles';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'lg' | 'md' | 'sm' | 'full';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const baseStyles = 'flex justify-center items-center rounded-lg h-12 shrink-0 cursor-pointer';
const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white',
  secondary: 'bg-lightGray text-text-secondary',
  outline: 'bg-white border border-text-subtitle text-text-subtitle',
};
const sizeStyles: Record<ButtonSize, string> = {
  lg: 'w-[240px]',
  md: 'w-[115px]',
  sm: 'w-auto px-[10px] h-[35px]',
  full: 'w-full',
};

/**
 * Button component
 * @param variant primary | secondary | outline
 * @param size lg | md | sm
 * @param disabled
 * @param onClick
 * @param children
 * @param className 기타 styling
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
