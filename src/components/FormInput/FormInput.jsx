import { oneOf, string } from 'prop-types';
import S from './FormInput.module.css';
import { useId } from 'react';

function FormInput({ type = 'text', name = null, label, ...restProps }) {
  const id = useId();
  return (
    <>
      <label htmlFor={id} className={S.label}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        aria-label={label}
        className={S.input}
        {...restProps}
      ></input>
    </>
  );
}

export default FormInput;

FormInput.propTypes = {
  type: oneOf(['text', 'password', 'number', 'email', 'search']),
  name: string.isRequired,
  label: string.isRequired,
};
