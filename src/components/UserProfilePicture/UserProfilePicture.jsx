function UserProfilePicture(props) {
  return (
    <>
      <div className="border-2 border-black rounded-full">
        <img
          src={props.avatar || '/src/assets/defalutProfilePic.png'}
          alt="유저프로필"
        />
      </div>
    </>
  );
}

export default UserProfilePicture;
