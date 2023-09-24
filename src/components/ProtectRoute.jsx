import useStorage from '@/hooks/useStorage';
import { element } from 'prop-types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

function ProtectRoute({ children }) {
  const navigate = useNavigate();
  const { storageData } = useStorage('pocketbase_auth');
  const authUser = storageData?.token;

  const { pathname, search, hash } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const wishLocationPath = `${pathname}${search}${hash}`;

  useEffect(() => {
    if (!isLoading && !authUser) {
      import.meta.env.MODE === 'development' && toast.dismiss();

      toast('로그인 된 사용자만 이용 가능한 페이지입니다.', {
        position: 'top-center',
        icon: '🚨',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });

      return navigate('/', { state: { wishLocationPath } });
    }

    const cleanup = setTimeout(() => setIsLoading(false));

    return () => {
      clearTimeout(cleanup);
    };
  }, [authUser, isLoading, navigate, wishLocationPath]);

  if (isLoading) {
    return <Spinner size={200} />;
  }

  return children;
}

ProtectRoute.propTypes = {
  children: element,
};

export default ProtectRoute;
