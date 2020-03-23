import { Drawer } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { useTranslation } from "react-i18next";
import LoadingBox from "../../../components/LoadingBox";
import { JobPageContext } from "../JobPageContext";

const DrawerTaskQuickView = () => {
  const { t } = useTranslation();
  const { quickTask, setQuickTask } = useContext(JobPageContext);
  const [numberNotView, setNumberNotView] = useState(0);
  const [listNotification, setListNotification] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // if (isLoading) return <LoadingBox />;
  return (
    <Drawer
      anchor="right"
      open={quickTask}
      onClose={() => setQuickTask(undefined)}
      className={`Drawer-Compenent right`}
    >
      <div className="drawer-content">
        <div className="content-drawer">
          {isLoading ? (
            <LoadingBox />
          ) : (
            <Scrollbars autoHide autoHideTimeout={500}>
              asdsad
            </Scrollbars>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default DrawerTaskQuickView;
