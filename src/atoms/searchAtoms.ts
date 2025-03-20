import { atom } from 'jotai';
import { SearchBooksParams } from '@/types/search';

export const searchParamsAtom = atom<SearchBooksParams>({
  query: '',
  page: 1,
  target: undefined,
});
