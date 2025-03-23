import { useState, useRef, useEffect } from 'react';
import ArrowIcon from '@/assets/icons/arrow.svg?react';
import Typography from './Typography';

export type Option = {
  value: string;
  name: string;
};

interface DropdownProps {
  options: Option[];
  selected: Option;
  onSelect: (option: Option) => void;
  placeholder?: string;
}

const Dropdown = ({ options, selected, onSelect, placeholder = '선택하세요' }: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 바깥 클릭 시 드롭다운 닫기
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block w-full">
      {/* 선택된 옵션을 보여주는 영역 */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="border-b-border-gray flex h-9 w-full cursor-pointer items-center justify-between border-b p-2 select-none"
      >
        <Typography variant="body2" as="span" bold>
          {selected?.name || placeholder}
        </Typography>
        <ArrowIcon
          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {/* 옵션 리스트 */}
      {isOpen && (
        <div className="absolute top-full left-0 z-10 mt-2 w-full bg-white shadow-lg">
          <ul className="p-2">
            {options.map((option) => {
              if (option.value === selected.value) return null;
              return (
                <li
                  key={option.value}
                  onClick={() => {
                    onSelect(option);
                    setIsOpen(false);
                  }}
                  className="hover:text-text-secondary h-[30px] cursor-pointer"
                >
                  <Typography variant="body2" as="span" color="subtitle" className="select-none">
                    {option.name}
                  </Typography>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
