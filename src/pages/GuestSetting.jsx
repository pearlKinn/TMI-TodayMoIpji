import UserProfilePicture from '@/components/UserProfilePicture/UserProfilePicture';
import UserNickname from '@/components/UserNickname/UserNickname';
import LoginButton from '@/components/LoginButton/LoginButton';
import DarkModeButton from '@/components/DarkModeButton/DarkModeButton';

function GuestSetting() {
  return (
    <>
      <div className=" md:mx-auto md:w-[768px]  pt-[25px] items-center flex flex-col">
        <UserProfilePicture></UserProfilePicture>
        <div className="my-auto h-[90px] flex">
          <UserNickname userNickname={'로그인해주세요'}></UserNickname>
        </div>
        <div className="w-full flex justify-center text-gray-900 bg-[#A3C8C1] border-t-2 border-black">
          <span>설정</span>
        </div>
        <DarkModeButton></DarkModeButton>
        <LoginButton buttonText={'로그인 하기'}></LoginButton>
      </div>
    </>
  );
}

export default GuestSetting;
