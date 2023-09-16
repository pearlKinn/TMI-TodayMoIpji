import PropTypes from 'prop-types';
import S from './SpeechBubble.module.css';

function SpeechBubble({ props }) {
  return (
    <div className={S.speechBubbleWrapper}>
      <div className={S.speechBubbleBody}>
        {props}
        <div className={S.speechBubbleHead}></div>
      </div>
    </div>
  );
}

export default SpeechBubble;

SpeechBubble.propTypes = {
  text: PropTypes.string.isRequired, // 예를 들어, text 프롭은 문자열이며 필수입니다.
};
