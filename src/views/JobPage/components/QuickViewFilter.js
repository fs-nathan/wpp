import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
import { mdiFilterOutline } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { JobPageContext } from "../JobPageContext";
import QuickView from "../Layout/QuickView";
import "./QuickViewFilter.css";

function QuickViewFilter() {
  const { t } = useTranslation();
  const { handleClose } = useContext(JobPageContext);
  return (
    <JobPageContext.Consumer>
      {({
        statusFilter,
        setstatusFilter,
        handleRemovestatusFilter,
        filterConfig,
      }) => (
        <QuickView
          onClose={handleClose}
          title={
            <Box className="comp_QuickViewFilter__headerWrapper">
              <Icon
                className="comp_QuickViewFilter__headerIcon"
                path={mdiFilterOutline}
              ></Icon>
              <Box className="comp_QuickViewFilter__headerTitle">
                {t("FILTER")}
              </Box>
            </Box>
          }
        >
          <Box className="comp_QuickViewFilter">
            {filterConfig.map(
              ({ title, subTitle, optionEntities, orders }, i) => {
                return (
                  <FormControl
                    className="comp_QuickViewFilter__formControl"
                    key={i}
                    style={{ marginTop: i > 0 && "2em" }}
                    component="fieldset"
                  >
                    <legend>
                      <Box className="comp_QuickViewFilter__title">{title}</Box>
                      <Box className="comp_QuickViewFilter__subTitle">
                        {subTitle}
                      </Box>
                    </legend>
                    <FormGroup className="comp_QuickViewFilter__FormGroup">
                      {orders.map((key) => (
                        <FormControlLabel
                          className="comp_QuickViewFilter__FormControlLabel"
                          key={key}
                          control={
                            <Checkbox
                              checked={statusFilter[key]}
                              color="primary"
                              onChange={() => setstatusFilter(key)}
                              name={optionEntities[key].value}
                            />
                          }
                          label={optionEntities[key].label}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                );
              }
            )}
          </Box>
        </QuickView>
      )}
    </JobPageContext.Consumer>
  );
}

export default QuickViewFilter;
