import { SearchBooksParams, SearchBooksResponse } from '@/types/search';
import { kakaoApi } from './axiosInstance';

/**
 * 책 검색하기
 * @param SearchBooksParams
 * @returns SearchBooksResponse
 */
export const searchBooks = async ({
  query,
  page = 1,
  target,
}: SearchBooksParams): Promise<SearchBooksResponse> => {
  const { data } = await kakaoApi.get<SearchBooksResponse>('/search/book', {
    params: {
      query,
      page,
      target,
    },
  });

  return data;
};
