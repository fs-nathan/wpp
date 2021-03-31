import React from "react";
import {useTranslation} from "react-i18next";
import CustomModal from "../../../../components/CustomModal";
import {
  Checkbox, IconButton, InputBase, List, ListItem, ListItemIcon, ListItemText,
  ListSubheader, Paper, makeStyles
} from "@material-ui/core";
import "./styles.scss";
import SearchIcon from "@material-ui/icons/Search";
const useStyles = makeStyles((theme) => ({
  root: {
    border: '2px solid rgba(0, 0, 0, 0.12)'
  },
  input: {
    width: '92%'
  },
}));
function AddToPersonalBoardModal({open = false, setOpen}) {
  const {t} = useTranslation();
  const classes = useStyles();
  const [searchPattern, setSearchPattern] = React.useState("");
  return (
    <CustomModal
      open={open} setOpen={setOpen} title={t("LABEL_PIN_CONTROL_PANEL")}
      height='tall'
    >
      <Paper component="form" elevation={0} variant={"outlined"} className={classes.root}>
        <IconButton  aria-label="menu">
          <SearchIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder={t("LABEL_SEARCH_PERSONAL_BOARD")}
          inputProps={{ 'aria-label': 'search personal board' }}
        />
      </Paper>
      <List
        component={"nav"} className={"pinToPanelModal--selectList"}
        subheader={<ListSubheader component="div">Head Office</ListSubheader>}
      >
        <ListItem>
          <ListItemIcon>
            <Checkbox
              color={"primary"}
              edge="start"
              checked={true}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': "checkbox-list-label-1" }}
            />
          </ListItemIcon>
          <ListItemText id={"checkbox-list-label-1"} primary={"Khách Hàng"} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Checkbox
              edge="start"
              color={"primary"}
              checked={true}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': "checkbox-list-label-1" }}
            />
          </ListItemIcon>
          <ListItemText id={"checkbox-list-label-1"} primary={"Khách Hàng"} />
        </ListItem>
      </List>
    </CustomModal>
  );
}

export default AddToPersonalBoardModal;