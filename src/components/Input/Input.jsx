import { string } from 'prop-types';
import S from './Input.module.css';

function Input(props) {
  return (
    <div className={S.inputWrapper}>
      <input
        id={props.id}
        type={props.type}
        placeholder={`${props.placeholder}`}
        className={`${S.input} ${props.width} ${props.height} `}
      ></input>
    </div>
  );
}

export default Input;

Input.propTypes = {
  id: string,
  type: string,
  placeholder: string,
  width: string,
  height: string,
};
