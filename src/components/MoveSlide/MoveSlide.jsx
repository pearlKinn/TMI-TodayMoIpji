import PropTypes from 'prop-types';
import S from './MoveSlide.module.css';

function MoveSlide({ prevFunc, nextFunc, disabled }) {
  return (
    <div className={S.moveSlideWrapper}>
      <button className={S.moveSlideBtn} onClick={prevFunc} disabled={disabled}>
        Prev
      </button>
      <button className={S.moveSlideBtn} onClick={nextFunc} disabled={disabled}>
        Next
      </button>
    </div>
  );
}

export default MoveSlide;

MoveSlide.propTypes = {
  prevFunc: PropTypes.func.isRequired,
  nextFunc: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
