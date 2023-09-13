/* eslint-disable react/prop-types */
function UserNickname(props) {
  return (
    <div className="font-bold items-center flex bg-blue-200">
      <span>{props.userNickname}</span>
    </div>
  );
}

export default UserNickname;
