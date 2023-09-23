import { useState, useEffect } from 'react';
import { WritingIcon } from '@/assets/WritingIcon';
import { HomeIcon } from '@/assets/HomeIcon';
import { MypageIcon } from '@/assets/MypageIcon';
import useStorage from '@/hooks/useStorage';
import { Link } from 'react-router-dom';
// import { node, string } from 'prop-types';

function Nav() {
  const { storageData } = useStorage('pocketbase_auth');
  const [authUserData, setAuthUserData] = useState(storageData?.model);
  useEffect(() => {
    setAuthUserData(storageData?.model);
  });

  if (!authUserData) {
    return (
      <>
        <span>로그인</span>
      </>
    )
  }else{
    return (
      <nav className="w-full">
        <ul className="flex justify-around">
          <li>
            <Link to="/writing">
              <WritingIcon size={50} />
            </Link>
          </li>
          <li>
            <Link to="/">
              <HomeIcon size={50} />
            </Link>
          </li>

          <li>
            <Link to={`/mypage/${authUserData?.id}`}>
              <MypageIcon size={50} />
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
