import { createHashRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import { Mypage } from './pages/Mypage';
import { Post } from './pages/Post';

const { VITE_PUBLIC_URL } = import.meta.env;

const router = createHashRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: '/mypage',
          element: <Mypage />,
        },
        {
          path: ':postId',
          element: <Post />,
        },
      ],
    },
  ],
  {
    basename: VITE_PUBLIC_URL,
  }
);

export default router;
