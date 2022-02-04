import styled from "styled-components";

export const StyledHeading = styled.div`

  width: 100%;
  display: flex;
  color: ${({color}) => {
    return (
      color === 'light' ? 'white' : 'black'
    )
  }};


  .heading-large {
    font-size: 8rem
  }

  h2 {
    font-size: 7rem;
    line-height: 6rem;
  };

`