import { JSX, ReactNode } from 'react';
import { cn } from '@/utils/styles';

type Variant = 'title1' | 'title2' | 'title3' | 'body1' | 'body2' | 'caption' | 'small';

interface TypographyProps {
  variant: Variant;
  as?: keyof JSX.IntrinsicElements; // "h1" | "h2" | "p" | "span" 등
  bold?: boolean;
  children: ReactNode;
  className?: string;
}

const typographyStyles: Record<Variant, string> = {
  title1: 'text-2xl text-bold',
  title2: 'text-[22px] text-bold',
  title3: 'text-lg text-bold',
  body1: 'text-xl',
  body2: 'text-sm',
  caption: 'text-base text-gray-500',
  small: 'text-[10px]',
};

const Typography = ({ as: Tag = 'p', variant, bold, className, children }: TypographyProps) => {
  return (
    <Tag className={cn(typographyStyles[variant], bold && 'font-bold', 'font-medium', className)}>
      {children}
    </Tag>
  );
};

export default Typography;

/* body1 예제 텍스트 */
