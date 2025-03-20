import { useState } from 'react';
import { useAtom } from 'jotai';
import { searchParamsAtom } from '@/atoms/searchAtoms';
import Typography from './shared/Typography';
import SearchIcon from '@/icons/search.svg?react';

const SearchBox = () => {
  const [searchParams, setSearchParams] = useAtom(searchParamsAtom);
  const [query, setQuery] = useState(searchParams.query || '');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearchParams({ ...searchParams, query });
    }
  };

  const handleDetailSearch = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    event.preventDefault();
    console.log('상세검색');
  };

  return (
    <div className="flex flex-col gap-4 max-w-[568px] mx-auto">
      <Typography as="h2" variant="title2" className="text-black">
        도서 검색
      </Typography>

      <div className="flex items-center space-x-2 flex-grow">
        {/* 검색 input */}
        <div className="flex items-center p-2.5 gap-2.5 w-[480px] rounded-full bg-lightGray placeholder:text-base placeholder:leading-4">
          <SearchIcon />
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="검색어를 입력하세요"
            className="w-full outline-none focus:outline-none"
          />
        </div>

        {/* 상세검색 button*/}
        <button onClick={handleDetailSearch} className="text-sm">
          상세검색
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
