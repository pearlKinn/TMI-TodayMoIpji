import { useState } from 'react';
import S from './SelectEmoji.module.css';

function SelectEmoji() {
  const [isShowOptions, setIsShowOptions] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');

  const toggleOptions = () => {
    setIsShowOptions(!isShowOptions);
  };
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setIsShowOptions(true);
  };

  return (
    <div className={S.selectEmojiWrapper}>
      <div className={S.speechBubbleBody} onClick={toggleOptions}>
        <div className={S.speechBubbleHead}></div>
        {isShowOptions && (
          <div title="상태 선택"> {selectedOption || '🫥'}</div>
        )}
      </div>
      {!isShowOptions && (
        <ul className={S.statusListWrapper}>
          <li>
            <label aria-description="추워요" className="relative">
              <input
                type="radio"
                name="options"
                value="🥶"
                className={S.selectEmoji}
                onChange={handleOptionChange}
                checked={selectedOption === '🥶'}
              />
              <span className={S.statusItem}>🥶</span>
            </label>
          </li>
          <li>
            <label aria-description="더워요" className="relative">
              <input
                type="radio"
                name="options"
                value="🥵"
                className={S.selectEmoji}
                onChange={handleOptionChange}
                checked={selectedOption === '🥵'}
              />
              <span className={S.statusItem}>🥵</span>
            </label>
          </li>
          <li>
            <label aria-description="딱 좋아요" className="relative">
              <input
                type="radio"
                name="options"
                value="😌"
                className={S.selectEmoji}
                onChange={handleOptionChange}
                checked={selectedOption === '😌'}
              />
              <span className={S.statusItem}>😌</span>
            </label>
          </li>
        </ul>
      )}
    </div>
  );
}

export default SelectEmoji;
