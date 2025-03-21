import { atom } from 'jotai';
import { SearchBooksParams } from '@/types/search';
import { atomWithStorage } from 'jotai/utils';

export const searchParamsAtom = atom<SearchBooksParams>({
  query: '',
  page: 1,
  target: undefined,
});

const SEARCH_HISTORY_KEY = 'searchHistory';
export const searchHistoryAtom = atomWithStorage<string[]>(SEARCH_HISTORY_KEY, []);
