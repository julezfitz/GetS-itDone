import React from 'react';
import { StyledHero } from "../styles/styles";
import MarqueeBanner from './MarqueeBanner';

function HeroSection() {
  return (
    <StyledHero className="heroSection">
      <MarqueeBanner>Get S*it Done</MarqueeBanner>
      <MarqueeBanner>The Right Way</MarqueeBanner>
    </StyledHero>
  );
}

export default HeroSection;
