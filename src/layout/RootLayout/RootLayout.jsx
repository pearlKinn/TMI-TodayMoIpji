import { useState } from 'react';
import { useOutlet } from 'react-router-dom';
import FooterBar from '../FooterBar';
import HeaderBar from '../HeaderBar';

function RootLayout() {
  const o = useOutlet();
  const [outlet] = useState(o);

  return (
    <div>
      <HeaderBar />
      <main className={`flex flex-1 h-[45.125rem]`}>
        <div className="flex-1">{outlet}</div>
      </main>
      <FooterBar />
    </div>
  );
}

export default RootLayout;
