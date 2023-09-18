import { Link } from 'react-router-dom';
import { getPbImageURL } from '@/utils';
import PropTypes from 'prop-types';
import S from './FeedItem.module.css';
import Spinner from '../Spinner';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useSearchStore from '@/store/useSearchStore';
import { useState } from 'react';
import { useEffect } from 'react';

const PB = import.meta.env.VITE_PB_URL;
const PB_USER_ENDPOINT = `${PB}/api/collections/users/records`;

async function fetchProducts() {
  const response = await axios(PB_USER_ENDPOINT);
  return await response.data;
}
function FeedItem({ item }) {
  const searchValue = useSearchStore((state) => state.searchValue);
  const [searchData, setSearchData] = useState('');
  const {
    isLoading,
    data: userData,
    error,
  } = useQuery(['users'], fetchProducts, {
    retry: 2,
  });

  useEffect(() => {
    return () => {};
  }, [searchData]);

  if (isLoading) {
    // return <Spinner size={160} title="데이터 가져오는 중이에요." />;
  }

  if (error) {
    return (
      <div role="alert">
        <h2>{error.type}</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  if (userData) {
    //matchingUser.region 지역
    const matchingUser = userData.items?.find((user) => user.id === item.user);
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
        aria-label={`${matchingUser?.name}님의 게시물`}
      >
        <img
          src={getPbImageURL(item, 'photo')[0]}
          alt=""
          className={S.postImage}
        />
        <div className={S.postInfo}>
          <div className={S.userWrapper}>
            {userAvatar}
            <span className={S.local}>{matchingUser?.region}</span>
          </div>
          <div className={S.speechBubbleHead}>
            {item.statusEmoji}
            <div className={S.speechBubbleBody}></div>
          </div>
        </div>
      </Link>
    );
  }
}
export default FeedItem;

FeedItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    statusEmoji: PropTypes.string,
  }).isRequired,
};
