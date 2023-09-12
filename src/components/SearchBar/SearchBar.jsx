import debounce from '@/utils/debounce';
import { useState } from 'react';
import FormInput from '../FormInput/formInput';
import S from './SearchBar.module.css';

function SearchBar() {
  const [formState, setFormState] = useState('');

  const handleInput = debounce((e) => {
    const { value } = e.target;
    setFormState(value);
  }, 400);

  return (
    <div className={S.searchWrapper}>
      <FormInput
        type="search"
        id="search"
        name="search"
        label="검색창"
        defaultValue={formState.value}
        onChange={handleInput}
      />
      <button
        onClick={() => {
          console.log(formState);
        }}
        type="button"
        aria-label="검색하기"
        className={S.searchButton}
      >
        <img src="/public/Search.svg" alt="search" />
      </button>
    </div>
  );
}

export default SearchBar;
