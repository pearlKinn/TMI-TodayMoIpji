import { Link } from 'react-router-dom';
import { getPbImageURL } from '@/utils';
import PropTypes from 'prop-types';
import useFetchData from '@/hooks/useFetchData';
import S from './FeedItem.module.css';

const PB = import.meta.env.VITE_PB_URL;
const PB_USER_ENDPOINT = `${PB}/api/collections/users/records`;

function FeedItem({ item }) {
  const { data: userData } = useFetchData(PB_USER_ENDPOINT);

  if (userData) {
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
