import { number } from 'prop-types';

export function HomeIcon({ size = 100, ...restProps }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 50 50"
      {...restProps}
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M4.167 16.667L24.442 6.529a1.25 1.25 0 011.116 0l20.275 10.138m-4.166 6.25v16.666A4.167 4.167 0 0137.5 43.75h-25a4.167 4.167 0 01-4.167-4.167V22.917"
      ></path>
    </svg>
  );
}

HomeIcon.propTypes = {
  size: number,
};