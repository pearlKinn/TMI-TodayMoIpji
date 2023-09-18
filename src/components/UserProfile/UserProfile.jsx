import UserProfilePicture from '../UserProfilePicture/UserProfilePicture';
import UserNickname from '../UserNickname/UserNickname';
import FollowButton from '../FollowButton/FollowButton';

function UserProfile() {
  return (
    <>
      <div className=" md:mx-auto md:w-[768px]  pt-[25px] items-center flex flex-col">
        <UserProfilePicture></UserProfilePicture>
        <UserNickname userNickname={'분당에바람이분당'}></UserNickname>
        <FollowButton></FollowButton>

        <div className="md:mx-auto md:w-[768px] w-full  border-t-2 border-black">
          <ul className="flex">
            <li className="flex   text-gray-900 bg-[#A3C8C1] justify-center w-1/2">
              <span>게시물</span>
            </li>
            <li className="flex justify-center w-1/2">
              <span>회원정보</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
