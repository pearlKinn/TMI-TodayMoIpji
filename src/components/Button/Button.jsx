import { string } from 'prop-types';

function Button(props) {
  return (
    <div className="flex items-center justify-center">
      <button
        type="submit"
        title={props.title}
        className={`${props.width} ${props.height} rounded ${props.fontsize} border ${props.fontcolor} ${props.bgcolor} ${props.border}`}
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
  fontcolor: string,
  fontsize: string,
  bgcolor: string,
  border: string,
  text: string,
  onClick: string,
};
