import StarOutline from "@/components/icons/StarOutline";
import StarSolid from "@/components/icons/StarSolid";
import { useState } from "react";
import { StarsWrapper, StarWrapper } from "@/styles/StarsRating.styles";

export default function StarsRating({
  size = "md",
  defaultHowMany = 0,
  disabled,
  onChange
}) {
  const [howMany, setHowMany] = useState(defaultHowMany);
  const five = [1, 2, 3, 4, 5];

  function handleStarClick(n) {
    if (disabled) return;
    setHowMany(n);
    onChange?.(n);
  }

  return (
    <StarsWrapper>
      {five.map(n => (
        <StarWrapper
          key={n}
          disabled={disabled}
          size={size}
          onClick={() => handleStarClick(n)}
        >
          {howMany >= n ? <StarSolid /> : <StarOutline />}
        </StarWrapper>
      ))}
    </StarsWrapper>
  );
}
