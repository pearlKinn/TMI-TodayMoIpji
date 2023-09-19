function LoadingSpinner({ width = 200, height = 50, ...restProps }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 30 300 80"
      {...restProps}
    >
      <defs>
        <pattern
          id="a"
          width={100}
          height={80}
          x={0}
          y={0}
          patternUnits="userSpaceOnUse"
        >
          <g>
            <path
              fill="#92e0c9"
              d="m1.668-33.57 11.276 4.104-49.25 135.316-11.277-4.105z"
            />
            <path
              fill="#9e9e9e"
              d="m12.944-29.466 11.277 4.104-49.251 135.316-11.277-4.104z"
            />
            <path
              fill="#92e0c9"
              d="m1.668-33.57 11.276 4.104-49.25 135.316-11.277-4.105z"
            />
            <path
              fill="#9e9e9e"
              d="m12.944-29.466 11.277 4.104-49.251 135.316-11.277-4.104z"
            />
            <path
              fill="#92e0c9"
              d="m1.668-33.57 11.276 4.104-49.25 135.316-11.277-4.105z"
            />
            <path
              fill="#9e9e9e"
              d="m12.944-29.466 11.277 4.104-49.251 135.316-11.277-4.104z"
            />
            <path
              fill="#92e0c9"
              d="m24.22-25.362 11.277 4.104-49.251 135.316-11.276-4.104z"
            />
            <path
              fill="#9e9e9e"
              d="m35.497-21.258 11.276 4.105-49.25 135.315-11.277-4.104z"
            />
            <path
              fill="#92e0c9"
              d="M46.773-17.153 58.05-13.05 8.799 122.267l-11.277-4.105z"
            />
            <path
              fill="#9e9e9e"
              d="m58.05-13.05 11.276 4.105-49.251 135.316-11.276-4.104z"
            />
            <path
              fill="#92e0c9"
              d="m69.326-8.945 11.276 4.104-49.25 135.316-11.277-4.104z"
            />
            <path
              fill="#9e9e9e"
              d="M80.602-4.84 91.878-.737l-49.25 135.315-11.277-4.104z"
            />
            <path
              fill="#92e0c9"
              d="m91.878-.736 11.277 4.104-49.251 135.315-11.276-4.104z"
            />
            <path
              fill="#9e9e9e"
              d="m103.155 3.368 11.276 4.104-49.25 135.316-11.277-4.105z"
            />
            <animateTransform
              attributeName="transform"
              dur="1s"
              keyTimes="0;1"
              repeatCount="indefinite"
              type="translate"
              values="0 0;26 0"
            />
          </g>
        </pattern>
      </defs>
      <rect
        width={300}
        height={20}
        y={60}
        fill="url(#a)"
        stroke="#565656"
        strokeWidth={2}
        rx={10}
        ry={8.5}
      />
    </svg>
  );
}
export default LoadingSpinner;
