import React from "react";
import MailIcon from "@material-ui/icons/Mail";
import "./Layout.css";
import { Button } from "@material-ui/core";
import PlusOne from "@material-ui/icons/PlusOne";
import Calendar from "@material-ui/icons/CalendarToday";
function Header({ title, actions = [] }) {
  return (
    <div className="comp_JobPage_Layout_Header">
      <div className="comp_JobPage_Layout__Title">{title}</div>
      <div className="comp_JobPage_Layout__Actions">
        <div className="comp_JobPage_Layout__Actions_Item">
          <MailIcon />
          <div>Tim kiem</div>
        </div>
        <div className="comp_JobPage_Layout__Actions_Item">
          <Calendar />
          <div>2019</div>
        </div>
        <div className="comp_JobPage_Layout__Actions_Item">
          <MailIcon />
          <div>mo rong</div>
        </div>
        <div className="comp_JobPage_Layout__Actions_Item">
          <MailIcon />
          <div>cai dat</div>
        </div>
      </div>
      <Button variant="contained" color="secondary" startIcon={<PlusOne />}>
        tao cong viec
      </Button>
    </div>
  );
}
function Layout({ children, title }) {
  return (
    <div>
      <Header title={title} />
      {children}
    </div>
  );
}

export default Layout;
