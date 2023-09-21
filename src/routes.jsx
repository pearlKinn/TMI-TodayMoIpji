import { createHashRouter } from 'react-router-dom';
import ProtectRoute from './components/ProtectRoute';
import RootLayout from './layout/RootLayout/RootLayout';
import Home from './pages/Home/Home';
import { Mypage } from './pages/Mypage';
import Post from './pages/Post/Post';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Suggestion from './pages/Suggestion/Suggestion';
import UserProfileEdit from './pages/UserProfileEdit';
import Welcome from './pages/Welcome';
import Writing from './pages/Writing';

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
      { path: 'suggestion', element: <Suggestion /> },
      { path: 'userprofileedit', element: <UserProfileEdit /> },
    ],
  },
]);

export default router;
