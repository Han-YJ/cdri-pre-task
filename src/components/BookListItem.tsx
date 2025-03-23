import { useState } from 'react';
import { SearchBooksResponse } from '@/types/search';
import Typography from './shared/Typography';
import { cn } from '@/utils/styles';
import { Button } from './shared/Button';
import ArrowIcon from '@/assets/icons/arrow.svg?react';

type BookListItemProps = {
  data: SearchBooksResponse['documents'][0];
};
const BookListItem = ({ data }: BookListItemProps) => {
  const { title, thumbnail, url } = data;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetail = () => setIsOpen((prev) => !prev);

  const handleOpenUrl = () => {
    url && window.open(url, '_blank');
  };

  return (
    <div className={cn('border-b-border-gray flex border-b', isOpen ? 'h-auto py-6' : 'h-[100px]')}>
      <div
        className={cn(
          isOpen ? 'w-[210px]' : 'w-[48px]',
          'flex shrink-0 items-center justify-center bg-white'
        )}
      >
        {thumbnail.length > 0 && (
          <img src={thumbnail} alt={`${title} img`} className={cn('')} width={'100%'} />
        )}
      </div>

      <div
        className={cn(
          'flex w-full flex-col items-center py-0.5 pr-[16px]',
          isOpen ? 'justify-start pl-8' : 'justify-center pl-12'
        )}
      >
        <InfoHeader
          isOpen={isOpen}
          handleToggleDetail={toggleDetail}
          handleOpenUrl={handleOpenUrl}
          {...data}
        />
        <InfoDetails isOpen={isOpen} handleOpenUrl={handleOpenUrl} {...data} />
      </div>
    </div>
  );
};

export default BookListItem;

/* InfoHeader - 리스트 기본으로 보이는 부분 */
type InfoHeaderProps = Partial<BookListItemProps['data']> & {
  handleToggleDetail: () => void;
  handleOpenUrl: () => void;
  isOpen?: boolean;
};
const InfoHeader = ({
  title,
  authors,
  price,
  sale_price,
  isOpen,
  handleToggleDetail,
  handleOpenUrl,
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
        <Button className={cn(isOpen && 'hidden')} onClick={handleOpenUrl}>
          구매하기
        </Button>
        <Button variant="secondary" onClick={handleToggleDetail}>
          상세보기 <ArrowIcon className={cn('mx-1', isOpen && 'rotate-180')} />
        </Button>
      </div>
    </div>
  );
};

/* InfoDetails - 상세보기시 보이는 부분 */

type InfoDetailsProps = { isOpen: boolean; handleOpenUrl: () => void } & BookListItemProps['data'];
const InfoDetails = ({ contents, price, sale_price, isOpen, handleOpenUrl }: InfoDetailsProps) => {
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

        <Button variant="primary" size="lg" onClick={handleOpenUrl}>
          구매하기
        </Button>
      </div>
    </div>
  );
};
