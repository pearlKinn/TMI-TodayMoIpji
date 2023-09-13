import { useState } from 'react';
import Userpage from './pages/userPage';
import UserProfileEdit from './pages/UserProfileEdit';
import { Routes, Route, Link } from 'react-router-dom';
import Guestsetting from './pages/Guestsetting';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-screen">
      <ul>
        <li>
          <Link to="/userpage">UserPage로 가기</Link>
        </li>
        <li>
          <Link to="/guestsetting">Guest setting으로 가기</Link>
        </li>
        <li>
          <Link to="/userprofileeidt">User Profile Edit으로 가기</Link>
        </li>
      </ul>
      <Routes>
        <Route
          path="/userPage"
          element={
            <>
              <Link to="/">홈으로 가기</Link>
              <Userpage></Userpage>
            </>
          }
        ></Route>
        <Route
          path="/guestsetting"
          element={
            <>
              <Link to="/">홈으로 가기</Link>
              <Guestsetting></Guestsetting>
            </>
          }
        ></Route>

        <Route
          path="/userprofileeidt"
          element={<UserProfileEdit></UserProfileEdit>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
