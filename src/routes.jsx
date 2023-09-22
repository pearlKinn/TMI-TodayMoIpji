import { createHashRouter } from 'react-router-dom';
import RootLayout from './layout/RootLayout/RootLayout';
import Home from './pages/Home/Home';
import Post from './pages/Post/Post';
import Writing from './pages/Writing';
import User from './pages/User';
import GuestSetting from './pages/GuestSetting';
import UserProfileEdit from './pages/UserProfileEdit';
import ProtectRoute from './components/ProtectRoute';
import { Mypage } from './pages/Mypage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Suggestion from './pages/Suggestion/Suggestion';
import Welcome from './pages/Welcome';
import GuestOnlyRoutes from './components/GuestOnlyRoute';

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
      {
        path: 'signin',
        element: (
          <GuestOnlyRoutes>
            <SignIn />
          </GuestOnlyRoutes>
        ),
      },
      {
        path: 'signup',
        element: (
          <GuestOnlyRoutes>
            <SignUp />
          </GuestOnlyRoutes>
        ),
      },
      { path: 'welcome', element: <Welcome /> },
      { path: 'mypage/:userId', element: <Mypage /> },
      { path: 'suggestion', element: <Suggestion /> },
      { path: 'userprofileedit', element: <UserProfileEdit /> },
      { path: 'user', element: <User /> },
      { path: 'guestsetting', element: <GuestSetting /> },
    ],
  },
]);

export default router;
