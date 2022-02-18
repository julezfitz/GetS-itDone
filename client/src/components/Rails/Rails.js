import React, { useRef, useCallback } from "react";
import Marquee from "react-fast-marquee";
import { Typography } from "@mui/material";
import styled from "styled-components";
import { device } from "../../styles/devices/devices";
import { darkTheme } from "../../styles/globalStyles";
import LightLeak from "../Leaks/LightLeak";
import { useInView } from "react-intersection-observer";

const StyledRails = styled.div`
  position: absolute;
  transition: 1000ms ease;
  bottom: 0;

  .line-wrapper {
    overflow: hidden;
  }

  .marquee-text {
    transition: 1000ms ease;
    transform: ${({ inView }) => `translateY(${inView ? "0" : "100%"})`};
    color: white;
    font-size: 75px;

    @media ${device.desktop} {
      font-size: 75px;
    }
  }

  .light-leak {
    position: absolute;
    bottom: -30vw;
    left: -15vw;
    height: 40vw;
    width: 40vw;
    background-color: ${darkTheme.palette.secondary.main};
    border-radius: 30%;
    z-index: 99;
    filter: blur(10vw);
  }
`;

function Rails() {
  const ref = useRef(null);
  const [inViewRef, inView] = useInView();

  const setRefs = useCallback(
    (node) => {
      // Ref's from useRef needs to have the node assigned to `current`
      ref.current = node;
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      inViewRef(node);
    },
    [inViewRef]
  );

  return (
    <StyledRails
      className="marquee-rails"
      inView={inView}
      style={{ width: "100%" }}
    >
      <LightLeak />
      <Marquee speed={40} gradient={false} direction="right">
        <div className="line-wrapper">
          <Typography className="marquee-text" component="h2" ref={setRefs}>
            Contact us.
          </Typography>
        </div>
      </Marquee>

      <Marquee speed={40} gradient={false} direction="left">
        <div className="line-wrapper">
          <Typography className="marquee-text" component="h2" ref={setRefs}>
            We get it done.
          </Typography>
        </div>
      </Marquee>
    </StyledRails>
  );
}

export default Rails;
