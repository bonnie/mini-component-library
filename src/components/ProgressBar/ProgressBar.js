/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components";

import { COLORS } from "../../constants";
import VisuallyHidden from "../VisuallyHidden";

const SIZES = {
  small: {
    "--height": "8px",
    "--border-radius": "4px",
  },
  medium: {
    "--height": "12px",
    "--border-radius": "4px",
  },
  large: {
    "--height": "24px",
    "--border-radius": "8px",
  },
};

const barWidth = 370;
const largePadding = 4;

const ProgressBar = ({ value, size }) => {
  const styles = SIZES[size];

  if (!styles) {
    throw new Error(`Unknown size passed to ProgressBar: ${size}`);
  }

  let progressWidth = (barWidth * value) / 100;

  if (size === "large") {
    styles["--padding"] = largePadding + "px";
    progressWidth = progressWidth - 2 * largePadding;
  }

  return (
    <BarContainer
      role="progressbar"
      aria-valuenow={value}
      style={{ "--bar-width": barWidth + "px" }}
    >
      <Bar style={styles}>
        <Progress width={progressWidth} style={styles} />
      </Bar>
    </BarContainer>
  );
};

const BarContainer = styled.span`
  width: var(--bar-width);
`;

const Bar = styled.svg`
  width: var(--bar-width);
  height: var(--height);
  border-radius: var(--border-radius);
  padding: var(--padding);
  box-shadow: inset 0px 2px 4px ${COLORS.transparentGray35};
  background: ${COLORS.transparentGray15};
`;

const Progress = styled.rect`
  height: var(--height);
  fill: blue;
  padding: var(--padding);
`;

export default ProgressBar;
