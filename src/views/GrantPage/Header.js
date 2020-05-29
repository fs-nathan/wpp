import { IconButton } from "@material-ui/core";
import { mdiChevronDown, mdiMenuDown } from "@mdi/js";
import Icon from "@mdi/react";
import { Col, Row } from "antd";
import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-use";
import { changeShowHeader } from "../../actions/gantt";
import IconComponent from "./IconComponent";
import RightHeader from "./RightHeader";
import "./table.css";

const Header = ({
  handleShowProject,
  projectInfo,
  scheduleIdDefault,
  showHeader,
  changeShowHeader,
  showProject,
}) => {
  const history = useHistory();
  const { pathname } = useLocation();
  return showHeader ? (
    <Row
      style={{ margin: 0, borderBottom: "1px solid #e8e8e8" }}
      gutter={[16, 8]}
    >
      <Col className="gantt-left-header__container" span={12}>
        <div>
          <Row>
            <Col span={2}>
              <img
                height={40}
                width={40}
                className="gantt--image-project"
                src={projectInfo.group_icon}
              />
            </Col>
            <Col span={22}>
              <p className="gantt--title-project">
                <div
                  onClick={() => {
                    handleShowProject(!showProject);
                  }}
                  className="gantt--title-project__name"
                >
                  {projectInfo.name}
                </div>{" "}
                <div>
                  <IconButton
                    onClick={() => {
                      handleShowProject(!showProject);
                    }}
                    aria-controls="simple-menu"
                    className="gantt-btn__list-project"
                    style={{ padding: 0 }}
                    aria-haspopup="true"
                    size="small"
                  >
                    <Icon path={mdiMenuDown} size={1} />
                  </IconButton>
                </div>
              </p>
              {/* <ListHeader show={showProject} setShow={setShowSelectProject} /> */}
              <div className="gantt--navigation">
                <p
                  onClick={() =>
                    history.push(`${pathname.replace("gantt", "chat")}`)
                  }
                >
                  Chat
                </p>
                <p
                  onClick={() =>
                    history.push(`${pathname.replace("gantt", "table")}`)
                  }
                >
                  Table
                </p>
                <p className="gantt--left-header__text-active">Gantt</p>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
      <Col offset={2} span={10}>
        <RightHeader scheduleIdDefault={scheduleIdDefault} />
      </Col>
    </Row>
  ) : (
    <div className="icon-show-header">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <IconComponent
          onClick={() => {
            changeShowHeader(!showHeader);
          }}
          size={1.3}
          title={""}
          path={mdiChevronDown}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  showHeader: state.gantt.showHeader,
  projectInfo: state.gantt.projectInfo,
});
const mapDispatchToProps = {
  changeShowHeader,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
