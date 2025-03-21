import { cn } from '@/utils/styles';
import Typography from './Typography';

interface ListTitleProps {
  title: string;
  totCnt?: number;
  className?: string;
}
const ListTitle = ({ title, totCnt, className }: ListTitleProps) => {
  return (
    <div className={cn('flex gap-4', className)}>
      <Typography variant="caption" className="leading-6">
        {title}
      </Typography>
      {totCnt && (
        <Typography variant="caption" className="leading-6">
          총 <span className="text-primary">{totCnt.toLocaleString()}</span>건
        </Typography>
      )}
    </div>
  );
};

export default ListTitle;
