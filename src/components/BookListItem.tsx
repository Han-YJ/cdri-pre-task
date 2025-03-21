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
  const { title, thumbnail } = data;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetail = () => setIsOpen((prev) => !prev);

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
        <InfoHeader isOpen={isOpen} handleToggleDetail={toggleDetail} {...data} />
        <InfoDetails isOpen={isOpen} {...data} />
      </div>
    </div>
  );
};

export default BookListItem;

type InfoHeaderProps = Partial<BookListItemProps['data']> & {
  handleToggleDetail: () => void;
  isOpen?: boolean;
};
const InfoHeader = ({
  title,
  authors,
  price,
  sale_price,
  isOpen,
  handleToggleDetail,
}: InfoHeaderProps) => {
  const displayPrice = (sale_price ?? price ?? '').toLocaleString() + '원';

  return (
    <div className={cn('flex w-full items-center justify-between gap-14', isOpen && 'mb-4')}>
      <div className="flex w-full justify-between">
        {/** 제목 & 저자 */}
        <div className="flex items-center gap-4">
          <Typography variant="title3" className="">
            {title}
          </Typography>
          <Typography variant="body2" color="secondary">
            {authors}
          </Typography>
        </div>

        {/** 가격 */}
        {!isOpen && <Typography variant="title3">{displayPrice}</Typography>}
      </div>

      {/** 버튼 영역 */}
      <div className={cn('shirink-0 flex items-center gap-2')}>
        <Button className={cn(isOpen && 'hidden')}>구매하기</Button>
        <Button variant="secondary" onClick={handleToggleDetail}>
          상세보기 <ArrowIcon className={cn('mx-1', isOpen && 'rotate-180')} />
        </Button>
      </div>
    </div>
  );
};

type InfoDetailsProps = { isOpen: boolean } & BookListItemProps['data'];
const InfoDetails = ({ contents, price, sale_price, isOpen }: InfoDetailsProps) => {
  if (!isOpen) return null;

  return (
    <div className={'flex h-full w-full justify-between'}>
      {/** 책 소개 */}
      <div className={'w-[360px]'}>
        <Typography as="h6" variant="body2" bold className="mb-3">
          책 소개
        </Typography>
        <Typography variant="small" className="leading-4">
          {contents}
        </Typography>
      </div>

      <div className="flex flex-col justify-end gap-7">
        {/** 가격 */}
        <div className="flex flex-col">
          <span className="flex items-center justify-end gap-2">
            <Typography variant="small" color="subtitle">
              원가
            </Typography>
            <Typography
              variant="body1"
              className={cn('text-lg font-light', sale_price && 'line-through')}
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
  );
};
