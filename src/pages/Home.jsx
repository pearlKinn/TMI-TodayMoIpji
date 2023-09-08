import Feed from '@/components/Feed/Feed';
import SearchBar from '@/components/SearchBar/SearchBar';

function Home() {
  return (
    <div className="flex flex-col items-center">
      <SearchBar />
      <Feed />
    </div>
  );
}

export default Home;
