import type { SVGProps } from "react";
const SvgEthereum = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="ethereum_svg__svg-icon"
    style={{
      verticalAlign: "middle",
      fill: "currentColor",
      overflow: "hidden",
    }}
    viewBox="0 0 1024 1024"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      fill="#FFF"
      d="M0 512C0 229.227 229.333 0 512 0s512 229.227 512 512-229.333 512-512 512S0 794.773 0 512"
    />
    <path
      fill="#343434"
      d="m512.853 204.8-4.266 13.995V624.96l4.266 4.117L701.44 517.632z"
    />
    <path
      fill="#8C8C8C"
      d="M512.853 204.8 324.267 517.632l188.586 111.445V431.936z"
    />
    <path
      fill="#3C3C3B"
      d="m512.853 664.768-2.346 2.837v144.683l2.346 6.784L701.44 553.387z"
    />
    <path fill="#8C8C8C" d="M512.853 819.05V664.769L324.267 553.387z" />
    <path fill="#141414" d="M512.853 629.077 701.44 517.632l-188.587-85.696z" />
    <path fill="#393939" d="m324.267 517.632 188.586 111.445V431.936z" />
  </svg>
);
export default SvgEthereum;
