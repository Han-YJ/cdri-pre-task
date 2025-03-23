import LikeLineIcon from '@/assets/icons/like-line.svg?react';
import LikeFillIcon from '@/assets/icons/like-fill.svg?react';
import { useLikedBooks } from '@/hooks/useLikedBooks';
import { Book } from '@/types/like';

interface BookLikeIcon {
  size: number;
  bookData: Book;
  className?: string;
}

/**
 * BookLikeIcon component
 *
 * @param size 아이콘의 크기
 * @param bookData 찜하기 여부를 확인할 책 데이터 (ISBN 필수)
 * @param className 아이콘에 추가할 스타일링 클래스
 */
const BookLikeIcon = ({ size, bookData, className }: BookLikeIcon) => {
  const { addLikedBooks, removeLikedBooks, checkIsLikedBook } = useLikedBooks();

  return (
    <span className={className}>
      {checkIsLikedBook(bookData.isbn) ? (
        <LikeFillIcon width={size} height={size} onClick={() => removeLikedBooks(bookData.isbn)} />
      ) : (
        <LikeLineIcon width={size} height={size} onClick={() => addLikedBooks(bookData)} />
      )}
    </span>
  );
};

export default BookLikeIcon;
