import { number } from 'prop-types';

export function WritingIcon({ size = 100, ...restProps }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 50 50"
      {...restProps}
    >
      <g fill="#fff" clipPath="url(#clip0_20_112)">
        <path d="M38.889 41.667H8.333V11.11h18.361l2.778-2.778H8.333a2.778 2.778 0 00-2.777 2.778v30.556a2.778 2.778 0 002.777 2.777H38.89a2.778 2.778 0 002.778-2.777V20.833l-2.778 2.778v18.056z"></path>
        <path d="M46.57 8.111l-4.681-4.68a2.236 2.236 0 00-3.167 0L19.681 22.583l-1.542 6.68a2.235 2.235 0 002.18 2.681c.171.02.344.02.514 0l6.736-1.486 19-19.18a2.238 2.238 0 000-3.167zM26.124 27.89l-5.083 1.125 1.18-5.042 14.334-14.43 3.916 3.916-14.347 14.43zm15.917-16l-3.917-3.917 2.153-2.194 3.944 3.944-2.18 2.167z"></path>
      </g>
      <defs>
        <clipPath id="clip0_20_112">
          <path fill="#fff" d="M0 0H50V50H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

WritingIcon.propTypes = {
  size: number,
};