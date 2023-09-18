import { number } from 'prop-types';

export function Logo({ size = 100, ...restProps }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 71 39"
      {...restProps}
    >
      <path
        stroke="#fff"
        strokeWidth="3"
        d="M34.775 18c0 9.102-7.438 16.5-16.638 16.5C8.938 34.5 1.5 27.102 1.5 18S8.938 1.5 18.137 1.5c9.2 0 16.638 7.398 16.638 16.5z"
      ></path>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth="3"
        d="M17.804 14.705v1.296M25.202 14.057v1.296"
      ></path>
      <path
        stroke="#fff"
        strokeWidth="3"
        d="M32.244 8.118c6.993-4.716 9.482-.5 10.356 2.448l-3.06 7.86-5.681 17.192 32.141-14-24.93-7.123"
      ></path>
    </svg>
  );
}

Logo.propTypes = {
  size: number,
};
