import {
  Box,
  Checkbox,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import TitleSectionModal from "components/TitleSectionModal";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import JobDetailModalWrap from "views/JobDetailPage/JobDetailModalWrap";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TitleModalAdd from "./TitleModalAdd";

const SourceNumberSelect = ({
  defaultSelected = [],
  onSelectSource = () => {},
}) => {
  const { t } = useTranslation();
  const refModal = React.useRef(null);

  const _handleOpenModal = () => {
    refModal.current._handleOpen(true);
  };

  return (
    <>
      <Grid item xs={12} pt={0}>
        <TitleSectionModal
          label={t("Nguồn dữ liệu")}
          style={{ marginTop: 0 }}
          onClick={_handleOpenModal}
        />
        <WrapperSelectButton onClick={_handleOpenModal}>
          2 trường <StyledIcon />
        </WrapperSelectButton>
      </Grid>
      <ModalSelectSource
        ref={refModal}
        defaultSelected={defaultSelected}
        onConfirmSelect={onSelectSource}
      />
    </>
  );
};

const reducer = (state, action) => {
  return { ...state, ...action };
};

function createData({ id, name, data_type, format }) {
  return { id, name, data_type, format };
}

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const ModalSelectSource = React.forwardRef(
  ({ defaultSelected = [], onConfirmSelect = () => {} }, ref) => {
    const { t } = useTranslation();
    const options = useSelector(({ columns }) => columns?.listColumns?.data);
    const _getRows = () => {
      const result = [];

      options.forEach((item) => {
        if (item.data_type === 2 && !item.is_default)
          result.push(createData(item));
      });

      return result;
    };

    const [state, dispatchState] = React.useReducer(reducer, {
      selected: defaultSelected,
      rows: _getRows(),
    });

    React.useImperativeHandle(ref, () => ({ _handleOpen: handleOpen }));

    const handleOpen = (open) => {
      dispatchState({ open });
    };

    const _handleConfirm = () => {
      onConfirmSelect(state.selected);
      handleOpen(false);
    };

    const _handleCheck = (event, data) => {
      if (event.target.checked) {
        const selected = [...state.selected, data];
        dispatchState({ selected });
      } else {
        const selected = state.selected.filter((item) => item.id !== data.id);
        dispatchState({ selected });
      }
    };

    const renderTitle = () => {
      let temp = null;
      let isSetted = false;
      let isHasDifference = false;

      state.selected.forEach((item) => {
        if (!isSetted) {
          if (!temp) temp = item.format;
          if (temp && temp !== item.format) isHasDifference = true;
        }
      });

      return (
        <>
          <p style={{ color: "#6c6c6c" }}>
            Chọn các trường dữ liệu có cùng tính chất trong bảng việc để phần
            mềm tự tính toán
          </p>
          <div style={{ marginBottom: 10 }}>
            Đã chọn {state.selected.length} trường
            {isHasDifference && (
              <>
                :{" "}
                <span style={{ color: "red", fontWeight: "bold" }}>
                  Có sự khác biệt về nhãn!
                </span>
              </>
            )}
          </div>
        </>
      );
    };

    return (
      <JobDetailModalWrap
        titleComponent={
          <TitleModalAdd
            isHideTab
            titleText={t("ADD_FIELDS_DATA")}
            setOpen={handleOpen}
            customStyle={{
              borderBottom: "1px solid !important",
              paddingBottom: "10px !important",
            }}
          />
        }
        open={state.open}
        setOpen={handleOpen}
        confirmRender={() => t("Complete")}
        className="offerModal"
        height={"medium"}
        manualClose={true}
        canConfirm={state.selected.length}
        onCancle={() => handleOpen(false)}
        onConfirm={_handleConfirm}
      >
        <StyledTableContainer component={Box}>
          {renderTitle()}
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledCellHeader align="left" size="small" width="10%">
                  Chọn
                </StyledCellHeader>
                <StyledCellHeader align="left">Tên trường</StyledCellHeader>
                <StyledCellHeader align="right">Nhãn</StyledCellHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledCell
                    component="th"
                    scope="row"
                    size="small"
                    width="10%"
                  >
                    <Checkbox
                      {...label}
                      defaultChecked={state.selected.some(
                        (item) => item.id === row.id
                      )}
                      onChange={(e) => _handleCheck(e, row)}
                    />
                  </StyledCell>
                  <StyledCell align="left">{row.name}</StyledCell>
                  <StyledCell align="right">{row.format}</StyledCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </JobDetailModalWrap>
    );
  }
);

const StyledTableContainer = styled(TableContainer)``;

const StyledCell = styled(TableCell)`
  border-bottom: 0.75px dashed rgba(0, 0, 0, 0.1);
  font-weight: 400;
`;

const StyledCellHeader = styled(TableCell)`
  border-bottom: 1.5px solid black;
  width: 15px;
  max-width: 15px;
`;

const WrapperSelectButton = styled.div`
  padding-right: 32px;
  height: calc(52.5px - 27px);
  min-height: 1.4375em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 14px;
  display: flex;
  align-items: center;
  padding: 12.5px 14px;
  color: #666;
  user-select: none;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.23);
  position: relative;
  &:hover {
    box-shadow: 0px 0px 10px #d5d5d5;
    border-color: #0076f3 !important;
    border-width: 1px;
  }
`;

const StyledIcon = styled(ArrowDropDownIcon)`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 1em;
  height: 1em;
  display: inline-block;
  fill: currentColor;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  -webkit-transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-size: 1.5rem;
  position: absolute;
  right: 7px;
  top: calc(50% - 0.5em);
  pointer-events: none;
  color: rgba(0, 0, 0, 0.54);
`;

export default SourceNumberSelect;
