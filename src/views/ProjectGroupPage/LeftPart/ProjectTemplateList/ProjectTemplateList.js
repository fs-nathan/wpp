import React, { useEffect, useMemo, useState } from "react";

import { Box, List, ListItemIcon, ListItemText } from "@material-ui/core";
import SvgIcon from "@material-ui/core/SvgIcon";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import SearchInput from "../../../../components/SearchInput";
import { TEMPLATE } from "mocks/template";
import {
  ExpandLess,
  ExpandMore,
  LibraryAddCheckOutlined,
} from "@material-ui/icons";
import { Collapse, IconButton, ListItem, ListItemButton } from "@mui/material";
import "./style.scss";
import { useSelector } from "react-redux";
import Scrollbars from "react-custom-scrollbars/lib/Scrollbars";

const Banner = ({ className = "", ...props }) => (
  <div className={`view_ProjectGroup_List___banner ${className}`} {...props} />
);

const LeftContainer = styled.div`
  background: #f1f2f4;
  height: 100vh;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
`;

const SideTab = {
  Shared: 0,
  BeShared: 1,
  Public: 2,
};
const ProjectTemplateList = ({
  groups,
  route,
  canModify,
  searchPattern,
  setSearchPattern,
  handleSortProjectGroup,
  handleOpenModal,
}) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [isPublicOpen, setIsPublicOpen] = useState(true);
  const parsedPath = pathname.split("/");
  const isShared = useMemo(() => {
    return parsedPath.includes("shared");
  }, [parsedPath]);

  const isBeShared = useMemo(() => {
    return parsedPath.includes("be-shared");
  }, [parsedPath]);

  const activeCategory = useMemo(() => {
    return parsedPath[3];
  }, [parsedPath]);

  const handleClick = (tab) => {
    switch (tab) {
      case SideTab.Shared: {
        history.push("/projects/template/shared");
        break;
      }
      case SideTab.BeShared: {
        history.push("/projects/template/be-shared");
        break;
      }
      case SideTab.Public: {
        setIsPublicOpen((pre) => !pre);
        break;
      }
    }
  };
  const categories = useSelector(
    (state) => state.project.getTemplateCategory.data
  );

  function handleCategoryChoose(groupId) {
    history.push("/projects/template/" + groupId);
  }

  return (
    <LeftContainer>
      <Banner>
        <SearchInput
          fullWidth
          placeholder={t("DMH.VIEW.PGP.LEFT.LIST.FIND_TEMPLATE")}
          value={searchPattern}
          onChange={(evt) => setSearchPattern(evt.target.value)}
          style={{ background: "#fff" }}
        />
      </Banner>
      <Box className={"view_ProjectGroup_List--LeftContainer"}>
        <Box className={"view_ProjectGroup_List--listGroup"}>
          <Box
            className={`view_ProjectGroup_List--listGroup-header`}
            onClick={() => history.push("/projects")}
          >
            <SvgIcon htmlColor={"#DB7B48"}>
              <path d="M6,13c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S8.2,13,6,13z M12,3C9.8,3,8,4.8,8,7s1.8,4,4,4s4-1.8,4-4S14.2,3,12,3z M18,13 c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S20.2,13,18,13z" />
            </SvgIcon>
            <span>{t("LABEL_WORKING_GROUP")}</span>
          </Box>
        </Box>
        <Box
          className={`view_ProjectGroup_List--startButton active`}
          onClick={() => history.push("/projects/template")}
        >
          <LibraryAddCheckOutlined htmlColor="#d46ffb" />
          <span>{t("LABEL_CHAT_TASK_THU_VIEN_MAU_LABEL")}</span>
        </Box>

        <Box className="scrollList">
          <Scrollbars autoHide autoHideTimeOut={500}>
            <List>
              <ListItem
                disablePadding
                disableGutters
                className={`list-button ${isShared && "list-button--active"}`}
              >
                <ListItemButton
                  onClick={() => handleClick(SideTab.Shared)}
                  sx={{ pl: 6 }}
                >
                  <ListItemText primary="Đã chia sẻ" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding disableGutters className={`list-button`}>
                <ListItemButton
                  onClick={() => handleClick(SideTab.Public)}
                  sx={{ pl: 6 }}
                >
                  <ListItemText primary="Nhóm mẫu" />
                  {categories &&
                    categories.length > 0 &&
                    (isPublicOpen ? (
                      <div className="close-button-list">
                        <ExpandMore />
                      </div>
                    ) : (
                      <div className="close-button-list">
                        <ExpandLess style={{ transform: "rotate(90deg)" }} />
                      </div>
                    ))}
                </ListItemButton>
              </ListItem>
              <Collapse in={isPublicOpen} timeout="auto" unmountOnExit>
                <List component="nav">
                  {categories &&
                    categories.length > 0 &&
                    categories.map((child) => (
                      <ListItem
                        disablePadding
                        disableGutters
                        key={child.id}
                        className={`list-button ${
                          child.id === activeCategory && "list-button--active"
                        }`}
                      >
                        <ListItemButton
                          sx={{ pl: 8 }}
                          onClick={() => handleCategoryChoose(child.id)}
                        >
                          <ListItemText primary={child.name} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                </List>
              </Collapse>
            </List>
          </Scrollbars>
        </Box>
      </Box>
    </LeftContainer>
  );
};

export default ProjectTemplateList;
