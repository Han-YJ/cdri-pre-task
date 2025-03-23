import { atomWithStorage } from 'jotai/utils';
import type { Book } from '@/types/like';

const LIKED_BOOKS_KEY = 'likedBooks';
export const likedBooksAtom = atomWithStorage<Book[]>(LIKED_BOOKS_KEY, []);
