import {
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { createColumns } from "actions/columns/createColumns";
import TitleSectionModal from "components/TitleSectionModal";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import JobDetailModalWrap from "views/JobDetailPage/JobDetailModalWrap";
import { CellLabel } from "views/ProjectGroupPage/RightPart/AllProjectTable/constants/Columns";
import SelectFieldTypeDropdown from "./Dropdown";
import TabContentColumn from "./TabContentColumn";
import TitleModalAdd from "./TitleModalAdd";
import ToggleInput from "./ToggleInput";

const reducer = (state, action) => {
  return { ...state, ...action };
};

const initialState = {
  name: "",
  type: "list",
  open: false,
  value: 0,
  defaultLabel: "",
  defaultPosition: "right",
  defaultFormat: "number",
  defaultNumFix: 0,
};

const AddColumnModal = React.forwardRef(({ onAddColumns = () => {} }, ref) => {
  const typingTimeoutRef = React.useRef();
  const [dataSearch, setDataSearch] = React.useState([]);
  const { t } = useTranslation();
  const { projectId } = useParams();
  const [state, dispatchState] = React.useReducer(reducer, initialState);
  const refContent = React.useRef(null);
  const dispatch = useDispatch();

  React.useImperativeHandle(ref, () => ({
    _open: (type, data) => handleClickOpen(type, data),
  }));

  const handleChangeTab = (event, value) => {
    dispatchState({ value });
  };

  const handleClickOpen = (type, data) => {
    console.log(type, data);

    dispatchState({ open: true, type, ...data });
  };

  const handleChangeType = (type) => {
    dispatchState({ type });
  };

  const handleOpen = (open) => {
    dispatchState({ open });
  };

  const _handleChange = (e) => {
    dispatchState({ name: e.target.value });
  };

  const _handleChangeSearch = (e) => {
    const { value } = e.target;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      console.log(value);
    }, 500);
    // dispatchState({ name: e.target.value });
  };

  const _handleConfirm = async () => {
    const data_type = _getDataType();
    const contentValue = refContent.current._getValue();
    const data = { project_id: projectId, name: state.name };
    const dataColumn = {
      id: new Date().getTime(),
      Header: state.name,
    };

    switch (data_type) {
      case 2:
        data["format"] = contentValue.format;
        data["decimal"] = contentValue.decimal;
        data["position_format"] = contentValue.position_format;
        data["data_type"] = data_type;
        break;
      case 3:
        data["options"] = contentValue;
        data["data_type"] = data_type;
        break;
      case 1:
        data["data_type"] = data_type;
        break;
      default:
        break;
    }

    if (state.type === "list") {
      dataColumn["Cell"] = (props) => (
        <CellLabel value={props.value} props={props} />
      );
    }

    dispatch(
      createColumns(data, () => {
        dispatchState(initialState);
        onAddColumns({ data, _id: new Date().getTime() });
      })
    );
  };

  const _getDataType = () => {
    switch (state.type) {
      case "list":
        return 3;
      case "number":
        return 2;
      default:
        return 1;
    }
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
      canConfirm={!!state.name}
      className="offerModal"
      height={"medium"}
      manualClose={true}
      onCancle={() => handleOpen(false)}
      onConfirm={_handleConfirm}
    >
      <Box sx={{ flexGrow: 1 }}>
        <TabPanel value={state.value} index={0}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TitleSectionModal label={t("LABEL_CREATE_FIELDS")} />
              <TextField
                onChange={_handleChange}
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
              <SelectFieldTypeDropdown
                defaultValue={state.type}
                onSelect={handleChangeType}
              />
            </Grid>

            <Grid item xs={12}>
              <ToggleInput />
            </Grid>

            <TabContentColumn
              ref={refContent}
              type={state.type}
              defaultLabel={state.defaultLabel}
              defaultPosition={state.defaultPosition}
              defaultFormat={state.defaultFormat}
              defaultNumFix={state.defaultNumFix}
            />

            <Grid item xs={12}>
              <WrapperCheckbox
                control={<Checkbox name="gilad" />}
                label={t("ADD_FILED_TO_LIBRARY")}
              />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={state.value} index={1}>
          <TextField
            onChange={_handleChangeSearch}
            className="offerModal--titleText"
            placeholder={t("FIND_FIELD_DATA")}
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: <SearchIcon style={{ marginRight: "10px" }} />,
              style: { color: "#666", marginTop: "15px" },
            }}
          />
          {/* show search */}
          {dataSearch.length > 0 && (
            <Box style={{ backgroundColor: "#f1f2f4" }}>
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Trash" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component="a" href="#simple-list">
                    <ListItemText primary="Spam" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          )}
          {/* show search */}
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
