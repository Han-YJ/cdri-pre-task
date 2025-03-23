import { useAtom } from 'jotai';
import { likedBooksAtom } from '@/atoms/likeAtoms';
import { Book } from '@/types/like';

export const useLikedBooks = () => {
  const [likedBooks, setLikedBooks] = useAtom(likedBooksAtom);

  const addLikedBooks = (book: Book) => {
    if (!likedBooks.some((likedBook) => likedBook.isbn === book.isbn)) {
      setLikedBooks((prev) => [...prev, book]);
    }
  };

  const removeLikedBooks = (isbn: string) => {
    setLikedBooks((prev) => prev.filter((book) => book.isbn !== isbn)); // 찜 목록에서 삭제
  };

  const checkIsLikedBook = (isbn: string) => {
    return likedBooks.some((book) => book.isbn === isbn);
  };

  return {
    likedBooks,
    addLikedBooks,
    removeLikedBooks,
    checkIsLikedBook,
  };
};
