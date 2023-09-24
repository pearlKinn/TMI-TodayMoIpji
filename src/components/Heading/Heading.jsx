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
        // const temperature = Math.floor(weather.temperature);
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
        <span className={S.temperature}>
          {Math.floor(regionWeather.temperature)} ℃
        </span>
      </Link>
    </div>
  );
}

export default Heading;
