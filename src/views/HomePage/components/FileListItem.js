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
import { FileType } from "components/FileType";
import React from "react";
import "./FileListItem.css";
export const FileListItem = ({ file }) => {
  return (
    <ListItem button className="comp_FileListItem">
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
          <IconButton edge="end" aria-label="delete">
            <SvgIcon>
              <path d={mdiDownload}></path>
            </SvgIcon>
          </IconButton>
        </a>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
