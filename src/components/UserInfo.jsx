/* eslint-disable react/prop-types */
import UserPick from './UserPic';
import UserNickname from './UserNickname';

function UserInfo() {
  return (
    <>
      <div className="md:mx-auto md:w-[768px]  pt-[25px] items-center flex flex-col">
        <UserPick></UserPick>
        <UserNickname userNickname={'분당에바람이분당'}></UserNickname>
      </div>
    </>
  );
}

export default UserInfo;
