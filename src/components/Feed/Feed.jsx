import S from './Feed.module.css';
import Spinner from '../Spinner';
import FeedItem from '../FeedItem.jsx/FeedItem';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query'; // useQuery 제거
import Filter from '/Filter.svg';
import { useEffect } from 'react';
import { useState } from 'react';

const PB = import.meta.env.VITE_PB_URL;
const PB_FEED_ENDPOINT = `${PB}/api/collections/posts/records?expand=user`;

async function fetchProducts({ pageParam = 1 }) {
  // pageParam 매개변수 추가
  const response = await axios(
    `${PB_FEED_ENDPOINT}&page=${pageParam}&perPage=50`
  ); // pageParam 사용
  return await response.data;
}

function Feed() {
  const [loading, setLoading] = useState(true);
  const {
    isLoading,
    error,
    data: postData,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery(['posts'], fetchProducts, {
    getNextPageParam: (lastPage) => lastPage.nextPage,
    retry: 2,
  });

  const dataItems = postData?.pages.flatMap((page) => page.items); // 데이터 합치기

  useEffect(() => {
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
    setLoading(false);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchNextPage, hasNextPage, isFetching]);

  if (isLoading || loading) {
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

  if (dataItems) {
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
          {dataItems?.reverse().map((item) => (
            <FeedItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    );
  }
}

export default Feed;

// import S from './Feed.module.css';
// import Spinner from '../Spinner';
// import FeedItem from '../FeedItem.jsx/FeedItem';
// import axios from 'axios';
// import { useQuery } from '@tanstack/react-query';
// import Filter from '/Filter.svg';

// const PB = import.meta.env.VITE_PB_URL;
// const PB_FEED_ENDPOINT = `${PB}/api/collections/posts/records?expand=user`;

// async function fetchProducts() {
//   const response = await axios(PB_FEED_ENDPOINT);
//   return await response.data;
// }

// function Feed() {
//   const {
//     isLoading,
//     data: postData,
//     error,
//   } = useQuery(['posts'], fetchProducts, {
//     retry: 2,
//   });

//   let dataItems = postData?.items;
//   if (isLoading) {
//     return <Spinner size={160} title="데이터 가져오는 중이에요." />;
//   }

//   if (error) {
//     return (
//       <div role="alert">
//         <h2>{error.type}</h2>
//         <p>{error.message}</p>
//       </div>
//     );
//   }

//   if (postData) {
//     return (
//       <div>
//         <h2 className={S.feedTitle}>Feeds</h2>
//         <div className={S.headerSection}>
//           <h3 className={S.newLabel}>NEW</h3>
//           <button type="button" aria-label="필터">
//             <img src={Filter} alt="필터" />
//           </button>
//         </div>
//         <div className={S.feedWrapper}>
//           {dataItems?.toReversed().map((item) => (
//             <FeedItem key={item.id} item={item} />
//           ))}
//         </div>
//       </div>
//     );
//   }
// }
// export default Feed;
