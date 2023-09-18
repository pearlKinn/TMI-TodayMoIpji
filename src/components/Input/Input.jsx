import { string, func } from 'prop-types';
import S from './Input.module.css';

function Input(props) {
  return (
    <div className={S.inputWrapper}>
      <input
        id={props.id}
        type={props.type}
        name={props.name}
        placeholder={`${props.placeholder}`}
        className={`${S.input} ${props.width} ${props.height}`}
        onChange={props.onChange}
      ></input>
    </div>
  );
}

export default Input;

Input.propTypes = {
  id: string,
  type: string,
  name: string,
  placeholder: string,
  width: string,
  height: string,
  onChange: func,
};
