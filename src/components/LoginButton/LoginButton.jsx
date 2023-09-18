import { useNavigate } from 'react-router-dom';

function LoginButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signin');
  };

  return (
    <>
      <div
        className="w-[280px] h-14 rounded bg-primary flex justify-center items-center text-gray-900"
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        로그인 하기
      </div>
    </>
  );
}

export default LoginButton;
