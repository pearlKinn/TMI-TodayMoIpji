import Feed from '@/components/Feed/Feed';
import SearchBar from '@/components/SearchBar/SearchBar';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [filter, setFilter] = useState('');

  const handleSearch = (searchValue) => {
    setFilter(searchValue); // 검색어를 상태로 설정
  };
  console.log('필터', filter);
  return (
    <div className="flex flex-col items-center dark:bg-black w-[320px] mx-auto border border-green-800 md:w-[768px]">
      <SearchBar onSearch={handleSearch} />
      <Feed filter={filter} />
      <Link to={'/writing'}>글쓰기</Link>
    </div>
  );
}

export default Home;
