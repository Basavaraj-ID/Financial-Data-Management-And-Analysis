import { FC, memo, useRef } from 'react';
import { BiSearch } from "react-icons/bi";
import { SEARCH_TEXT } from '../../../utils/constants';


const Search: FC<SearchProps> = ({ value, onChange, placeholder = SEARCH_TEXT, textColor }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="flex items-center rounded-lg px-4 py-2 w-full bg-tertiary">
      <input
        ref={inputRef}
        type="text"
        className={`mx-1 w-full outline-none bg-transparent text-sm ${textColor && `text-${textColor} placeholder-${textColor}`}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <BiSearch
        className="cursor-pointer ml-1 text-xl shrink-0"
        onClick={handleIconClick}
      />
    </div>
  );
};

export default memo(Search);
