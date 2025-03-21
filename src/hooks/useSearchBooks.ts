import { searchBooks } from '@/api/kakao';
import { useAtomValue } from 'jotai';
import { useInfiniteQuery } from '@tanstack/react-query';
import { searchParamsAtom } from '@/atoms/searchAtoms';
import { SearchBooksResponse } from '@/types/search';

/**
 * 책 검색하기
 * @param SearchBooksParams
 * @returns data - 검색 결과의 책 목록, 페이지별로 합쳐져 반환됨
 * @returns metaData - 검색 결과의 메타 데이터 (전체 페이지 수, 검색된 책의 수 등)
 * @returns isLoading - 검색 데이터가 로딩 중인지 여부
 * @returns hasNextPage - 다음 페이지가 존재하는지 여부
 * @returns fetchNextPage - 다음 페이지 데이터를 가져오는 함수
 */
export const useSearchBooks = () => {
  const params = useAtomValue(searchParamsAtom);
  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['searchBooks', params],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => searchBooks({ ...params, page: pageParam }),
    getNextPageParam: (lastPage: SearchBooksResponse, allPages) => {
      return lastPage.meta.is_end ? undefined : allPages.length + 1; // 다음 페이지 번호
    },
    enabled: !!params.query, // 검색어가 있을 때만 실행
  });

  return {
    data: data?.pages.map((meta) => meta.documents).flat() || [],
    metaData: data?.pages[0].meta,
    isLoading,
    hasNextPage,
    fetchNextPage,
  };
};
