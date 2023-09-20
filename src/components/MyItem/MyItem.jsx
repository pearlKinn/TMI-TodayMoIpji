import { Link } from 'react-router-dom';
import useStorage from '@/hooks/useStorage';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { getPbImageURL } from '@/utils';
import S from './MyItem.module.css';

function MyItem({ item }) {
  const { storageData } = useStorage('pocketbase_auth');
  const [token, setToken] = useState(storageData?.token);
  const [authUserData, setAuthUserData] = useState(storageData?.model);
  
  console.log('storageData:', storageData);
  console.log('token:', token);
  console.log('authUserData:', authUserData);
  const authUserDataId = authUserData?.id;
  console.log('authUserDataId:', authUserDataId);

  const { expand: postExpandData } = item;
  const postUserData = postExpandData.user;
  console.log('postUserData:', postUserData);
  const postUserDataId = postUserData?.id;
  console.log('postUserDataID:', postUserDataId);

  if (token) {
    if (authUserDataId === postUserDataId) {
      return (
        <>
          <Link
            to={`/${item.id}`}
            className="flex flex-col items-center"
            aria-label={`${authUserData?.name}님의 게시물`}
          >
            <img
              src={getPbImageURL(item, 'photo')[0]}
              alt=""
              className={S.mypageImage}
            />
            <div className={S.mypageInfo}>
              <div className={S.userWrapper}>
                <img
                  src={getPbImageURL(authUserData, 'avatar')}
                  alt={`${authUserData.name}님의 프로필 사진`}
                  className={S.userImg}
                />
                <span className={S.local}>{authUserData?.region}</span>
              </div>
              <div className={S.speechBubbleHead}>
                {item.statusEmoji}
                <div className={S.speechBubbleBody}></div>
              </div>
            </div>
          </Link>
        </>
      );
    }
  }
}

  export default MyItem;

MyItem.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    statusEmoji: PropTypes.string,
    expand: PropTypes.shape({
      user: PropTypes.shape({
        name: PropTypes.string,
        region: PropTypes.string,
      }),
    }),
  }).isRequired,
};
