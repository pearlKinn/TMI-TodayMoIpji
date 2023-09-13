import { Link } from 'react-router-dom';
import S from './Feed.module.css';
import useFetchData from '@/hooks/useFetchData';
import { getPbImageURL } from '@/utils';
import Spinner from '../Spinner';

const PB = import.meta.env.VITE_PB_URL;
const PB_FEED_ENDPOINT = `${PB}/api/collections/posts/records`;
const PB_USER_ENDPOINT = `${PB}/api/collections/users/records`;

function Feed() {
  const { error, data: postData, isLoading } = useFetchData(PB_FEED_ENDPOINT);
  let dataItems = postData.items;

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
        <div className="flex justify-between px-2 mt-2">
          <h3 className="font-semibold text-red-600">NEW</h3>
          <button type="button" aria-label="필터">
            <img src="/Filter.svg" alt="필터" />
          </button>
        </div>
        <div className=" grid  grid-cols-3 gap-x-2 gap-y-6 md:grid-cols-4 min-w-[320px] w-full  mt-4 mx-auto;">
          {dataItems?.map((item) => (
            <FeedItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    );
  }
}

export default Feed;

function FeedItem({ item }) {
  const { data: userData } = useFetchData(PB_USER_ENDPOINT);

  if (userData) {
    const matchingUser = userData.items?.find((user) => user.id === item.user);
    console.log(matchingUser);
    const userAvatar = matchingUser ? (
      <img
        src={getPbImageURL(matchingUser, 'avatar')}
        alt={`${matchingUser.name}님의 프로필 사진`}
        className={S.userImg}
      />
    ) : null;

    return (
      <Link
        to={`/${item.id}`}
        className="flex flex-col items-center"
        aria-label={``}
      >
        <img
          src={getPbImageURL(item, 'photo')[0]}
          alt=""
          className={S.feedImage}
        />
        <div className={S.feedInfo}>
          <div className={S.userWrapper}>
            {userAvatar}
            <span>지역</span>
          </div>
          <div className={S.speechBubbleHead}>
            🥵
            <div className={S.speechBubbleBody}></div>
          </div>
        </div>
      </Link>
    );
  }
}
