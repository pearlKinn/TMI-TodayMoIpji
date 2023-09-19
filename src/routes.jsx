import { createHashRouter } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import Home from './pages/Home';
import Post from './pages/Post/Post';
import Writing from './pages/Writing';
import { Mypage } from './pages/Mypage';
import UserProfileEdit from './pages/UserProfileEdit';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Welcome from './pages/Welcome';
import ProtectRoute from './components/ProtectRoute';

const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: ':postId', element: <Post /> },
      {
        path: 'writing',
        element: (
          <ProtectRoute>
            <Writing />
          </ProtectRoute>
        ),
      },
      { path: 'signin', element: <SignIn /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'welcome', element: <Welcome /> },
      { path: 'mypage', element: <Mypage /> },
      { path: 'userprofileedit', element: <UserProfileEdit /> },
    ],
  },
]);

export default router;
