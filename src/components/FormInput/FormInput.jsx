// /* eslint-disable react/display-name */
import { oneOf, string } from 'prop-types';
import S from './FormInput.module.css';
import { useId } from 'react';
import { forwardRef } from 'react';

const FormInput = forwardRef(
  ({ type = 'text', name = null, label, ...restProps }, ref) => {
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
          ref={ref}
        ></input>
      </>
    );
  }
);
FormInput.displayName = 'FormInput';
export default FormInput;

FormInput.propTypes = {
  type: oneOf(['text', 'password', 'number', 'email', 'search']),
  name: string.isRequired,
  label: string.isRequired,
};
