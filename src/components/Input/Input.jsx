import { string } from 'prop-types';

function Input(props) {
  return (
    <>
      <input
        id="userEmail"
        type={props.type}
        placeholder={`${props.placeholder}`}
        className={`pl-2 ${props.width} ${props.height} border-primary border-solid border rounded placeholder:text-xs`}
      ></input>
    </>
  );
}

export default Input;

Input.propTypes = {
  type: string,
  placeholder: string,
  width: string,
  height: string,
};
