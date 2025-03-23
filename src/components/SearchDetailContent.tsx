import { Button } from './shared/Button';
import Typography from './shared/Typography';
import CloseIcon from '@/assets/icons/close.svg?react';

interface SearchDetailContentProps {
  onClose: () => void;
}
import { useState } from 'react';
import { SearchTarget } from '@/types/search';
import { useSetAtom } from 'jotai';
import { searchParamsAtom } from '@/atoms/searchAtoms';
import Dropdown, { Option } from './shared/Dropdown';

const targetOptions: Option[] = [
  { name: '제목', value: 'title' },
  { name: '저자명', value: 'person' },
  { name: '출판사', value: 'publisher' },
];

const SearchDetailContent = ({ onClose }: SearchDetailContentProps) => {
  const setSearchParams = useSetAtom(searchParamsAtom);
  const [query, setQuery] = useState('');
  const [searchTarget, setSearchTarget] = useState<Option>(targetOptions[0]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // 상세 검색하기
  const handleDetailSearch = () => {
    if (query.length === 0) return;
    setSearchParams((prev) => ({ ...prev, query, target: searchTarget.value as SearchTarget }));
    onClose();
  };

  return (
    <div className="w-[360px] py-2">
      <CloseIcon
        onClick={onClose}
        className="text-text-secondary absolute top-2 right-2 h-5 w-5 cursor-pointer"
      />
      <div className="mb-4 flex w-full gap-1">
        <div className="w-25">
          <Dropdown options={targetOptions} selected={searchTarget} onSelect={setSearchTarget} />
        </div>

        <div className="border-b-primary flex w-full justify-start border-b pl-1">
          <input
            type="text"
            onChange={handleInputChange}
            placeholder="검색어 입력"
            className="focus:outline-none"
          />
        </div>
      </div>

      <Button size="full" className="h-9" onClick={handleDetailSearch}>
        <Typography variant="body2" className="text-white">
          검색하기
        </Typography>
      </Button>
    </div>
  );
};

export default SearchDetailContent;
