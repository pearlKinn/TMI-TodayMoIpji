import { createHashRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Post from './pages/Post/Post';
import Writing from './pages/Writing';
import User from './pages/User';
import GuestSetting from './pages/GuestSetting';
import UserProfileEdit from './pages/UserProfileEdit';
import Mypage from './pages/Mypage';
import SignIn from './pages/SignIn';
// import ProtectRoute from './components/ProtectRoute';
import SignUp from './pages/SignUp';
import Welcome from './pages/Welcome';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [{ index: true, element: <Home /> }],
  },
  { path: ':postId', element: <Post /> },
  { path: 'writing', element: <Writing /> },
  { path: 'user', element: <User /> },
  { path: 'guestsetting', element: <GuestSetting /> },
  { path: 'userprofileedit', element: <UserProfileEdit /> },
  { path: 'mypage', element: <Mypage /> },
  { path: 'signin', element: <SignIn /> },
  // { path: 'writing', element: <ProtectRoute><Writing /></ProtectRoute> }
  { path: 'signup', element: <SignUp /> },
  { path: 'welcome', element: <Welcome /> },

  // {
  //   path: 'writing',
  //   element: (
  //     <ProtectRoute>
  //       <Writing />
  //     </ProtectRoute>
  //   ),
  // },
]);

export default router;
