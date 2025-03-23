import LikeLineIcon from '@/assets/icons/like-line.svg?react';
import LikeFillIcon from '@/assets/icons/like-fill.svg?react';
import { useLikedBooks } from '@/hooks/useLikedBooks';
import { Book } from '@/types/like';

interface BookLikeIcon {
  size: number;
  bookData: Book;
  className?: string;
}
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
