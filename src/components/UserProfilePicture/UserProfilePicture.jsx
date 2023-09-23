import { getPbImageURL } from '@/utils';

function UserProfilePicture(props) {
  return (
    <>
      <div className="border-2 border-black rounded-full">
        <img
          src={
            getPbImageURL(props.avatar, 'avatar') ||
            '/src/assets/defalutProfilePic.png'
          }
          alt="유저프로필"
          className="w-16 h-16 rounded-full"
        />
      </div>
    </>
  );
}

export default UserProfilePicture;
