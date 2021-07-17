import styled from 'styled-components'

export const MainGrid = styled.main`
  margin: 0 auto;
  width: 100%;
  display: grid;
  max-width: 500px;
  grid-gap: 10px;
  padding: 16px;
  justify-content: center;
  .profileArea{
    display: none;
    @media (min-width: 860px){
      display: block;
    }
  }
  @media (min-width: 860px){
      max-width: 1110px;
      grid-template-areas: "profileArea welcomeArea profileRelationsArea";
      grid-template-columns: 160px 1fr 312px;
    }
`;