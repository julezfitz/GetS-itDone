import Marquee from "react-fast-marquee";

function MarqueeBanner({children, direction}) {
  return (
    <Marquee gradient={false}>
      {children}
    </Marquee>
  );
}

export default MarqueeBanner;
