import { setMemberFilter } from "actions/kanban/setting";
import { connect } from "formik";
import { get } from "lodash";
import React from "react";
import Header from "./Header";
import { projectSelector } from "./Header/selectors";
import KanbanBoard from "./KanbanBoard";
import "./style.scss";

const Container = ({ className = "", isOpen, ...props }) => (
  <div
    className={`view_KanbanPage___container${
      isOpen ? "" : "-closed"
    } ${className}`}
    {...props}
  />
);

function KanbanPage({
  project,
  doSetMemberFitler,
  projectId,
  handleOpenModal,
  isOpen,
  expand,
  handleExpand,
}) {
  return (
    <Container
      isOpen={isOpen}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Header projectId={projectId} />
      <KanbanBoard projectId={projectId} handleOpenModal={handleOpenModal} />
    </Container>
  );
}

export default KanbanPage;
