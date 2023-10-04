import useSearchStore from '@/store/useSearchStore';
import { getPbImageURL } from '@/utils';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import S from './FeedItem.module.css';

function FeedItem({ item }) {
  const searchValue = useSearchStore((state) => state.searchValue);
  const [searchData, setSearchData] = useState([]);
  const { expand: postExpandData } = item;
  const postUserData = postExpandData?.user;

  useEffect(() => {
    if (searchValue === postUserData?.region) {
      // 중복된 id가 없는 경우에만 추가
      if (!searchData.some((data) => data.id === postUserData?.id)) {
        setSearchData([...searchData, postUserData]);
      }
    }
  }, [searchValue]);

  if (postExpandData) {
    return (
      <Link
        to={`/${item.id}`}
        className="flex flex-col items-center"
        aria-label={`${postUserData?.name}님의 게시물`}
      >
        <img
          src={getPbImageURL(item, 'photo')[0]}
          alt=""
          className={S.postImage}
        />
        <div className={S.postInfo}>
          <div className={S.userWrapper}>
            {postExpandData.user.avatar === '' ? (
              <span className="bg-gray-300 rounded-full w-6 h-6 self-center">
                {' '}
              </span>
            ) : (
              <img
                src={getPbImageURL(postUserData, 'avatar')}
                alt={`${postUserData.name}님의 프로필 사진`}
                className={S.userImg}
              />
            )}
            <span className={S.local}>{postUserData?.region}</span>
          </div>
          {item.statusEmoji ? (
            <div className={S.speechBubbleBody}>
              {item.statusEmoji}
              <div className={S.speechBubbleHead}></div>
            </div>
          ) : (
            ''
          )}
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
    expand: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        region: PropTypes.string,
        avatar: PropTypes.string,
      }),
    }),
  }).isRequired,
};
