import { success } from '@/api/openweathermap';
import Loading from '@/components/Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import DownArrow from '/BackIcon.svg';
import toast from 'react-hot-toast';
import pb from '@/api/pocketbase';
import { getPbImageURL } from '@/utils';

const suggestClothingByTemperature = (temperature) => {
  let tempId = '';

  switch (true) {
    case temperature <= 4:
      tempId = 'vtj4bd4scc31phf';
      break;
    case temperature >= 5 && temperature <= 8:
      tempId = '3wp1pl78zo0l52t';
      break;
    case temperature >= 9 && temperature <= 11:
      tempId = 'qmdsqbu8e5vhpiz';
      break;
    case temperature >= 12 && temperature <= 16:
      tempId = 'rzip5odyb6obi57';
      break;
    case temperature >= 17 && temperature <= 19:
      tempId = 'uv3fa5xn1l23y8i';
      break;
    case temperature >= 20 && temperature <= 22:
      tempId = 'm2at9ewak20fdio';
      break;
    case temperature >= 23 && temperature <= 27:
      tempId = '4scv8ke4tgrnbmj';
      break;
    case temperature >= 28:
      tempId = 'mtbaxl9s98xlzkr';
      break;
  }

  return tempId;
};

const PB = import.meta.env.VITE_PB_URL;
// const PB_TEMP_ENDPOINT = `${PB}/api/collections/temperature/records/?expand=clothes`;

async function fetchProducts(tempId) {
  const response = await axios(
    `${PB}/api/collections/temperature/records/${tempId}/?expand=clothes`
  );
  return await response.data;
}

function Suggestion() {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(true);
  const [selectRegion, setSelectRegion] = useState('');
  const [regionWeather, setRegionWeather] = useState('');
  const [loading, setLoading] = useState(true);
  const [suggestClothes, setSuggestClothes] = useState(null);

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };
  const handleOptionChange = (e) => {
    setSelectRegion(e.target.value);
    setIsActive(!isActive);
  };

  useEffect(() => {
    const fetchData = async (tempId) => {
      try {
        const temp = await fetchProducts(tempId);
        const { expand: tempExpandData } = temp;

        setSuggestClothes(tempExpandData);
        setLoading(false);
      } catch (error) {
        if (!(error in DOMException)) {
          console.error(error);
        }
      }
    };

    const fail = () => {
      toast.error('좌표를 받아올 수 없습니다');
    };

    navigator.geolocation.getCurrentPosition((position) => {
      success(position).then((weather) => {
        setRegionWeather(weather);
        const temperature = Math.floor(weather.temperature);
        const clothingSuggestion = suggestClothingByTemperature(temperature);
        fetchData(clothingSuggestion);
      });
    }, fail);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (suggestClothes) {
    const clothesList = suggestClothes?.clothes.description.split(',');

    return (
      <div className=" dark:bg-black h-[calc(100vh-132px)] mx-auto overflow-y-scroll box-content relative min-w-[320px] ">
        <section className="absolute right-3 top-5">
          <h2 className="sr-only">온도별 의상 제안</h2>
          <button
            ref={dropdownRef}
            className="dropdownBtn relative border-2 rounded-xl w-52 p-3 text-gray900 text-start"
            onClick={toggleDropdown}
          >
            <img
              src={DownArrow}
              className={
                isActive
                  ? 'absolute w-3 h-3 -rotate-90 right-4 bottom-4'
                  : 'absolute w-3 h-3 rotate-90 right-4 bottom-4'
              }
            />
            {!selectRegion ? '지역을 선택해주세요' : selectRegion}
          </button>

          <ul
            id="myDropdown"
            className={
              isActive
                ? 'hidden'
                : 'border rounded-xl w-52 p-3 mt-2 overflow-y-scroll bg-white'
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
        <section className="mt-24 flex flex-col items-center">
          <div className="">
            <img
              src={regionWeather.iconURL}
              alt={regionWeather.description}
              className="w-32 mx-auto"
            />
            <span className="relative bottom-[20px] left-[170px]">
              오늘 날씨는{' '}
              <span className="bg-primary rounded-xl px-1">
                {regionWeather.description}
              </span>
            </span>

            <div className="box-border min-w-[310px] mx-auto border-[4px] border-secondary rounded-xl px-1 py-5 ">
              현재 지역
              <span className="text-xs text-gray750">
                ({regionWeather.place})
              </span>
              의{' '}
              <div className=" flex justify-end ">
                <span>
                  온도는
                  <span className="bg-primary rounded-xl px-2">
                    {Math.floor(regionWeather.temperature)}℃
                  </span>
                  입니다
                </span>
              </div>
            </div>
          </div>
          <br />
          <span className="">오늘같은 날씨에는</span>
          <div className="flex flex-col">
            <img
              src={getPbImageURL(suggestClothes.clothes, 'image')}
              alt=""
              className="w-60 mx-auto"
            />
            <div className="grid grid-cols-3 gap-x-3 gap-y-3">
              {clothesList.map((item, index) => (
                <span
                  className="bg-primary rounded-3xl px-1 whitespace-nowrap text-center"
                  key={index}
                >
                  {item.trim()}
                </span>
              ))}
            </div>
            <span className="text-center text-lg mt-3">
              이런 옷을 추천👍해드려요!
            </span>
          </div>
        </section>
      </div>
    );
  }
}

export default Suggestion;
