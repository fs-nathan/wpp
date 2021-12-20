import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ColorTypo from "components/ColorTypo";
import { StyledDialogTitle } from "components/CustomModal";
import TitleSectionModal from "components/TitleSectionModal";
import * as React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import JobDetailModalWrap from "views/JobDetailPage/JobDetailModalWrap";
import SelectFieldTypeDropdown from "./Dropdown";
import TabNumber from "./TabNumber";

const AddColumnModal = React.forwardRef((props, ref) => {
  const { t } = useTranslation();
  const [type, setType] = React.useState("list");
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [isShowDescription, setIsShowDescription] = React.useState(false);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  React.useImperativeHandle(ref, () => ({ _open: () => handleClickOpen() }));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const _renderTabContent = () => {
    switch (type) {
      case "number":
        return <TabNumber />;
      default:
        break;
    }
  };

  return (
    <JobDetailModalWrap
      title={t("ADD_FIELDS_DATA")}
      open={open}
      setOpen={setOpen}
      confirmRender={() => t("CREATE_FIELDS")}
      titleComponent={
        <>
          <WrapperTitle
            className="comp_CustomModal__renderTitle"
            id="alert-dialog-slide-title"
          >
            <ColorTypo
              uppercase
              style={{
                overflow: "hidden",
                position: "relative",
                fontSize: "1.1rem",
                boxSizing: "border-box",
                fontWeight: "500",
              }}
            >
              {t("ADD_FIELDS_DATA")}
            </ColorTypo>
            <IconButton
              className="comp_CustomModal___iconButton"
              onClick={() => setOpen(false)}
            >
              <Icon path={mdiClose} size={1} color={"rgba(0, 0, 0, 0.54)"} />
            </IconButton>
          </WrapperTitle>
          <WrapperTabs
            value={value}
            onChange={handleChangeTab}
            TabIndicatorProps={{
              style: {
                backgroundColor: "#4caf50",
              },
            }}
          >
            <Tab label={t("IDS_WP_CREATE_NEW")} {...a11yProps(0)} />
            <Tab label={t("SELECT_FROM_LIBRARY")} {...a11yProps(1)} />
          </WrapperTabs>
        </>
      }
      canConfirm
      className="offerModal"
      height={"medium"}
      manualClose={true}
      onCancle={() => setOpen(false)}
    >
      <Box sx={{ flexGrow: 1 }}>
        <TabPanel value={value} index={0}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TitleSectionModal label={t("LABEL_CREATE_FIELDS")} />
              <TextField
                className="offerModal--titleText"
                placeholder={t("LABEL_CREATE_FIELDS")}
                variant="outlined"
                InputProps={{
                  style: { color: "#666" },
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TitleSectionModal label={t("DATA_TYPES")} />
              <SelectFieldTypeDropdown onSelect={(type) => setType(type)} />
            </Grid>

            <Grid item xs={12}>
              {isShowDescription ? (
                <>
                  <TitleSectionModal
                    label={t("ADD_DESCRIPTION")}
                    style={{ margin: 0 }}
                  />
                  <TextField
                    className="offerModal--titleText"
                    placeholder={t("ADD_DESCRIPTION")}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      style: { color: "#666", marginTop: "15px" },
                    }}
                  />
                </>
              ) : (
                <Typography
                  style={{
                    color: "#666",
                    lineHeight: "15px",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsShowDescription(true)}
                >
                  + {t("ADD_DESCRIPTION")}
                </Typography>
              )}
            </Grid>

            {_renderTabContent()}
            <Grid item>
              <WrapperCheckbox
                control={<Checkbox name="gilad" />}
                label={t("ADD_FILED_TO_LIBRARY")}
              />
              <WrapperCheckbox
                control={<Checkbox name="gilad" />}
                label={t("NOTIFY_MEMBER_CHANGE_FIELD")}
              />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TextField
            className="offerModal--titleText"
            placeholder={t("FIND_FIELD_DATA")}
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: <SearchIcon style={{ marginRight: "10px" }} />,
              style: { color: "#666", marginTop: "15px" },
            }}
          />
          <TitleSectionModal label={t("DATA_FIELD_EXITS")} />
          <Grid container>
            <Grid item xs={12}>
              <WrapperCheckbox
                control={<Checkbox name="gilad" />}
                label="Lưu ý về dự án"
              />
            </Grid>
            <Grid item xs={12}>
              <WrapperCheckbox
                control={<Checkbox disabled name="gilad" />}
                label="Rủi ro dự án"
              />
            </Grid>
          </Grid>
        </TabPanel>
      </Box>
    </JobDetailModalWrap>
  );
});

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const WrapperTitle = styled(StyledDialogTitle)`
  background: #fff !important;
  border: 0 !important;
  padding-bottom: 0 !important;
`;

const WrapperTabs = styled(Tabs)`
  border-bottom: 1px solid #0000001a;
  .Mui-selected span {
    color: #4caf50;
  }
`;
const WrapperCheckbox = styled(FormControlLabel)`
  span.Mui-checked {
    color: #4caf50 !important;
  }
`;

export default AddColumnModal;
