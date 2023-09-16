import PropTypes from 'prop-types';
import S from './SpeechBubble.module.css';

function SpeechBubble({ text }) {
  return (
    <div className={S.speechBubbleWrapper}>
      <div className={S.speechBubbleBody}>
        {text}
        <div className={S.speechBubbleHead}></div>
      </div>
    </div>
  );
}

export default SpeechBubble;

SpeechBubble.propTypes = {
  text: PropTypes.string,
};
