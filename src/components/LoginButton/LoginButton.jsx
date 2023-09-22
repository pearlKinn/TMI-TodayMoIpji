import { useNavigate } from 'react-router-dom';

function LoginButton(props) {
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
        {props.buttonText}
      </div>
    </>
  );
}

export default LoginButton;
