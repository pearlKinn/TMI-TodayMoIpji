import { getPbImageURL } from '@/utils';

function UserProfilePicture(props) {
  const avatarImg = props?.avatar;
  if (avatarImg) {
    return (
      <>
        <div className="border-2 border-black rounded-full">
          <img
            src={
              getPbImageURL(avatarImg, 'avatar') ||
              '/src/assets/defalutProfilePic.png'
            }
            // alt={`${props?.name}님의 프로필 이미지`}
            className="w-16 h-16 rounded-full"
          />
        </div>
      </>
    );
  }
}

export default UserProfilePicture;
