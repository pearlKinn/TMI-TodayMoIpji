import Feed from '@/components/Feed/Feed';
import SearchBar from '@/components/SearchBar/SearchBar';
import { useState } from 'react';
import S from './Home.module.css';

function Home() {
  const [filter, setFilter] = useState('');

  const handleSearch = (searchValue) => {
    setFilter(searchValue); // 검색어를 상태로 설정
  };

  return (
    <section className={S.homeWrapper}>
      <SearchBar onSearch={handleSearch} />
      <Feed filter={filter} />
    </section>
  );
}

export default Home;
