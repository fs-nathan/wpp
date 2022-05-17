import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

const NameInput = (
  { defaultValue, maxWidth = "calc(100% - 160px)", ...props },
  ref
) => {
  const refTextarea = useRef(null);
  const [value, setValue] = useState(defaultValue);

  useImperativeHandle(ref, () => ({
    blur: () => refTextarea.current.blur(),
    focus: () => refTextarea.current.focus(),
    moveToEnd: () => {
      setTimeout(() => {
        refTextarea.current.selectionStart = refTextarea.current.selectionEnd =
          value.length;
      }, 0);
    },
  }));

  const _handleChange = (e) => {
    setValue(e.target.value);
  };

  const width = getTextWidth(value, getCanvasFontSize(refTextarea.current));

  return (
    <>
      <TextAreaCustom
        ref={refTextarea}
        rows={1}
        defaultValue={defaultValue}
        placeholder={"Write a task name"}
        style={{ width, maxWidth }}
        onChange={_handleChange}
        {...props}
      />
    </>
  );
};

function getTextWidth(text, font) {
  // re-use canvas object for better performance
  const canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement("canvas"));
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}

function getCssStyle(element, prop) {
  return window.getComputedStyle(element, null).getPropertyValue(prop);
}

function getCanvasFontSize(el = document.body) {
  if (!el) return "";
  const fontWeight = getCssStyle(el, "font-weight") || "normal";
  const fontSize = getCssStyle(el, "font-size") || "16px";
  const fontFamily = getCssStyle(el, "font-family") || "Times New Roman";

  return `${fontWeight} ${fontSize} ${fontFamily}`;
}

export const TextAreaCustom = styled.textarea`
  white-space: pre;
  background: transparent;
  border-radius: 1.5px;
  display: block;
  outline: 0;
  overflow: hidden;
  resize: none;

  margin-left: 5px;
  border: 1px solid transparent;
  font-size: 14px;
  line-height: 20px;
  margin: 0;
  min-width: 20px;
  padding: 0 5px;
  text-rendering: optimizeSpeed;
  color: #1e1f21;

  /* new css */
  min-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  ${(props) => {
    if (props.isGroup) {
      return {
        fontWeight: 500,
        fontSize: 16,
        padding: 5,
        borderColor: "#6d6e6f",
      };
    }
  }}
  &:hover {
    border: 1px solid #6d6e6f;
  }
  &:focus {
    border-color: ${(props) => (props.isGroup ? "#cfcbcb" : "transparent")};
  }
`;

export default forwardRef(NameInput);
