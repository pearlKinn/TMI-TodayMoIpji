import UserNickname from '@/components/UserNickname';
import UserPick from '@/components/UserPic';
import GuestSettingDarkMode from '@/components/GuestSettingDarkMode';
function Guestsetting() {
  return (
    <div className="md:mx-auto md:w-[768px]  bg-yellow-200 pt-[25px] items-center flex flex-col">
      <UserPick></UserPick>
      <div className="my-auto h-[90px] flex">
        <UserNickname userNickname={'로그인해주세요'}></UserNickname>
      </div>
      <div className="w-full flex justify-center text-gray-900 bg-[#A3C8C1] border-t-2 border-black">
        <span>설정</span>
      </div>
      <GuestSettingDarkMode></GuestSettingDarkMode>
    </div>
  );
}

export default Guestsetting;
