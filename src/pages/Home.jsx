import Feed from '@/components/Feed/Feed';
import SearchBar from '@/components/SearchBar/SearchBar';
import { useState } from 'react';

function Home() {
  const [filter, setFilter] = useState('');

  const handleSearch = (searchValue) => {
    setFilter(searchValue); // 검색어를 상태로 설정
  };
  console.log('필터', filter);
  return (
    <div className="flex flex-col items-center dark:bg-black w-[320px] h-[585px] mx-auto md:w-[768px] overflow-y-scroll box-content">
      <SearchBar onSearch={handleSearch} />
      <Feed filter={filter} />
    </div>
  );
}

export default Home;
