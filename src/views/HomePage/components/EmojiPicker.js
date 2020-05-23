import { NimblePicker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import data from "emoji-mart/data/google.json";
import React from "react";
const EmojiPicker = (props) => (
  <NimblePicker set="google" data={data} {...props} />
);
export default EmojiPicker;
