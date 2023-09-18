import { useState } from 'react';
import { useOutlet } from 'react-router-dom';
import FooterBar from './FooterBar';
import HeaderBar from './HeaderBar';
import { useDarkMode } from '../layout/DarkModeContext';

import S from './RootLayout.module.css';

function RootLayout() {
  const o = useOutlet();
  const [outlet] = useState(o);

  const { isDarkMode } = useDarkMode();

  return (
    <div className={isDarkMode ? S.darkTheme : S.lightTheme}>
      <HeaderBar />
      <main
        className={`flex flex-1 h-full`}
      >
        <div className="flex-1">{outlet}</div>
      </main>
      <FooterBar />
    </div>
  );
}

export default RootLayout;
