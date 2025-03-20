import { JSX, ReactNode } from 'react';
import { cn } from '@/utils/styles';

type Variant = 'title1' | 'title2' | 'title3' | 'body1' | 'body2' | 'caption' | 'small';
type Color = 'primary' | 'secondary' | 'subtitle';
interface TypographyProps {
  variant: Variant;
  as?: keyof JSX.IntrinsicElements; //
  bold?: boolean;
  color?: Color;
  children: ReactNode;
  className?: string;
}

const baseStyles = 'font-medium';
const variantStyles: Record<Variant, string> = {
  title1: 'text-2xl text-bold',
  title2: 'text-[22px] text-bold',
  title3: 'text-lg text-bold',
  body1: 'text-xl',
  body2: 'text-sm',
  caption: 'text-base',
  small: 'text-[10px]',
};
const colorStyles: Record<Color, string> = {
  primary: 'text-text-primary',
  secondary: 'text-text-secondary',
  subtitle: 'text-text-subtitle',
};

/**
 * Typography component
 * @param variant 폰트의 size, weight
 * @param as h1, h2, p, span...
 * @param bold title variant 를 제외한 typo의 bold 설정
 * @param color primary | secondary | subtitle
 * @param children ReactNode
 * @param className 기타 styling
 */
const Typography = ({
  variant,
  color = 'primary',
  as: Tag = 'p',
  bold,
  className,
  children,
}: TypographyProps) => {
  return (
    <Tag
      className={cn(
        baseStyles,
        variantStyles[variant],
        colorStyles[color],
        bold && 'font-bold',
        className
      )}
    >
      {children}
    </Tag>
  );
};

export default Typography;
