import { StyledButton } from "@/styles/Button.styles";

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
