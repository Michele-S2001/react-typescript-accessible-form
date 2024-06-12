import styled from "styled-components"
import Form from "./components/Form";

const Main = styled.main`
  display: grid;
  place-items: center;
  margin-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
`;

const Content = styled.section`
  background-color: var(--white);
  padding: 24px 45px;
  & .heading {
    text-align: center;
  }
`;

const PageTitle = styled.h1`
  font-size: clamp(28px, 5vw, 32px);
  margin-bottom: 34px;
  color: var(--blue);
`

function App() {

  return (
    <Main>
      <Content>
        <PageTitle className="heading">Form accessibile</PageTitle>
        {/* FORM COMPONENT */}
        <Form />
      </Content>
    </Main>
  )
}

export default App
