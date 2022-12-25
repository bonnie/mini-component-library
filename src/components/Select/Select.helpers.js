import React from "react";

export function getDisplayedValueWidth(value, children, font) {
  const childArray = React.Children.toArray(children);
  const selectedChild = childArray.find((child) => child.props.value === value);

  const displayedText = selectedChild.props.children;
  return getTextWidth(displayedText, font);
}

function getTextWidth(text, font) {
  /* adapted from https://stackoverflow.com/a/58705306 */
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  context.font = font || getComputedStyle(document.body).font;
  console.log("context.font", context.font);

  return context.measureText(text).width;
}
