
import { mdiCalendar, mdiChevronUp, mdiDotsVertical, mdiFlagVariant, mdiFullscreen, mdiFullscreenExit } from "@mdi/js";
import { Col, Dropdown, Row } from "antd";
import 'antd/lib/dropdown/style/index.css';
import 'antd/lib/menu/style/index.css';
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { connect } from "react-redux";
import { changeShowFullChart, changeShowHeader, scrollGantt } from "../../actions/gantt";
import { changeVisibleConfigGantt, changeVisibleExportPdfDrawer } from "../../actions/system/system";
import { SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';
import "./calendarModal.css";
import IconComponent from "./IconComponent";
import MenuMoreGantt from "./MenuMoreGantt";
import SearchComponent from "./SearchComponent";

const pathMonitorEye =
  "M3 4V16H21V4H3M3 2H21C22.1 2 23 2.89 23 4V16C23 16.53 22.79 17.04 22.41 17.41C22.04 17.79 21.53 18 21 18H14V20H16V22H8V20H10V18H3C2.47 18 1.96 17.79 1.59 17.41C1.21 17.04 1 16.53 1 16V4C1 2.89 1.89 2 3 2M10.84 8.93C11.15 8.63 11.57 8.45 12 8.45C12.43 8.46 12.85 8.63 13.16 8.94C13.46 9.24 13.64 9.66 13.64 10.09C13.64 10.53 13.46 10.94 13.16 11.25C12.85 11.56 12.43 11.73 12 11.73C11.57 11.73 11.15 11.55 10.84 11.25C10.54 10.94 10.36 10.53 10.36 10.09C10.36 9.66 10.54 9.24 10.84 8.93M10.07 12C10.58 12.53 11.28 12.82 12 12.82C12.72 12.82 13.42 12.53 13.93 12C14.44 11.5 14.73 10.81 14.73 10.09C14.73 9.37 14.44 8.67 13.93 8.16C13.42 7.65 12.72 7.36 12 7.36C11.28 7.36 10.58 7.65 10.07 8.16C9.56 8.67 9.27 9.37 9.27 10.09C9.27 10.81 9.56 11.5 10.07 12M6 10.09C6.94 7.7 9.27 6 12 6C14.73 6 17.06 7.7 18 10.09C17.06 12.5 14.73 14.18 12 14.18C9.27 14.18 6.94 12.5 6 10.09Z";

const RightHeader = ({
  changeShowFullChart,
  changeShowHeader,
  showFullChart,
  showHeader,
  changeVisibleConfigGantt,
  start, end,
  scrollGantt,
  changeVisibleExportPdfDrawer,
  visibleGantt,
  girdInstance,
  projectInfo
}) => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const renderSearchComponent = React.useMemo(() => <SearchComponent />, [])
  return (
    <div className="gantt--header-component_container">
      <Row justify="end">
        <div>
          {renderSearchComponent}
        </div>
        <IconComponent
          onClick={() => changeVisibleConfigGantt(true, "TIME")}
          title={(t('LABEL_GANTT_NAME_DURATION_MENU', { unit: t(`GANTT_${girdInstance.unitText.toUpperCase()}`) }).toLocaleUpperCase())}
          path={mdiCalendar}
        />
        <IconComponent
          onClick={() => changeShowFullChart(!showFullChart)}
          title={!showFullChart ? t('LABEL_GANTT_NAME_EXPAND_MENU') : t('LABEL_GANTT_NAME_COLLAPSE_MENU')}
          path={!showFullChart ? mdiFullscreen : mdiFullscreenExit}
        />
        <IconComponent
          onClick={() => changeVisibleConfigGantt(true, "COMMON")}
          title={t('LABEL_SEE')}
          path={pathMonitorEye}
        />
        <Col style={{width: 56}} className="gantt--right-header__more " span={2}>
          <Dropdown
            overlay={() => (
              <MenuMoreGantt
                changeVisibleExportPdfDrawer={changeVisibleExportPdfDrawer}
                changeVisibleMenu={setVisible}
                projectInfo={projectInfo}
              />
            )}
            onVisibleChange={(flag) => setVisible(flag)}
            visible={visible}
            placement="bottomRight"
            trigger={["click"]}
          >
            <div>
              <IconComponent
                onClick={(e) => null}
                title={t('LABEL_GANTT_NAME_MORE_MENU')}
                path={mdiDotsVertical}
              />
            </div>
          </Dropdown>
        </Col>
        {visibleGantt.fromNowLayer && (
          <Col span={2}>
            <div title={t('LABEL_GANTT_NAME_TODAY_MENU')} className="icon-fromNow-header">
              <IconComponent
                onClick={() => {
                  if (Date.now() - end.toDate().getTime() > 0 || Date.now() - start.toDate().getTime() < 0) {
                    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, t('GANTT_NOT_INCLUDE_PROJECT'));
                    return
                  }
                  scrollGantt(true)
                }}
                size={'1.5rem'}
                title={""}
                path={mdiFlagVariant}
              />
            </div>
          </Col>
        )}
        <Col span={2}>
          <div className="icon-invisible-header">
            <IconComponent
              onClick={() => changeShowHeader(!showHeader)}
              size={1.3}
              title={""}
              path={mdiChevronUp}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

const mapDispatchToProps = {
  changeVisibleConfigGantt,
  changeVisibleExportPdfDrawer,
  changeShowFullChart,
  changeShowHeader,
  scrollGantt,
};
const mapStateToProps = (state) => ({
  showFullChart: state.gantt.showFullChart,
  showHeader: state.gantt.showHeader,
  girdInstance: state.gantt.girdInstance,
  visibleGantt: state.gantt.visible.gantt,
});
export default connect(mapStateToProps, mapDispatchToProps)(RightHeader);
