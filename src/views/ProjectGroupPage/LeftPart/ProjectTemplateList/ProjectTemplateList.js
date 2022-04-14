import React from "react";

import { Box, List, ListItemIcon, ListItemText } from "@material-ui/core";
import SvgIcon from "@material-ui/core/SvgIcon";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import SearchInput from "../../../../components/SearchInput";
import { TEMPLATE } from "mocks/template";
import {
  ExpandLess,
  ExpandMore,
  LibraryAddCheckOutlined,
} from "@material-ui/icons";
import { Collapse, ListItem, ListItemButton } from "@mui/material";
import "./style.scss";

const Banner = ({ className = "", ...props }) => (
  <div className={`view_ProjectGroup_List___banner ${className}`} {...props} />
);

const LeftContainer = styled.div`
  background: #f1f2f4;
  height: 100vh;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
`;
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
  const { t } = useTranslation();
  const [open, setOpen] = React.useState();

  const handleClick = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

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
        <Box className={`view_ProjectGroup_List--startButton active`}>
          <LibraryAddCheckOutlined htmlColor="#d46ffb" />
          <span>{t("LABEL_CHAT_TASK_THU_VIEN_MAU_LABEL")}</span>
        </Box>

        <Box>
          <List>
            {TEMPLATE.map((temp) => (
              <>
                <ListItem disablePadding disableGutters key={temp.id}>
                  <ListItemButton
                    onClick={() => handleClick(temp.id)}
                    sx={{ pl: 6 }}
                  >
                    <ListItemText primary={temp.name} />
                    {temp.templates &&
                      temp.templates.length > 0 &&
                      (open === temp.id ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemButton>
                </ListItem>
                {temp.templates && temp.templates.length > 0 && (
                  <Collapse in={open === temp.id} timeout="auto" unmountOnExit>
                    <List component="div">
                      {temp.templates.map((child) => (
                        <ListItem disablePadding disableGutters key={child.id}>
                          <ListItemButton sx={{ pl: 8 }}>
                            <ListItemText primary={child.name} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </>
            ))}
          </List>
        </Box>
      </Box>
    </LeftContainer>
  );
};

export default ProjectTemplateList;
