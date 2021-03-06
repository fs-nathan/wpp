import {
  ButtonBase,
  Checkbox,
  FormControlLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { updateColumns } from "actions/columns/updateColumns";
import AlertModal from "components/AlertModal";
import TitleSectionModal from "components/TitleSectionModal";
import { apiService } from "constants/axiosInstance";
import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "constants/snackbarController";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useLocation } from "react-use";
import styled from "styled-components";
import JobDetailModalWrap from "views/JobDetailPage/JobDetailModalWrap";
import { OPTIONS_FIELDS_TYPE } from "./Dropdown";
import TabContentColumn from "./TabContentColumn";
import ToggleInput from "./ToggleInput";

const reducer = (state, action) => {
  return { ...state, ...action };
};

const initialState = {
  name: "",
  type: "list",
  selectedType: { text: "", icon: () => <ArrowCircleDownIcon /> },
  open: false,
  openConfirm: false,
  value: 0,
  defaultLabel: "",
  defaultPosition: "right",
  defaultFormat: "number",
  defaultNumFix: 0,
};

const EditColumnModal = React.forwardRef(
  ({ onUpdateSuccess = () => {}, onDeleteSuccess = () => {} }, ref) => {
    const { t } = useTranslation();
    const { projectId } = useParams();
    const [state, dispatchState] = React.useReducer(reducer, initialState);
    const refContent = React.useRef(null);
    const { pathname } = useLocation();
    const [, , , id] = pathname.split("/");
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

    const _handleConfirm = () => {
      const data_type = _getDataType();
      const contentValue = refContent.current._getValue();

      /* The dataUpdate object is a JavaScript object that contains the following properties:
      /* task_id: The task ID of the task that is currently being edited.
      /* project_field_id: The ID of the project field that is currently being edited.
      /* project_id: The ID of the project that is currently being edited.
      /* data_type: The data type of the project field that is currently being edited.
      /* name: The name of the project field that is currently being edited. */
      const dataUpdate = {
        project_id: projectId || id,
        name: state.name,

        task_id: state.taskId,
        project_field_id: state.idType,
        data_type: state.dataType,
      };

      switch (data_type) {
        case 2:
          dataUpdate["format"] = contentValue.format;
          dataUpdate["decimal"] = contentValue.decimal;
          dataUpdate["position_format"] = contentValue.position_format;
          dataUpdate["data_type"] = data_type;
          break;
        case 3:
          dataUpdate["options"] = contentValue;
          dataUpdate["data_type"] = data_type;
          break;
        case 1:
          dataUpdate["data_type"] = data_type;
          break;
        default:
          break;
      }
      if (data_type === 3) dataUpdate["options"] = contentValue;
      dispatch(
        updateColumns(dataUpdate, () => {
          dispatchState(initialState);
          onUpdateSuccess(dataUpdate);
        })
      );
    };

    const _handleDelete = (data = true) => dispatchState({ openConfirm: data });

    const _handleConfirmDelete = async () => {
      const dataDelete = {
        project_field_id: state.idType,
        project_id: projectId,
      };
      const { status } = await apiService({
        data: dataDelete,
        url: "/project-field/delete",
        method: "POST",
      });

      if (status === 200) {
        dispatchState(initialState);
        onDeleteSuccess(dataDelete);
        SnackbarEmitter(
          SNACKBAR_VARIANT.SUCCESS,
          DEFAULT_MESSAGE.MUTATE.SUCCESS
        );
      }
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
        cancleRender={() => t("DELETE_FIELDS")}
        // titleComponent={
        //   <TitleModalAdd
        //     isEditForm
        //     value={state.value}
        //     handleChangeTab={handleChangeTab}
        //     setOpen={handleOpen}
        //   />
        // }
        canConfirm={!!state.name}
        className="offerModal"
        height={"medium"}
        manualClose={true}
        onCancle={() => handleOpen(false)}
        onConfirm={_handleConfirm}
      >
        <AlertModal
          setOpen={_handleDelete}
          onConfirm={_handleConfirmDelete}
          open={state.openConfirm}
          customFooter={({ bg }) => (
            <ButtonBase
              style={{ color: bg }}
              className="comp_AlertModal___accept-button"
              onClick={() => dispatchState({ openConfirm: null })}
            >
              {t("IDS_WP_BUTTON_CLOSE")}
            </ButtonBase>
          )}
          content={t("alert_delete_fields")}
        />
        <Box sx={{ flexGrow: 1 }}>
          {/* Tabs panel */}
          <TabPanel value={state.value} index={0}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TitleSectionModal label={"Ch???nh s???a tr?????ng"} />
                <TextField
                  onChange={_handleChange}
                  className="offerModal--titleText"
                  placeholder={"Ch???nh s???a tr?????ng"}
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

              <Grid item xs={12}>
                <WrapperCheckbox
                  control={<Checkbox name="gilad" />}
                  label={t("ADD_FILED_TO_LIBRARY")}
                />
              </Grid>
            </Grid>
          </TabPanel>
          {/* End Tabs panel */}
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
