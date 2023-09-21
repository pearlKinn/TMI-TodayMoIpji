import { useState } from 'react';
import { useRef } from 'react';
import DownArrow from '/BackIcon.svg';

function Suggestion() {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(true);
  const [selectRegion, setSelectRegion] = useState('');
  const toggleDropdown = () => {
    // 드롭다운 내용 토글
    setIsActive(!isActive);
  };
  const handleOptionChange = (e) => {
    setSelectRegion(e.target.value);
    setIsActive(!isActive);
  };
  return (
    <div className="flex flex-col items-center dark:bg-black h-[calc(100vh-132px)] mx-auto overflow-y-scroll box-content">
      <section className="">
        <h2 className="sr-only">온도별 의상 제안</h2>
        <button
          ref={dropdownRef}
          className="dropdownBtn relative border rounded-xl w-52 p-3 text-gray800 text-start"
          onClick={toggleDropdown}
        >
          <img
            src={DownArrow}
            className={
              isActive
                ? 'absolute w-3 h-3 rotate-90 right-4 bottom-4'
                : 'absolute w-3 h-3 -rotate-90 right-4 bottom-4'
            }
          />
          {!selectRegion ? '지역을 선택해주세요' : selectRegion}
        </button>

        <ul
          id="myDropdown"
          className={
            isActive
              ? 'hidden'
              : 'border rounded-xl w-52 p-3 mt-2 overflow-y-scroll'
          }
        >
          <li className="h-12 border-b">
            <div className="">
              <label htmlFor="seoul" className="relative">
                <input
                  type="radio"
                  name="options"
                  id="seoul"
                  value="서울"
                  onChange={handleOptionChange}
                  className="focus-within:bg-gray300   w-44 h-12 appearance-none"
                />
                <span className="absolute bottom-5">서울</span>
              </label>
            </div>
          </li>
          <li className="h-12 border-b">
            <label htmlFor="2" className="relative">
              <input
                type="radio"
                name="options"
                id="2"
                value="대구"
                onChange={handleOptionChange}
                className="focus-within:bg-gray300 w-44 h-12 appearance-none"
              />
              <span className="absolute bottom-5">대구</span>
            </label>
          </li>
          <li className="h-12 border-b">
            <label htmlFor="3" className="relative">
              <input
                type="radio"
                name="options"
                id="3"
                value="인천"
                onChange={handleOptionChange}
                className="focus-within:bg-gray300 w-44 h-12 appearance-none"
              />
              <span className="absolute bottom-5">인천</span>
            </label>
          </li>
        </ul>
      </section>
      <section>
        <span>OO의 온도는 OO℃입니다.</span>
        <span>이런 날씨에는 이런 옷을 추천해드려요!</span>
      </section>
    </div>
  );
}

export default Suggestion;
