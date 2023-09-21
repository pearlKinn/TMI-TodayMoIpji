import Button from '@/components/Button/Button';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  // const [popup, setPopup] = useState(false);
  // const handlePopup = () => {
  //   setPopup(!popup);
  // };

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/signin');
  };

  return (
    <>
      <div className="h-[calc(100vh-132px)]">
        <div className="flex items-center justify-center pt-[57px] pb-8">
          <img className="mx-auto" src="/public/celebration-icon.svg" />
        </div>
        <p className="text-base text-center">회원 가입을 축하합니다!</p>
        <div className="flex justify-center pt-[68px]">
          <Button
            text="로그인 하기"
            title="로그인 버튼입니다"
            width="w-[250px]"
            height="h-[54px]"
            fontsize="text-base"
            fontcolor="text-gray900"
            bgcolor="bg-primary"
            onClick={handleLogin}
          />
        </div>
        {/* {popup && <Popup onClose={handlePopup} />} */}
      </div>
    </>
  );
}

// function Popup() {
//   return (
//     <div>
//       <div className="modal w-[296px] h-[346px] mx-auto">
//         <div className="pt-[7px] pl-[7px]">
//           <button className="type=submit">
//             <img src="/public/close-icon.svg" />
//           </button>
//         </div>
//         <div className="flex items-center justify-center pt-5 pb-[53px]">
//           <img className="mx-auto" src="/public/suggest-icon.svg" />
//         </div>
//         <p className="text-base w-[206px] h-[52px] text-center mx-auto">
//           회원만 사용할 수 있어요 &#59;&#40; 로그인하러 가시겠어요?
//         </p>
//         <div className="flex justify-center pt-[40px]">
//           <Button
//             text="로그인 하기"
//             title="로그인 버튼입니다"
//             width="w-[250px]"
//             height="h-[54px]"
//             fontsize="text-base"
//             fontcolor="text-gray900"
//             bgcolor="bg-primary"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

export default Welcome;
