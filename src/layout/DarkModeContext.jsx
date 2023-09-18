// DarkModeContext.js

import { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

export function useDarkMode() {
  return useContext(DarkModeContext);
}

export function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // 로컬 스토리지에서 다크 모드 상태를 읽어옵니다.
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode === 'true'; // 'true'면 다크 모드, 그 외에는 라이트 모드로 시작합니다.
  });

  useEffect(() => {
    // 다크 모드 상태가 변경될 때 로컬 스토리지에 저장합니다.
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
