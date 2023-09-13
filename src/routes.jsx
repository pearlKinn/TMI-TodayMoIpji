import { createHashRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Post from './pages/Post';
import Writing from './pages/Writing';
import SignIn from './pages/SignIn';
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
  { path: 'signin', element: <SignIn /> },
  { path: 'signup', element: <SignUp /> },
  { path: 'welcome', element: <Welcome /> },
]);

export default router;
