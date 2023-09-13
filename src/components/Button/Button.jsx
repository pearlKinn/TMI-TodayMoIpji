import { string, func } from 'prop-types';
import S from './Button.module.css';

function Button(props) {
  return (
    <div className={S.buttonWrapper}>
      <button
        type="submit"
        title={props.title}
        className={`${S.button} ${props.width} ${props.height} ${props.border} ${props.bgcolor} ${props.fontcolor} ${props.fontsize}`}
        onClick={props.onClick}
      >
        {props.text}
      </button>
    </div>
  );
}

export default Button;

Button.propTypes = {
  title: string,
  width: string,
  height: string,
  border: string,
  fontsize: string,
  fontcolor: string,
  bgcolor: string,
  text: string,
  onClick: func,
};
