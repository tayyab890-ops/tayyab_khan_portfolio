import { useEffect, useRef, useState } from "react";
import A from "./tayyabKhanSVGs/A";
import B from "./tayyabKhanSVGs/B";
import E1 from "./tayyabKhanSVGs/E1";
import E2 from "./tayyabKhanSVGs/E2";
import H from "./tayyabKhanSVGs/H";
import K1 from "./tayyabKhanSVGs/K1";
import K2 from "./tayyabKhanSVGs/K2";
import K3 from "./tayyabKhanSVGs/K3";
import M from "./tayyabKhanSVGs/M";
import N from "./tayyabKhanSVGs/N";
import N2 from "./tayyabKhanSVGs/N2";
import U from "./tayyabKhanSVGs/U";

const SvgWrapper = ({ SVG, className, ...rest }) => (
  <div
    {...rest}
    className={`ai-tayyab-khan-parallax ${className}`}
  >
    <SVG />
  </div>
)


export default function TayyabKhan({ }) {
  const ref = useRef()

  const [mount, handleMount] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll()
  }, []);

  const isInViewport = () => {
    const rect = ref?.current?.getBoundingClientRect();
    return (rect?.top < window.innerHeight / 2)
  }

  const handleScroll = () => {
    handleMount(isInViewport())
  }

  return (
    <div ref={ref} className={`ai-tayyab-khan ${mount ? 'ai-tayyab-khan-visible' : ''}`}>
      <SvgWrapper
        className="ai_svg_M"
        SVG={M}
      />
      <SvgWrapper
        className="ai_svg_U"
        SVG={U}
      />
      <SvgWrapper
        className="ai_svg_N"
        SVG={N}
      />
      <SvgWrapper
        className="ai_svg_E1"
        SVG={E1}
      />
      <SvgWrapper
        className="ai_svg_E2"
        SVG={E2}
      />
      <SvgWrapper
        className="ai_svg_B"
        SVG={B}
      />
      <SvgWrapper
        className="ai_svg_K1"
        SVG={K1}
      />
      <SvgWrapper
        className="ai_svg_K2"
        SVG={K2}
      />
      <SvgWrapper
        className="ai_svg_K3"
        SVG={K3}
      />
      <SvgWrapper
        className="ai_svg_H"
        SVG={H}
      />
      <SvgWrapper
        className="ai_svg_A"
        SVG={A}
      />
      <SvgWrapper
        className="ai_svg_N2"
        SVG={N2}
      />
    </div>
  )
}
