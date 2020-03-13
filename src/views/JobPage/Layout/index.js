import React from "react";
import MailIcon from "@material-ui/icons/Mail";
import "./Layout.css";
import { Button, ButtonBase, Container } from "@material-ui/core";
import PlusOne from "@material-ui/icons/PlusOne";
import Calendar from "@material-ui/icons/CalendarToday";
import { withStyles } from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";
import EventIcon from "@material-ui/icons/Event";
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";
import SettingsIcon from "@material-ui/icons/Settings";
const BootstrapButton = withStyles({
  root: {
    boxShadow: "none",
    color: "#fff"
  }
})(Button);

const ActionButton = ({ icon, children }) => (
  <ButtonBase className="comp_JobPage_Layout__Actions_Item">
    {icon}
    {children}
  </ButtonBase>
);
function Header({ title, actions = [] }) {
  return (
    <Container className="comp_JobPage_Layout_Header">
      <div className="comp_JobPage_Layout__Title">{title}</div>
      <div className="comp_JobPage_Layout__Actions">
        <ActionButton icon={<SearchIcon />}>
          <div>Tim kiem</div>
        </ActionButton>
        <ActionButton icon={<EventIcon />}>
          <div>2019</div>
        </ActionButton>
        <ActionButton icon={<ZoomOutMapIcon />}>
          <div>mo rong</div>
        </ActionButton>
        <ActionButton icon={<SettingsIcon />}>
          <div>cai dat</div>
        </ActionButton>
      </div>
      <BootstrapButton
        variant="contained"
        color="secondary"
        disableElevation
        startIcon={<PlusOne />}
      >
        tao cong viec
      </BootstrapButton>
    </Container>
  );
}
function Layout({ children, title }) {
  return (
    <div className="comp_JobPage_Layout">
      <Header title={title} />
      <div className="comp_JobPage_Layout__Content">{children}</div>
    </div>
  );
}

export default Layout;
