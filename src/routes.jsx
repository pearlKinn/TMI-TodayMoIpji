import { createHashRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Mypage from './pages/Mypage/Mypage';
import Post  from './pages/Post/Post';

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
);

export default router;