import UserProfilePicture from '@/components/UserProfilePicture/UserProfilePicture';
import UserNickname from '@/components/UserNickname/UserNickname';
import EditPageButton from '@/components/EditPageButton/EditPageButton';
import ProfileUpload from '@/components/ProfileUpload/ProfileUpload';

function UserProfileEdit() {
  return (
    <div className="mx-auto md:w-[768px] pt-[25px] items-center flex flex-col h-[calc(100vh-132px)]">
      <UserProfilePicture></UserProfilePicture>
      <div className="h-[90px] flex">
        <UserNickname userNickname={'분당에바람이분당'}></UserNickname>
      </div>
      <div className="w-full flex justify-center border-t-2 border-black"></div>
      <div className="flex flex-col gap-6 mt-10">
        <div className="flex gap-4 items-end">
          <div className="flex flex-col gap-1 ">
            <label htmlFor="" className="text-sm">
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              placeholder="2 ~ 8문자(특수문자 사용불가)"
              className="w-30 h-10 rounded border border-primary text-sm p-2"
            ></input>
          </div>
          <EditPageButton innertext={'중복확인'}></EditPageButton>
        </div>
        <ProfileUpload></ProfileUpload>
      </div>
    </div>
  );
}

export default UserProfileEdit;
