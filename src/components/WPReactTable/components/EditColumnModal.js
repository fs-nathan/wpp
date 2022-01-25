import {
  Checkbox,
  FormControlLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { updateColumns } from "actions/columns/updateColumns";
import TitleSectionModal from "components/TitleSectionModal";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import JobDetailModalWrap from "views/JobDetailPage/JobDetailModalWrap";
import { OPTIONS_FIELDS_TYPE } from "./Dropdown";
import TabContentColumn from "./TabContentColumn";
import TitleModalAdd from "./TitleModalAdd";
import ToggleInput from "./ToggleInput";

const reducer = (state, action) => {
  return { ...state, ...action };
};

const initialState = {
  name: "",
  type: "list",
  selectedType: { text: "", icon: () => <ArrowCircleDownIcon /> },
  open: false,
  value: 0,
  defaultLabel: "",
  defaultPosition: "right",
  defaultFormat: "number",
  defaultNumFix: 0,
};

const EditColumnModal = React.forwardRef(
  ({ onUpdateSuccess = () => {} }, ref) => {
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
      dispatchState({
        open: true,
        type,
        ...data,
        selectedType: OPTIONS_FIELDS_TYPE.find((item) => item.type === type),
      });
    };

    const handleOpen = (open) => {
      dispatchState({ open });
    };

    const _handleChange = (e) => {
      dispatchState({ name: e.target.value });
    };

    const _handleConfirm = async () => {
      const data_type = _getDataType();
      const contentValue = refContent.current._getValue();

      /* The dataUpdate object is a JavaScript object that contains the following properties:
      /* task_id: The task ID of the task that is currently being edited.
      /* project_field_id: The ID of the project field that is currently being edited.
      /* project_id: The ID of the project that is currently being edited.
      /* data_type: The data type of the project field that is currently being edited.
      /* name: The name of the project field that is currently being edited. */
      const dataUpdate = {
        task_id: state.taskId,
        project_field_id: state.idType,
        project_id: projectId,
        data_type: state.dataType,
        name: state.name,
      };

      if (data_type === 3) dataUpdate["options"] = contentValue;
      dispatch(
        updateColumns(dataUpdate, () => {
          dispatchState(initialState);
          onUpdateSuccess(dataUpdate);
        })
      );
    };

    /* The `_getDataType` function returns the data type of the state. */
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
        title={t("EDIT_FIELDS_DATA")}
        open={state.open}
        setOpen={handleOpen}
        confirmRender={() => t("EDIT")}
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
          {/* Tabs panel */}
          <TabPanel value={state.value} index={0}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TitleSectionModal label={t("LABEL_CREATE_FIELDS")} />
                <TextField
                  onChange={_handleChange}
                  className="offerModal--titleText"
                  placeholder={t("LABEL_CREATE_FIELDS")}
                  variant="outlined"
                  InputProps={{ style: { color: "#666" } }}
                  defaultValue={state.name}
                  fullWidth
                />
              </Grid>

              <Grid item xs={6}>
                <TitleSectionModal label={t("DATA_TYPES")} />
                <WrapperMenu>
                  <ListItemIcon style={{ minWidth: 25 }}>
                    <state.selectedType.icon />
                  </ListItemIcon>
                  <ListItemText>{state?.selectedType?.text}</ListItemText>
                </WrapperMenu>
              </Grid>

              <Grid item xs={12}>
                <ToggleInput />
              </Grid>

              <TabContentColumn
                isEditForm
                ref={refContent}
                type={state.type}
                defaultSelect={state.optionsType}
                defaultLabel={state.defaultLabel}
                defaultPosition={state.defaultPosition}
                defaultFormat={state.defaultFormat}
                defaultNumFix={state.defaultNumFix}
              />

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
          {/* End Tabs panel */}

          <TabPanel value={state.value} index={1}>
            <TextField
              className="offerModal--titleText"
              placeholder={t("FIND_FIELD_DATA")}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: <SearchIcon style={{ marginRight: "10px" }} />,
                style: { marginTop: "15px" },
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
  }
);

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
const WrapperMenu = styled(MenuItem)`
  padding: 12.5px 14px !important;
`;

export default EditColumnModal;
