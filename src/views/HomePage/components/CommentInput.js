import { Box, IconButton, InputBase, Popover } from "@material-ui/core";
import {
  AttachFileOutlined,
  CameraAltOutlined,
  ExtensionOutlined,
  InsertEmoticonOutlined,
} from "@material-ui/icons";
import { getListStickersRequest } from "actions/chat/chat";
import colors from "helpers/colorPalette";
import words from "lodash/words";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SendFileModal from "views/JobDetailPage/ChatComponent/SendFile/SendFileModal";
import { get } from "views/JobPage/utils";
import TasksScrollbar from "views/SettingGroupPage/GroupPermissionSettings/components/TasksScrollbar";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import { commentAttr } from "../contant/attrs";
import "./CommentInput.css";
import EmojiPicker from "./EmojiPicker";
export const CommentInput = React.memo(
  ({ placeholder, handleComment, inputId, reply, setReply }) => {
    const inputRef = React.useRef();
    const anchorElRef = React.useRef();
    const [element, setElement] = useState();
    const open = !!element;
    const [openFilePicker, setOpenFilePicker] = useState();
    const handleClose = () => {
      setElement(undefined);
    };
    return (
      <>
        <div className="comp_CommentInput" ref={anchorElRef}>
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
              inputRef={inputRef}
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
            <IconButton
              onClick={() => {
                setElement(
                  <EmojiPicker
                    onSelect={({ native }) => {
                      inputRef.current.value = inputRef.current.value + native;
                    }}
                  />
                );
              }}
              id={"emoji"}
              size="small"
              aria-label="emoji"
            >
              <InsertEmoticonOutlined />
            </IconButton>
            <IconButton id={"camera"} size="small" aria-label="camera">
              <label htmlFor={`${inputId}_FilePicker`}>
                <CameraAltOutlined />
              </label>
            </IconButton>
            <FilePicker
              id={`${inputId}_FilePicker`}
              onSelect={(file) => {
                handleComment("", file);
              }}
            />
            <IconButton
              onClick={() => {
                setOpenFilePicker(true);
              }}
              id={"file"}
              size="small"
              aria-label="file"
            >
              <AttachFileOutlined />
            </IconButton>
            {
              <ModalFilePicker
                {...{
                  open: openFilePicker,
                  setOpen: setOpenFilePicker,
                  handleUploadFile: (e) => {
                    handleComment("", [...e.target.files]);
                  },
                  onConfirmShare: (files) => {
                    const isFileFromStore = (file) => !!file.id;
                    const isFileFromGoggle = (file) => !!file.file_id;
                    const { file_ids, file, google_data } = files.reduce(
                      (result, f) => {
                        switch (true) {
                          case isFileFromStore(f):
                            result.file_ids.push(f.id);
                            break;
                          case isFileFromGoggle(f):
                            result.google_data.push(f);
                            break;
                          default:
                            result.file.push(f);
                            break;
                        }
                        return result;
                      },
                      {
                        file_ids: [],
                        file: [],
                        google_data: [],
                      }
                    );
                    handleComment("", null, null, file_ids, google_data);
                  },
                }}
              />
            }
            <IconButton
              onClick={() => {
                setElement(
                  <StickerPicker
                    handleClickSticker={(sticker) =>
                      handleComment("", null, sticker)
                    }
                  />
                );
              }}
              id={"sticker"}
              size="small"
              aria-label="sticker"
            >
              <ExtensionOutlined />
            </IconButton>
          </Box>
        </div>
        <Popover
          key="loaded"
          open={open}
          anchorEl={anchorElRef.current}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          {!!element && element}
        </Popover>
      </>
    );
  }
);

const StickerPicker = ({ isOpen, handleClose, handleClickSticker }) => {
  const listStickers = useSelector((state) => state.chat.listStickers);
  const stickerKeyWord = useSelector((state) => state.chat.stickerKeyWord);
  const renderStickersList = listStickers.filter(
    (sticker) =>
      !stickerKeyWord || words(sticker.host_key).indexOf(stickerKeyWord) !== -1
  );
  // console.log(renderStickersList, stickerKeyWord)
  const onClickSticker = handleClickSticker;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListStickersRequest());
  }, [dispatch]);
  return (
    <TasksScrollbar style={{ width: "354px", height: "300px" }}>
      <Box
        display="flex"
        width="100%"
        flexWrap="wrap"
        justifyContent="space-around"
        alignItems="center"
      >
        {renderStickersList.map((el) => (
          <div
            key={el.id}
            style={{ width: "28%" }}
            onClick={() => onClickSticker(el)}
          >
            <img
              style={{ width: "100%" }}
              // style={{ width: el.witdh_of_web, height: el.witdh_of_web }}
              alt="sticker"
              src={el.url}
            />
            &nbsp;&nbsp;&nbsp;
            <span>{el.name}</span>
          </div>
        ))}
      </Box>
    </TasksScrollbar>
  );
};
const FilePicker = ({ id, onSelect }) => {
  return (
    <input
      hidden
      id={id}
      name={id}
      type="file"
      accept="image/*"
      onChange={(e) => {
        onSelect([...e.target.files]);
      }}
    />
  );
};
const ModalFilePicker = ({
  name,
  open,
  setOpen,
  handleUploadFile,
  onConfirmShare,
}) => {
  return (
    <SendFileModal
      open={open}
      setOpen={setOpen}
      handleUploadFile={handleUploadFile}
      onConfirmShare={onConfirmShare}
    />
  );
};
