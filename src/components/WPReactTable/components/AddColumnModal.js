import {
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TitleSectionModal from "components/TitleSectionModal";
import * as React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import JobDetailModalWrap from "views/JobDetailPage/JobDetailModalWrap";
import SelectFieldTypeDropdown from "./Dropdown";
import TitleModalAdd from "./TitleModalAdd";
import ToggleInput from "./ToggleInput";
import TabContentColumn from "./TabContentColumn";

const reducer = (state, action) => {
  return { ...state, ...action };
};

const initialState = {
  type: "list",
  open: false,
  value: 0,
};

const AddColumnModal = React.forwardRef((props, ref) => {
  const { t } = useTranslation();
  const [state, dispatchState] = React.useReducer(reducer, initialState);

  React.useImperativeHandle(ref, () => ({ _open: () => handleClickOpen() }));

  const handleChangeTab = (event, value) => {
    dispatchState({ value });
  };

  const handleClickOpen = () => {
    dispatchState({ open: true });
  };

  const handleChangeType = (type) => {
    dispatchState({ type });
  };

  const handleOpen = (open) => {
    dispatchState({ open });
  };

  return (
    <JobDetailModalWrap
      title={t("ADD_FIELDS_DATA")}
      open={state.open}
      setOpen={handleOpen}
      confirmRender={() => t("CREATE_FIELDS")}
      titleComponent={
        <TitleModalAdd
          value={state.value}
          handleChangeTab={handleChangeTab}
          setOpen={handleOpen}
        />
      }
      canConfirm
      className="offerModal"
      height={"medium"}
      manualClose={true}
      onCancle={() => handleOpen(false)}
    >
      <Box sx={{ flexGrow: 1 }}>
        <TabPanel value={state.value} index={0}>
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
              <SelectFieldTypeDropdown onSelect={handleChangeType} />
            </Grid>

            <Grid item xs={12}>
              <ToggleInput />
            </Grid>
            <TabContentColumn type={state.type} />
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
        <TabPanel value={state.value} index={1}>
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

const WrapperCheckbox = styled(FormControlLabel)`
  span.Mui-checked {
    color: #4caf50 !important;
  }
`;

export default AddColumnModal;
