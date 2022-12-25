import React from "react";
import styled from "styled-components";

import { COLORS } from "../../constants";

import Icon from "../Icon";
import VisuallyHidden from "../VisuallyHidden";

// not surprisingly, Josh's is a lot simpler
//   https://github.com/css-for-js/mini-component-library/blob/solution/src/components/IconInput/IconInput.js
// a lot of the simplification comes from using `&::placeholder` pseudoselector
// others come from more elegant translation from STYLES to `style` property

const STYLES = {
  small: {
    "--font-size": 14 / 16 + "rem",
  },
  large: {
    "--font-size": 18 / 16 + "rem",
  },
};

const IconInput = ({ label, icon, width = 250, size, placeholder }) => {
  const [value, setValue] = React.useState("");
  const handleChange = (event) => setValue(event.target.value);

  const styles = STYLES[size];
  if (!styles) {
    throw new Error(`Unknown size passed to ProgressBar: ${size}`);
  }

  styles["--color"] = value ? COLORS.gray700 : COLORS.gray500;
  styles["--font-weight"] = value ? 700 : 400;
  styles["--hover-color"] = value ? COLORS.black : "currentColor";
  styles["--width"] = width + "px";

  return (
    <Wrapper style={styles}>
      <InputIcon style={styles}>
        <Icon
          id={icon}
          size={size === "large" ? 18 : 14} /* how to make relative to em? */
          strokeWidth={size === "large" ? 2 : 1}
        ></Icon>
      </InputIcon>
      <Input
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
        style={styles}
      ></Input>
      <VisuallyHidden>{label}</VisuallyHidden>
    </Wrapper>
  );
};

const Wrapper = styled.span`
  position: relative;
`;

const Input = styled.input`
  width: var(--width);
  padding-left: 1.625em;

  color: var(--color);
  font-weight: var(--font-weight);
  font-size: var(--font-size);

  border: none; // reset default border
  border-bottom: 2px solid ${COLORS.black};

  &:focus {
    outline-offset: 0.25em;
  }

  &:hover {
    color: var(--hover-color);
  }
`;

const InputIcon = styled.div`
  position: absolute;
  width: var(--icon-width);
  height: var(--icon-width);
  bottom: 0.125rem;
  left: 0;
  color: ${COLORS.gray700};
  pointer-events: none;

  ${Wrapper}:hover & {
    color: ${COLORS.black};
  }
`;

export default IconInput;
