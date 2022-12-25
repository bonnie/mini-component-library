import React from "react";
import styled from "styled-components";

import { COLORS } from "../../constants";
import Icon from "../Icon";
import { getDisplayedValueWidth } from "./Select.helpers";

const height = `${43 / 16}rem`;
const padding = `${12 / 16}rem ${18 / 16}rem ${12 / 16}rem ${16 / 16}rem`;

/* adapted from 
  - https://jonasfaehrmann.com/writing/post/2020-04-02-html-lessselectgreater-with-dynamic-size/
  - https://www.w3docs.com/tools/code-editor/2709 
*/
const Select = ({ label, value, onChange, children }) => {
  const displayedValueWidth = getDisplayedValueWidth(
    value,
    children,
    "1rem roboto, sans-serif"
  );

  // all in rem
  const paddingWidthX = (18 + 16) / 16;
  const dropArrowWidth = 12 / 16;
  const selectWidth = displayedValueWidth / 16 + paddingWidthX + dropArrowWidth;

  return (
    <SelectWrapper>
      <DropArrow style={{ "--width": dropArrowWidth + "rem" }}>
        <Icon size={24} id="chevron-down"></Icon>
      </DropArrow>
      <StyledSelect
        style={{
          "--height": height,
          "--width": selectWidth + "rem",
          "--padding": padding,
          "--after-width": dropArrowWidth + "rem",
        }}
        value={value}
        onChange={onChange}
      >
        {children}
      </StyledSelect>
    </SelectWrapper>
  );
};

const SelectWrapper = styled.span`
  position: relative;
  color: ${COLORS.gray700};

  &:hover {
    color: ${COLORS.black};
  }
`;

const DropArrow = styled.span`
  position: absolute;
  right: 18px;
  top: -2px; /* why -2px? bc of top padding in container? */
  width: var(--width);
  pointer-events: none; /* allows for clicks to go through to select element sitting behind */
`;

const StyledSelect = styled.select`
  // remove default dropdown arrow
  //   reference: https://www.w3docs.com/snippets/css/how-to-style-a-select-box-drop-down-with-only-css.html
  appearance: none;

  height: var(--height);
  width: var(--width);
  padding: var(--padding);
  border: none;
  border-radius: 0.5rem;

  background-color: ${COLORS.transparentGray15};
  color: ${COLORS.gray700}; /* why doesn't this inherit from SelectWrapper? */

  ${SelectWrapper}:hover & {
    color: ${COLORS.black};
  }
`;

export default Select;
