export const DownArrowSVG: React.FC<{
  svgProps?: React.SVGProps<SVGSVGElement>;
  className?: string;
}> = ({ svgProps, className }) => {
  return (
    <svg
      width="8"
      height="7"
      viewBox="0 0 8 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...svgProps}
    >
      <g clip-path="url(#clip0_1_2)">
        <path
          d="M4.29351 5.74297C4.26097 5.78156 4.22021 5.81262 4.17412 5.83394C4.12803 5.85526 4.07774 5.86631 4.02683 5.86631C3.97592 5.86631 3.92563 5.85526 3.87954 5.83394C3.83345 5.81262 3.79268 5.78156 3.76014 5.74297L0.760866 1.83845C0.723818 1.79029 0.701232 1.73284 0.695681 1.67264C0.690129 1.61245 0.701835 1.55193 0.729465 1.49797C0.785987 1.38742 0.901275 1.318 1.02778 1.318H7.02588C7.08763 1.31786 7.1482 1.3346 7.20087 1.36638C7.25353 1.39815 7.29622 1.4437 7.32419 1.49797C7.35182 1.55193 7.36353 1.61245 7.35798 1.67264C7.35242 1.73284 7.32984 1.79029 7.29279 1.83845L4.29351 5.74297Z"
          fill="#FF5353"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_2">
          <rect
            width="7.17745"
            height="5.30625"
            fill="white"
            transform="matrix(1 0 0 -1 0.316406 6.28672)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
