import Feed from '@/components/Feed/Feed';
import SearchBar from '@/components/SearchBar/SearchBar';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center dark:bg-black">
      <SearchBar />
      <Feed />
      <Link to={'/writing'}>글쓰기</Link>
    </div>
  );
}

export default Home;
