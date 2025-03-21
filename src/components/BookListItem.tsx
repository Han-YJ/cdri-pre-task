import { useState } from 'react';
import { SearchBooksResponse } from '@/types/search';
import Typography from './shared/Typography';
import { cn } from '@/utils/styles';
import { Button } from './shared/Button';
import ArrowIcon from '@/icons/arrow.svg?react';

type BookListItemProps = {
  data: SearchBooksResponse['documents'][0];
};
const BookListItem = ({ data }: BookListItemProps) => {
  const { title, thumbnail, authors, price, sale_price, contents } = data;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetail = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={cn('flex border-b border-b-[#D2D6DA]', isOpen ? 'h-auto py-6' : 'h-[100px]')}>
      <img
        src={thumbnail}
        alt={`${title} img`}
        className={cn('shrink-0 object-contain', isOpen ? 'h-[280px] w-[210px]' : 'w-[48px]')}
      />
      <div
        className={cn(
          'flex w-full flex-col items-center py-0.5 pr-[16px]',
          isOpen ? 'justify-start pl-8' : 'justify-center pl-12'
        )}
      >
        <div className={cn('flex w-full items-center justify-between gap-14', isOpen && 'mb-4')}>
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-4">
              <Typography variant="title3" className="">
                {title}
              </Typography>
              <Typography variant="body2" color="secondary">
                {authors}
              </Typography>
            </div>
            <Typography variant="title3" className={cn(isOpen && 'hidden')}>
              {(sale_price ?? price).toLocaleString()}원
            </Typography>
          </div>

          <div className={cn('shirink-0 flex items-center gap-2')}>
            <Button className={cn(isOpen && 'hidden')}>구매하기</Button>
            <Button variant="secondary" onClick={toggleDetail}>
              상세보기 <ArrowIcon className="pl-1.5" />
            </Button>
          </div>
        </div>

        {/**상세보기시 보이는 부분 */}
        <div className={cn('flex h-full w-full justify-between', !isOpen && 'hidden')}>
          <div className={cn('w-[360px]')}>
            <Typography as="h6" variant="body2" bold className="mb-3">
              책 소개
            </Typography>
            <Typography variant="small" className="leading-4">
              {contents}
            </Typography>
          </div>

          <div className="flex flex-col justify-end gap-7">
            <div className="flex flex-col">
              <span className="flex items-center justify-end gap-2">
                <Typography variant="small" color="subtitle">
                  원가
                </Typography>
                <Typography
                  variant="body1"
                  className={`text-lg font-light ${sale_price && 'line-through'}`}
                >
                  {price.toLocaleString()}원
                </Typography>
              </span>

              {sale_price && (
                <span className="flex items-center justify-end gap-2">
                  <Typography variant="small" color="subtitle">
                    할인가
                  </Typography>
                  <Typography variant="body1" className="text-lg" bold>
                    {sale_price.toLocaleString()}원
                  </Typography>
                </span>
              )}
            </div>
            <Button variant="primary" size="lg">
              구매하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookListItem;
