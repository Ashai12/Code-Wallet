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


export default function Info() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <StyledUpdateDiv>
          <StyledUpdateTitle>Info</StyledUpdateTitle>
          <StyledUpdateText>
            Your fragments are stored in the browser you are currently using.<br />
            So if you clear your cache or use a different browser, you will lose your fragments.
          </StyledUpdateText>
        </StyledUpdateDiv>
      </div>
    </div>
  );
}
  