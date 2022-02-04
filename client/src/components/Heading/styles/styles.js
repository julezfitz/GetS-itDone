import styled from "styled-components";

export const StyledHeading = styled.div`

  color: ${({color}) => {
    return (
      color === 'light' ? 'white' : 'black'
    )
  }};

  .heading-large {
    font-size: 8rem
  }

  h2 {
    font-size: 4rem;
  };

`