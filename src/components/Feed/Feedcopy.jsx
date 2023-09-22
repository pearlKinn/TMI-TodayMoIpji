import S from './Feed.module.css';
import Spinner from '../Spinner';
import FeedItem from '../FeedItem.jsx/FeedItem';
import axios from 'axios';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import Filter from '/Filter.svg';
import { useEffect } from 'react';

const PB = import.meta.env.VITE_PB_URL;
const PB_FEED_ENDPOINT = `${PB}/api/collections/posts/records?expand=user?page=1&perPage=30`;

async function fetchProducts() {
  const response = await axios(PB_FEED_ENDPOINT);
  return await response.data;
}

function Feed() {
  const {
    isLoading,
    error,
    data: postData,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery(['posts'], fetchProducts, {
    getNextPageParam: (lastPage) => lastPage.nextPage, // 서버 응답에서 nextPage 값으로 설정
    retry: 2,
  });
  // const { isLoading, error } = useQuery(['posts'], fetchProducts, );

  // let dataItems = postData?.pages[0].items;
  // let dataItems = postData?.pages[0];
  console.log('dataItems', dataItems.items);
  // const dataItem = dataItems?.items
  let dataItems = postData?.pages[0].items;
  console.log(dataItems);

  useEffect(() => {
    // 스크롤 이벤트 리스너 등록
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 100 &&
        hasNextPage &&
        !isFetching
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchNextPage, hasNextPage, isFetching]);
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

  if (dataItem) {
    return (
      <div>
        <h2 className={S.feedTitle}>Feeds</h2>
        <div className={S.headerSection}>
          <h3 className={S.newLabel}>NEW</h3>
          <button type="button" aria-label="필터">
            <img src={Filter} alt="필터" />
          </button>
        </div>
        <div className={S.feedWrapper}>
          {dataItem?.toReversed().map((item) => (
            <FeedItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    );
  }
}

export default Feed;
