import { createHashRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Post from './pages/Post';
import Writing from './pages/Writing';
import ProtectRoute from './components/ProtectRoute';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [{ index: true, element: <Home /> }],
  },
  { path: ':postId', element: <Post /> },
  { path: 'writing', element: <Writing /> },
  // { path: 'writing', element: <ProtectRoute><Writing /></ProtectRoute> }
]);

export default router;
