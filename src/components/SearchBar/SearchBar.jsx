import debounce from '@/utils/debounce';
import { useState } from 'react';
import FormInput from '../FormInput/formInput';
import S from './SearchBar.module.css';
import useSearchStore from '@/store/useSearchStore';

function SearchBar() {
  const searchValue = useSearchStore((state) => state.searchValue);
  const setSearchValue = useSearchStore((state) => state.setSearchValue);

  const handleInput = debounce((e) => {
    const { value } = e.target;
    setSearchValue(value); // Zustand를 사용하여 searchValue 업데이트
  }, 400);

  const handleSearch = () => {};

  // const [formState, setFormState] = useState('');

  // const handleInput = debounce((e) => {
  //   const { value } = e.target;
  //   setFormState(value);
  // }, 400);

  // const handleSearch = () => {
  //   // 검색 버튼을 누를 때 검색어를 상위 컴포넌트로 전달
  //   onSearch(formState);
  // };
  return (
    <div className={S.searchWrapper}>
      <FormInput
        type="search"
        name="search"
        label="검색창"
        // defaultValue={formState}
        defaultValue={searchValue}
        onChange={handleInput}
      />
      <button
        onClick={handleSearch}
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
