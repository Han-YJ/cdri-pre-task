import { cn } from '@/utils/styles';
import Typography from './Typography';

interface NoDataProps {
  title: string;
  className?: string;
}
const NoData = ({ title, className }: NoDataProps) => {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-6', className)}>
      <img src="/images/icon_book.png" alt="book" width={80} height={80} />
      <Typography variant="caption" color="secondary" className="leading-6">
        {title}
      </Typography>
    </div>
  );
};

export default NoData;
