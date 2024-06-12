import styled from "styled-components"

const ErrorMessage = styled.p `
  color: red;
  font-weight: bold;
  font-size: 16px;
`

export default function Error({ children, text }: { children?: string, text?: string}) {
  return (
    <ErrorMessage role="alert">
      { children || text }
    </ErrorMessage>
  )
}
