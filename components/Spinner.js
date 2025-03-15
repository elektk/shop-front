import { BounceLoader } from "react-spinners";
import { Wrapper } from "@/styles/Spinner.styles";

export default function Spinner({ fullWidth }) {
  return (
    <Wrapper fullWidth={fullWidth}>
      <BounceLoader speedMultiplier={3} color={'#555'} />
    </Wrapper>
  );
}
