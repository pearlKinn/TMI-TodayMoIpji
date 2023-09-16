import { createHashRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Post from './pages/Post/Post';
import Writing from './pages/Writing';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [{ index: true, element: <Home /> }],
  },
  { path: ':postId', element: <Post /> },
  { path: 'writing', element: <Writing /> },
]);

export default router;
