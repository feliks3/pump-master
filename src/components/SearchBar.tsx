import { useEffect, useState, useRef } from 'react';
import { Search } from 'lucide-react';
type Props = {
  searchTerm: string;
  onChange: (value: string) => void;
  onClear?: () => void;
};

const SearchBar = ({ searchTerm, onChange, onClear }: Props) => {
  const [show, setShow] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (show && inputRef.current) inputRef.current.focus();
  }, [show]);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setShow(!show)}
        className="p-2 rounded hover:bg-gray-200"
      >
        <Search className="w-5 h-5" />
      </button>

      <div
        className={`flex items-center border rounded transition-[width] duration-300 overflow-hidden ${
          show ? 'w-64 px-2' : 'w-0 px-0 border-0'
        }`}
        style={{ height: '40px' }}
      >
        <input
          ref={inputRef}
          className="flex-1 outline-none border-none text-sm bg-transparent"
          value={searchTerm}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search..."
        />
        <button
          className="ml-2 text-gray-500 hover:text-black"
          onClick={() => {
            setShow(false);
            onClear?.();
          }}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
