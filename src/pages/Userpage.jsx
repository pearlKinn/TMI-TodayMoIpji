/* eslint-disable react/prop-types */
import UserInfo from '@/components/UserInfo';
import FollowButton from '@/components/FollowButton';

function Userpage() {
  return (
    <>
      <UserInfo userNickname={'분당에바람이분당'}></UserInfo>
      <FollowButton></FollowButton>
      <UserBoardTap></UserBoardTap>
      <UserBoard></UserBoard>
    </>
  );
}

function UserBoardTap() {
  return (
    <>
      <div className="md:mx-auto md:w-[768px]  border-t-2 border-black">
        <ul className="flex">
          <li className="flex   text-gray-900 bg-[#A3C8C1] justify-center w-1/2">
            <span>게시물</span>
          </li>
          <li className="flex justify-center w-1/2">
            <span>회원정보</span>
          </li>
        </ul>
      </div>
    </>
  );
}

function UserBoard() {
  return (
    <>
      <div className="h-auto grid grid-cols-3 gap-1 md:mx-auto md:w-[768px] p-1 bg-orange-300">
        <UserPost></UserPost>
        <UserPost></UserPost>
        <UserPost></UserPost>
        <UserPost></UserPost>
        <UserPost></UserPost>
      </div>
    </>
  );
}
export default Userpage;

function UserPost() {
  return (
    <>
      <div className="bg-green-800 h-auto flex flex-col justify-evenly">
        <img className="w-full" src="/src/assets/react.svg" alt="" />
        <div className="flex justify-between items-center mt-1">
          <img
            className="w-6 md:w-1/5"
            src="/src/assets/defalutProfilePic.png"
            alt=""
          />
          <span className="text-base md:text-2xl">서울</span>
          <div className="bg-contain bg-no-repeat px-1 pt-1 pb-2 bg-userBoardEmojiBackground ">
            <span>🥵</span>
          </div>
          {/* <img className="w-1/5" src="/src/assets/userEmoji.svg" alt="" /> */}
        </div>
      </div>
    </>
  );
}
