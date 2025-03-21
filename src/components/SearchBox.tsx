import { useState } from 'react';
import { useAtom } from 'jotai';
import { Button } from './shared/Button';
import Typography from './shared/Typography';
import CloseIcon from '@/icons/close.svg?react';
import SearchIcon from '@/icons/search.svg?react';
import { useSearchHistory } from '@/hooks/useSearchHistory';
import { searchParamsAtom } from '@/atoms/searchAtoms';
import { cn } from '@/utils/styles';

const SearchBox = () => {
  const [searchParams, setSearchParams] = useAtom(searchParamsAtom);
  const { searchHistory, addSearchQuery } = useSearchHistory();
  const [query, setQuery] = useState(searchParams.query || '');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchQuery = (query: string) => {
    setSearchParams({ ...searchParams, query });
    addSearchQuery(query);
    setIsInputFocused(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (query.length === 0) return;
    if (event.key === 'Enter') handleSearchQuery(query);
  };

  //상세검색
  //const handleDetailSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
  //  e.preventDefault();
  //  console.log('상세검색');
  //};

  // history
  const handleSelectHistory = (query: string) => {
    setQuery(query);
    handleSearchQuery(query);
  };
  const handleFocus = () => {
    if (searchHistory.length === 0) return;
    setIsInputFocused(true);
  };
  const handleBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <div className="flex min-h-[100px] max-w-[568px] flex-col gap-4">
      <Typography as="h2" variant="title2" className="text-black">
        도서 검색
      </Typography>

      <div className="relative flex-grow justify-start">
        <div className="absolute top-0 left-0 z-10 flex gap-2">
          <div
            className={cn(
              'bg-lightGray w-[480px] p-2.5 placeholder:text-base placeholder:leading-4',
              isInputFocused ? 'rounded-3xl pb-6' : 'rounded-full'
            )}
          >
            {/* 검색 input */}
            <div className="flex items-center gap-5">
              <SearchIcon />
              <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder="검색어를 입력하세요"
                className="w-full outline-none focus:outline-none"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* 검색 history */}
            <SearchHistory isShow={isInputFocused} handleSelectHistory={handleSelectHistory} />
          </div>

          {/* 상세검색 button*/}
          <div className="flex h-[50px] items-center justify-center">
            <Button variant="outline" size="sm">
              상세검색
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;

interface SearchHistoryProps {
  isShow: boolean;
  handleSelectHistory: (query: string) => void;
}
const SearchHistory = ({ isShow, handleSelectHistory }: SearchHistoryProps) => {
  const { searchHistory, removeSearchQuery } = useSearchHistory();

  if (!isShow) return null;
  if (searchHistory.length === 0) return null;

  return (
    <ul className="ml-12 flex flex-col gap-4 pt-4.5 pr-6" onMouseDown={(e) => e.preventDefault()}>
      {searchHistory.map((historyQuery) => (
        <li
          key={historyQuery}
          className="hover:text-text-primary flex cursor-pointer items-center justify-between"
          onClick={() => handleSelectHistory(historyQuery)}
        >
          <Typography variant="caption" color="subtitle">
            {historyQuery}
          </Typography>
          <CloseIcon
            onClick={(e) => {
              e.stopPropagation();
              removeSearchQuery(historyQuery);
            }}
          />
        </li>
      ))}
    </ul>
  );
};
