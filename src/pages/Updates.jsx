import styled from 'styled-components';

const StyledUpdateDiv = styled.div`
  padding : 20px;
  text-align: center;
`;

const StyledUpdateTitle = styled.h2`
font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
`

const StyledUpdateText = styled.h3`
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
`

export default function Updates() {

  return (
    <>
    <br /><br /><br /><br /><br /><br /><br /><br /><br />
    <StyledUpdateDiv>
    <StyledUpdateTitle>Updates</StyledUpdateTitle>
    <br />
    <StyledUpdateText>No news at the moment...</StyledUpdateText>
    </StyledUpdateDiv>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </>
  );
}
  