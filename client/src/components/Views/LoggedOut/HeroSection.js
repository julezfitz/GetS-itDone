import React from 'react';
import { StyledHero } from "../styles/styles";
import MarqueeBanner from './MarqueeBanner';

function HeroSection() {
  return (
    <StyledHero className="heroSection">
      <MarqueeBanner/>
    </StyledHero>
  );
}

export default HeroSection;
