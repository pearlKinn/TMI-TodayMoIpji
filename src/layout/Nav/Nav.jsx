import { HomeIcon } from '@/assets/HomeIcon';
import { MypageIcon } from '@/assets/MypageIcon';
import { WritingIcon } from '@/assets/WritingIcon';
import useStorage, { getData } from '@/hooks/useStorage';
import useAuthStore from '@/store/auth';
import { getPbImageURL } from '@/utils';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import S from './Nav.module.css';

function Nav() {
  const [activeTab, setActiveTab] = useState('home');
  const signInAuthData = useAuthStore((store) => store.user);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const { storageData } = useStorage('pocketbase_auth');
  const [authModelData, setAuthModelData] = useState(storageData?.model);

  useEffect(() => {
    const pocketBaseAuthData = getData('pocketbase_auth');
    if (pocketBaseAuthData) {
      setAuthModelData(pocketBaseAuthData.model);
      return;
    }
    if (signInAuthData) {
      setAuthModelData(signInAuthData.record);
      return;
    }
  }, [signInAuthData, signInAuthData?.record]);

  if (!authModelData) {
    return (
      <nav className="w-full">
        <ul className="flex justify-around">
          <li
            onClick={() => handleTabClick('writing')}
            className={activeTab === 'writing' ? S.active : S.beforeActive}
          >
            <Link to="/writing">
              <WritingIcon size={50} />
            </Link>
          </li>
          <li
            onClick={() => handleTabClick('home')}
            className={activeTab === 'home' ? S.active : S.beforeActive}
          >
            <Link to="/">
              <HomeIcon size={50} />
            </Link>
          </li>
          <li
            onClick={() => handleTabClick('mypage')}
            className={activeTab === 'mypage' ? S.active : S.beforeActive}
          >
            <Link to={`/mypage/${authModelData?.id}`}>
              <MypageIcon size={50} />
            </Link>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="w-full">
        <ul className="flex justify-around">
          <li
            onClick={() => handleTabClick('writing')}
            className={activeTab === 'writing' ? S.active : S.beforeActive}
          >
            <Link to="/writing">
              <WritingIcon size={50} />
            </Link>
          </li>
          <li
            onClick={() => handleTabClick('home')}
            className={activeTab === 'home' ? S.active : S.beforeActive}
          >
            <Link to="/">
              <HomeIcon size={50} />
            </Link>
          </li>

          <li
            onClick={() => handleTabClick('mypage')}
            className={activeTab === 'mypage' ? S.active : S.beforeActive}
          >
            <Link to={`/mypage/${authModelData?.id}`}>
              {authModelData.avatar ? (
                <img
                  src={getPbImageURL(authModelData, 'avatar')}
                  className="w-[50px] h-[50px] mt-1 rounded-full"
                />
              ) : (
                <MypageIcon size={50} />
              )}
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
