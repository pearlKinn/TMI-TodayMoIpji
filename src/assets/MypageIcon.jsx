import { number } from 'prop-types';

export function MypageIcon({ size = 100, ...restProps }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 50 50"
      {...restProps}
    >
      <circle cx="25" cy="25" r="25" fill="#fff"></circle>
      <path
        fill="#D9D9D9"
        d="M49 31c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12z"
      ></path>
      <path
        fill="#000"
        d="M39.115 25.422c-.123.819-.318.963-1.137.84-.82-.122-1.805-1.454-1.682-2.273.122-.82.317-.964 1.136-.841.82.122 1.805 1.454 1.683 2.274zM33.022 30c.01.828-.16 1.002-.988 1.011-.829.01-2.014-1.149-2.023-1.977-.01-.829.16-1.002.989-1.011.828-.01 2.013 1.149 2.022 1.977z"
      ></path>
      <path
        fill="#000"
        d="M39.147 31H40.147V34H39.147z"
        transform="rotate(45.69 39.147 31)"
      ></path>
    </svg>
  );
}

MypageIcon.propTypes = {
  size: number,
};
