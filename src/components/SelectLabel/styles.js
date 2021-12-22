import styled from "styled-components";

export const WrapperWPSelectLabel = styled.div`
  width: 100%;
  margin-top: 20px;
`;
export const WPWrapperSelectList = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
`;
export const WPSelectList = styled.div`
  flex: 1 1 auto;
`;
export const WPSelectRowTarget = styled.div``;
export const WPSelectItem = styled.div`
  border-bottom: 1px solid transparent;
  border-top: 1px solid transparent;
  height: 34px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  overflow: visible;
  border-bottom: 1px solid #cfcbcb;
  padding: 0;
  position: relative;
  transition: box-shadow 0s ease-in;
  white-space: nowrap;
`;
export const WPSelectItemLeft = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1000 auto;
  height: 100%;
  justify-content: flex-start;
  min-width: 1px;
  position: relative;
`;
export const WPSelectItemRight = styled.div`
  align-items: center;
  display: flex;
  flex: 0 1 auto;
  height: 100%;
  justify-content: flex-end;
  max-width: 75%;
  min-height: 34px;
  overflow: hidden;
`;
export const WPSelectItemRightIcon = styled.div`
  border-radius: 6px;
  background: #00000000;
  border-color: #00000000;
  fill: #6d6e6f;
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    flex: 0 0 auto;
    height: 12px;
    width: 12px;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;
export const WPSelectItemLeftChildren = styled.div`
  display: flex;
  flex-grow: 1;
  height: 100%;
  overflow: hidden;
`;
export const WPSelectRowNameContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  overflow: hidden;
  position: relative;
`;
export const WPSelectIconSelect = styled.div`
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border-color: #5da283 !important;
  fill: #fff;
  align-items: center;
  display: flex;
  fill: #fff;
  height: 16px;
  justify-content: center;
  width: 16px;
  cursor: pointer;
`;
export const WPSelectInput = styled.input`
  background: transparent;
  border: 0;
  box-sizing: border-box;
  display: block;
  flex-grow: 1;
  height: 100%;
  outline: 0;
  overflow: hidden;
  padding: 0 8px;
  resize: none;
  text-rendering: optimizeSpeed;
  line-height: normal;
  color: inherit;
  font: inherit;
  margin: 0;
  vertical-align: baseline;
  color: #000000de;
`;

export const ButtonAddMore = styled.div`
  height: 28px;
  min-height: 28px;
  line-height: 28px;
  padding: 0 8px;
  font-weight: 500;
  display: inline-block;
  cursor: pointer;
  align-items: center;
  margin-top: 15px;
  box-sizing: border-box;
  display: inline-flex;
  flex-shrink: 0;
  justify-content: center;
  overflow: hidden;
  transition-duration: 0.2s;
  transition-property: background, border, box-shadow, color, fill;
  user-select: none;
  color: #666;
  display: inline-flex;
  border-radius: 5px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    border-color: #00000000;
    color: #666;
  }
`;

export const WrapperSelectColor = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -2px;
  padding: 8px;
  width: 200px;
`;
export const ItemSelectColor = styled.div`
  background-color: ${(props) => props.color};
  box-sizing: border-box;
  color: ${(props) => props.color};
  fill: currentColor;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  height: 20px;
  margin: 2px;
  width: 20px;
  padding: 0;
  border: 0;
  font-size: 100%;
  font-family: inherit;
  vertical-align: baseline;
`;
