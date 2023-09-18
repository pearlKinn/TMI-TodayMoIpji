import { createHashRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Post from './pages/Post/Post';
import Writing from './pages/Writing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Welcome from './pages/Welcome';
import User from './pages/User';
import GuestSetting from './pages/GuestSetting';
import UserProfileEdit from './pages/UserProfileEdit';
import ProtectRoute from './components/ProtectRoute';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [{ index: true, element: <Home /> }],
  },
  { path: ':postId', element: <Post /> },
  { path: 'writing', element: <Writing /> },
  { path: 'signin', element: <SignIn /> },
  { path: 'signup', element: <SignUp /> },
  { path: 'welcome', element: <Welcome /> },
  { path: 'user', element: <User /> },
  { path: 'guestsetting', element: <GuestSetting /> },
  { path: 'userProfileEdit', element: <UserProfileEdit /> },
  // { path: 'writing', element: <ProtectRoute><Writing /></ProtectRoute> }
]);

export default router;
