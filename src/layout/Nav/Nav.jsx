import useStorage from '@/hooks/useStorage';
import { useState, useEffect } from 'react';
import { WritingIcon } from '@/assets/WritingIcon';
import { HomeIcon } from '@/assets/HomeIcon';
import { Link } from 'react-router-dom';
import { getPbImageURL } from '@/utils';
import { MypageIcon } from '@/assets/MypageIcon';
import S from './Nav.module.css';

function Nav() {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const { storageData } = useStorage('pocketbase_auth');
  const [authUserData, setAuthUserData] = useState(storageData?.model);
  useEffect(() => {
    setAuthUserData(storageData?.model);
  }, [storageData]);

  if (!authUserData) {
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
            <Link to={`/mypage/${authUserData?.id}`}>
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
            <Link to={`/mypage/${authUserData?.id}`}>
              {authUserData.avatar ? (
                <img
                  src={getPbImageURL(authUserData, 'avatar')}
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

// Link.propTypes = {
//   href: string.isRequired,
//   children: node.isRequired,
// };
