/* eslint-disable react/prop-types */
function UserNickname(props) {
  return (
    <div className="font-bold items-center flex ">
      <span>{props.userNickname}</span>
    </div>
  );
}

export default UserNickname;
