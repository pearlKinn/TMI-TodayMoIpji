import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import S from './Heading.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { success } from '@/api/openweathermap';

function Heading() {
  const [regionWeather, setRegionWeather] = useState('');
  useEffect(() => {
    const fail = () => {
      toast.error('좌표를 받아올 수 없습니다');
    };

    navigator.geolocation.getCurrentPosition((position) => {
      success(position).then((weather) => {
        setRegionWeather(weather);
      });
    }, fail);
  }, []);
  return (
    <div className={S.headingWrapper}>
      <h1 className={S.headerBar}>헤더</h1>
      <Link to="/">
        <Logo size={60} />
      </Link>
      <Link to="/suggestion">
        {regionWeather ? (
          <span className={S.temperature}>
            {Math.floor(regionWeather.temperature)} ℃
          </span>
        ) : (
          <svg
            width={50}
            height={50}
            display="block"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 100 100"
          >
            <circle cx="80" cy="50" r="5" fill="#93dbe9">
              <animate
                attributeName="cx"
                dur="1.282051282051282s"
                keyTimes="0;1"
                repeatCount="indefinite"
                values="80;35.00000000000001"
              ></animate>
              <animate
                attributeName="cy"
                dur="1.282051282051282s"
                keyTimes="0;1"
                repeatCount="indefinite"
                values="50;75.98076211353316"
              ></animate>
              <animate
                attributeName="fill"
                dur="1.282051282051282s"
                keyTimes="0;1"
                repeatCount="indefinite"
                values="#93dbe9;#689cc5"
              ></animate>
            </circle>
            <circle cx="35" cy="75.981" r="5" fill="#689cc5">
              <animate
                attributeName="cx"
                dur="1.282051282051282s"
                keyTimes="0;1"
                repeatCount="indefinite"
                values="35.00000000000001;34.999999999999986"
              ></animate>
              <animate
                attributeName="cy"
                dur="1.282051282051282s"
                keyTimes="0;1"
                repeatCount="indefinite"
                values="75.98076211353316;24.019237886466847"
              ></animate>
              <animate
                attributeName="fill"
                dur="1.282051282051282s"
                keyTimes="0;1"
                repeatCount="indefinite"
                values="#689cc5;#5e6fa3"
              ></animate>
            </circle>
            <circle cx="35" cy="24.019" r="5" fill="#5e6fa3">
              <animate
                attributeName="cx"
                dur="1.282051282051282s"
                keyTimes="0;1"
                repeatCount="indefinite"
                values="34.999999999999986;80"
              ></animate>
              <animate
                attributeName="cy"
                dur="1.282051282051282s"
                keyTimes="0;1"
                repeatCount="indefinite"
                values="24.019237886466847;49.99999999999999"
              ></animate>
              <animate
                attributeName="fill"
                dur="1.282051282051282s"
                keyTimes="0;1"
                repeatCount="indefinite"
                values="#5e6fa3;#93dbe9"
              ></animate>
            </circle>
          </svg>
        )}
      </Link>
    </div>
  );
}

export default Heading;
