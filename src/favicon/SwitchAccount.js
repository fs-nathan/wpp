import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { Person } from "@material-ui/icons";
import { TOKEN } from "constants/constants";
import { useLocalStorage } from "hooks";
import React, { useEffect } from "react";
import { useToggle } from "react-use";
import favicon from "./favicon.png";
const SwitchAccount = ({ image = favicon } = {}) => {
  const [open, toggle] = useToggle();
  const [tokens, setTokens, removeTokens] = useLocalStorage("tokens", {});
  // const [token, setToken, removeToken] = useLocalStorage("token");
  useEffect(() => {
    window.switchAccount = () => {
      toggle();
    };
    const token = localStorage.getItem(TOKEN);

    if (token) {
      setTokens({
        ...tokens,
        [token]: true,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return open ? (
    <Dialog
      maxWidth="sm"
      onClose={() => toggle()}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      <List>
        {Object.keys(tokens).map((token) => (
          <ListItem
            button
            onClick={() => {
              localStorage.setItem(TOKEN, token);
              window.location.reload();
            }}
            key={token}
          >
            <ListItemAvatar>
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={token} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  ) : null;
};
export default SwitchAccount;
