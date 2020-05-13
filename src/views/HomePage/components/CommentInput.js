import { Box, IconButton, InputBase } from "@material-ui/core";
import {
  AttachFileOutlined,
  CameraAltOutlined,
  ExtensionOutlined,
  InsertEmoticonOutlined,
} from "@material-ui/icons";
import colors from "helpers/colorPalette";
import React from "react";
import { get } from "views/JobPage/utils";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import { commentAttr } from "../contant/attrs";
export const CommentInput = React.memo(
  ({ placeholder, handleComment, inputId, reply, setReply }) => {
    return (
      <Box
        alignSelf="flex-end"
        margin="0 0 0 5px"
        border="1px solid rgba(0, 0, 0, 0.12)"
        minHeight={"40px"}
        display="flex"
        flex="1"
        style={{ background: "#f5f6f7", borderRadius: "20px" }}
        lineHeight={"30px"}
        padding="0 8px"
      >
        <Stack small style={{ flex: 1, padding: "5px 8px", lineHeight: 1.5 }}>
          {reply && (
            <Box
              color={colors.gray[0]}
              padding="0 4px"
              borderLeft={`2px solid ${colors.blue[0]}`}
            >
              <b>{get(reply, commentAttr.user_create_name)}</b>{" "}
              {get(reply, commentAttr.content)}
            </Box>
          )}
          <InputBase
            id={inputId}
            onKeyDown={(e) => {
              if (e.which == 13 || e.keyCode == 13 || e.key == "Enter") {
                e.preventDefault();
                handleComment(e.target.value);
                e.target.value = "";
              }
              if (e.which == 8 || e.keyCode == 8 || e.key == "Backspace") {
                if (e.target.value.length === 0) {
                  e.preventDefault();
                  setReply(undefined);
                }
              }
            }}
            multiline
            placeholder={placeholder}
          ></InputBase>
        </Stack>

        <Box display="flex" alignItems="center" height={"40px"}>
          <IconButton size="small" aria-label="delete">
            <InsertEmoticonOutlined />
          </IconButton>
          <IconButton size="small" aria-label="delete">
            <CameraAltOutlined />
          </IconButton>
          <IconButton size="small" aria-label="delete">
            <AttachFileOutlined />
          </IconButton>
          <IconButton size="small" aria-label="delete">
            <ExtensionOutlined />
          </IconButton>
        </Box>
      </Box>
    );
  }
);
