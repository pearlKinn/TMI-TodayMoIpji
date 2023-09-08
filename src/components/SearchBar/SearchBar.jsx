import { useRef } from 'react';
import S from './SearchBar.module.css';
import { useState } from 'react';
import debounce from '@/utils/debounce';
function SearchBar() {
  const inputRef = useRef(null);
  const [formState, setFormState] = useState('');

  const handleInput = debounce((e) => {
    const { value } = e.target;
    setFormState(value);
  }, 400);

  return (
    <div className={S.searchWrapper}>
      <label htmlFor="search" className={S.searchLabel}>
        search
      </label>
      <input
        type="text"
        id="search"
        className={S.searchInput}
        ref={inputRef}
        defaultValue={formState.value}
        onChange={handleInput}
      ></input>
      <button
        onClick={() => {
          console.log(inputRef.current.value);
        }}
        type="button"
        className={S.searchButton}
      >
        <img src="/public/Search.svg" alt="search" />
      </button>
    </div>
  );
}

export default SearchBar;
