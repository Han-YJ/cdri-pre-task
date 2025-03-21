import { searchHistoryAtom } from '@/atoms/searchAtoms';
import { useAtom } from 'jotai';

const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  // 검색어 추가
  const addSearchQuery = (newQuery: string) => {
    setSearchHistory((prevHistory) => {
      // 새로운 검색어가 있으면 기존 검색어 중복 제거 후 최대 8개까지 저장
      const updatedHistory = [newQuery, ...prevHistory.filter((term) => term !== newQuery)].slice(
        0,
        8
      );
      return updatedHistory;
    });
  };

  // 검색어 제거
  const removeSearchQuery = (query: string) => {
    setSearchHistory((prevHistory) => prevHistory.filter((term) => term !== query));
  };

  return {
    searchHistory,
    addSearchQuery,
    removeSearchQuery,
  };
};

export default useSearchHistory;
