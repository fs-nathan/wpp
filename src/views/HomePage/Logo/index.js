import React, { useContext } from "react";
import GroupDetailContext from "../GroupDetailContext";

function Logo() {
  const { cover, sologan } = useContext(GroupDetailContext);
  return (
    <div
      style={{
        position: "relative",
        height: "100%",
      }}
    >
      <img
        src={cover}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        alt="cover"
      ></img>
      <div
        style={{
          color: "#fff",
          textShadow: "#000 0px 0px 8px",
          fontWeight: "bold",
          fontSize: "24px",
          padding: "20px",
          position: "absolute",
          bottom: 0,
        }}
      >
        {sologan}
      </div>
    </div>
  );
}

export default Logo;
