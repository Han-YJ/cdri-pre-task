import CloseIcon from '@/icons/close.svg?react';
import { Button } from './shared/Button';
import Typography from './shared/Typography';
import ArrowIcon from '@/icons/arrow.svg?react';

interface SearchDetailContentProps {
  onClose: () => void;
}
import { useState } from 'react';
import { SearchTarget } from '@/types/search';
import { useSetAtom } from 'jotai';
import { searchParamsAtom } from '@/atoms/searchAtoms';

type targetOption = {
  name: string;
  value: SearchTarget;
};
const targetOptions: targetOption[] = [
  { name: '제목', value: 'title' },
  { name: '저자명', value: 'person' },
  { name: '출판사', value: 'publisher' },
];

const SearchDetailContent = ({ onClose }: SearchDetailContentProps) => {
  const setSearchParams = useSetAtom(searchParamsAtom);
  const [query, setQuery] = useState('');
  const [searchTarget, setSearchTarget] = useState<targetOption>(targetOptions[0]);
  const [isOptionOpen, setIsOptionOpen] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleOptionClick = (option: targetOption) => {
    setSearchTarget(option);
    setIsOptionOpen(false);
  };

  // 상세 검색하기
  const handleDetailSearch = () => {
    if (query.length === 0) return;
    setSearchParams((prev) => ({ ...prev, query, target: searchTarget.value }));
    onClose();
  };

  return (
    <div className="w-[360px] py-2">
      <CloseIcon
        onClick={onClose}
        className="text-text-secondary absolute top-2 right-2 h-5 w-5 cursor-pointer"
      />
      <div className="mb-4 flex w-full gap-1">
        <div className="relative inline-block">
          {/* 커스텀 드롭다운 */}
          <div className="absolute top-full left-0 w-full bg-white shadow-lg">
            {isOptionOpen && (
              <ul className="p-2">
                {targetOptions.map((option, idx) => (
                  <li
                    key={`option_${idx}`}
                    value={option.value}
                    onClick={() => handleOptionClick(option)}
                    className="h-[30px] cursor-pointer"
                  >
                    <Typography variant="body2" as="span" color="subtitle">
                      {option.name}
                    </Typography>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 선택된 옵션을 보여주는 영역 */}
          <div
            onClick={() => setIsOptionOpen(!isOptionOpen)}
            className="border-b-border-gray flex h-9 w-25 cursor-pointer items-center justify-between border-b p-2"
          >
            <Typography variant="body2" as="span" bold>
              {searchTarget.name}
            </Typography>

            <ArrowIcon />
          </div>
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
