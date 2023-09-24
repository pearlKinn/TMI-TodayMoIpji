function UserProfilePicture(props) {
  return (
    <>
      <div className="border-2 border-black rounded-full">
        <img
          src={props.avatar || '/src/assets/defalutProfilePic.png'}
          alt={`${props.name}님의 프로필 이미지`}
        />
      </div>
    </>
  );
}

export default UserProfilePicture;
