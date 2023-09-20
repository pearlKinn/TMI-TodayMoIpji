import S from './Feed.module.css';
import Spinner from '../Spinner';
import FeedItem from '../FeedItem.jsx/FeedItem';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { data } from 'autoprefixer';

const PB = import.meta.env.VITE_PB_URL;
const PB_FEED_ENDPOINT = `${PB}/api/collections/posts/records?expand=user`;

async function fetchProducts() {
  const response = await axios(PB_FEED_ENDPOINT);
  return await response.data;
}

function Feed() {
  const {
    isLoading,
    data: postData,
    error,
  } = useQuery(['posts'], fetchProducts, {
    retry: 2,
  });

  let dataItems = postData?.items;
  
  if (isLoading) {
    return <Spinner size={160} title="데이터 가져오는 중이에요." />;
  }

  if (error) {
    return (
      <div role="alert">
        <h2>{error.type}</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  if (postData) {
    return (
      <div>
        <h2 className={S.feedTitle}>Feeds</h2>
        <div className={S.headerSection}>
          <h3 className={S.newLabel}>NEW</h3>
          <button type="button" aria-label="필터">
            <img src="/Filter.svg" alt="필터" />
          </button>
        </div>
        <div className={S.feedWrapper}>
          {dataItems?.map((item) => (
            <FeedItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    );
  }
}

export default Feed;
