import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  SvgIcon,
} from "@material-ui/core";
import { mdiDownload } from "@mdi/js";
import { openDocumentDetail } from "actions/system/system";
import { FileType } from "components/FileType";
import React from "react";
import { useActions } from "views/JobPage/hooks/useActions";
import "./FileListItem.css";
export const FileListItem = ({ file }) => {
  const openDocumentModal = useActions(() => openDocumentDetail(file), [file]);
  return (
    <ListItem onClick={openDocumentModal} button className="comp_FileListItem">
      <ListItemAvatar>
        <Avatar src={FileType(file.type)}></Avatar>
      </ListItemAvatar>
      <ListItemText
        nowrap
        primary={file.url.split("-")[1]}
        secondary={`${file.type} - ${file.size}`}
      />
      <ListItemSecondaryAction>
        <a target="_blank" href={file.url} download id={file.url}>
          <IconButton
            className="comp_FileListItem__dowload"
            edge="end"
            aria-label="delete"
          >
            <SvgIcon>
              <path d={mdiDownload}></path>
            </SvgIcon>
          </IconButton>
        </a>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
