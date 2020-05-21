import { makeStyles } from "@material-ui/core";
import { colors } from "views/OfferPage/contants/attrs";

export const styles = makeStyles(theme => ({
  p_0: {
    margin: 0
  },
  right_1: {
    marginLeft: "1em"
  },
  border_right: {
    borderRight: "1px solid #3333"
  },
  border_bottom: {
    borderBottom: "1px solid #3333"
  },
  left_column: {
    height: "100vh"
  },
  name: {
    fontSize: "20px",
    color: "black"
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  status_title: {
    width: "auto",
    height: "30px",
    lineHeight: "30px",
    paddingLeft: "5px",
    paddingRight: "5px"
  },
  blue: {
    backgroundColor: colors.offer_status_waiting,
    color: "white"
  },
  ml_1: {
    marginLeft: "1em"
  },
  mt_1: {
    marginTop: "1em"
  },
  m_0: {
    margin: 0
  },
  p_1: {
    padding: "1em"
  },
  pb_1: {
    paddingBottom: "1em"
  },
  pt_1: {
    paddingTop: "1em"
  },
  bg_orange: {
    color: "white",
    backgroundColor: "#FD7E14"
  },
  status_file: {
    width: "auto",
    display: "flex",
    alignItems: "center",
    padding: "5px"
  }
  ,
  bg_red: {
    backgroundColor: colors.offer_status_cancel,
    color: "white"
  },
  bg_blue: {
    backgroundColor: colors.number_offer,
    color: "white"
  },
  bg_green: {
    backgroundColor: colors.offer_of_me_approved,
    color: "white"
  },
  bg_grey: {
    backgroundColor: "#e0e0e0",
    color: "white"
  },
  color_green: {
    color: colors.offer_of_me_approved
  },
  color_blue: {
    color: colors.number_offer
  },
  color_orange: {
    color: "#FD7E14"
  },
  color_red: {
    color: "#f44336"
  },
  color_grey: {
    color: "#e2e2e2"
  },
  icon_file: {
    height: "auto",
    fontSize: "15px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    color: "black",
    borderRadius: "3px",
    padding: "5px",
    paddingRight: "5px"
  },
  add_file_button: {
    fontWeight: "400px !important"
  },
  h_100: {
    height: "100%"
  },
  w_100: {
    width: "100%"
  },
  btn: {
    borderRadius: "3px",
    border: "1px solid #3333",
    width: "100%",
    height: "40px"
  },
  small_avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  handle_button: {
    fontSize: "13px",
    fontWeight: "400",
    color: "#1673e5",
    textTransform: "none"
  }
}))