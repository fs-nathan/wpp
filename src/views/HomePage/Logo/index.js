import React, { useContext } from "react";
import GroupDetailContext from "../GroupDetailContext";
import "./Logo.css";
function Logo() {
  const { cover, sologan } = useContext(GroupDetailContext);
  return (
    <div className="comp_homeCover">
      <img src={cover} alt="cover"></img>
      <div>{sologan}</div>
    </div>
  );
}

export default Logo;
