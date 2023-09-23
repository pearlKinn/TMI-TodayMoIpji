import { success } from '@/api/openweathermap';
import Loading from '@/components/Loading/Loading';
import { getPbImageURL } from '@/utils';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import S from './Suggestion.module.css';
import DownArrow from '/BackIcon.svg';

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
      <div className={S.suggestWrapper}>
        <section className={S.selectRegionWrapper}>
          <h2 className="sr-only">온도별 의상 제안</h2>
          <button
            ref={dropdownRef}
            className={S.dropdownBtn}
            onClick={toggleDropdown}
          >
            <img
              src={DownArrow}
              className={isActive ? `${S.downArrow}` : `${S.upArrow}`}
            />
            {!selectRegion ? '지역을 선택해주세요' : selectRegion}
          </button>

          <ul id="myDropdown" className={isActive ? 'hidden' : S.regionList}>
            <li className={S.regionItem}>
              <label htmlFor="seoul" className="relative">
                <input
                  type="radio"
                  name="options"
                  id="seoul"
                  value="서울"
                  onChange={handleOptionChange}
                  className={S.regionItemInput}
                />
                <span className="absolute bottom-5">서울</span>
              </label>
            </li>
            <li className={S.regionItem}>
              <label htmlFor="DaeGu" className="relative">
                <input
                  type="radio"
                  name="options"
                  id="DaeGu"
                  value="대구"
                  onChange={handleOptionChange}
                  className={S.regionItemInput}
                />
                <span className="absolute bottom-5">대구</span>
              </label>
            </li>
            <li className={S.regionItem}>
              <label htmlFor="InCheon" className="relative">
                <input
                  type="radio"
                  name="options"
                  id="InCheon"
                  value="인천"
                  onChange={handleOptionChange}
                  className={S.regionItemInput}
                />
                <span className="absolute bottom-5">인천</span>
              </label>
            </li>
          </ul>
        </section>
        <section className={S.suggestClothesWrapper}>
          <div>
            <img
              src={regionWeather.iconURL}
              alt={regionWeather.description}
              className={S.nowWeather}
            />
            <span className={S.nowWeatherDescription}>
              오늘 날씨는
              <span className={S.nowWeatherPoint}>
                {regionWeather.description}
              </span>
            </span>

            <div className={S.nowWeatherInfoWrapper}>
              현재 지역
              <span className="text-xs text-gray750">
                ({regionWeather.place})
              </span>
              의{' '}
              <div className="flex justify-end">
                <span>
                  온도는
                  <span className={S.nowWeatherPoint}>
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
              alt={suggestClothes.description}
              className={S.clothesImg}
            />
            <div className={S.clothesWrapper}>
              {clothesList.map((item, index) => (
                <span className={S.clothesItem} key={index}>
                  {item.trim()}
                </span>
              ))}
            </div>
            <span className="text-center mt-3">이런 옷을 추천👍해드려요!</span>
          </div>
        </section>
      </div>
    );
  }
}

export default Suggestion;
