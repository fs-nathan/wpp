import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup
} from "@material-ui/core";
import { mdiFilterOutline } from "@mdi/js";
import Icon from "@mdi/react";
import colors from "helpers/colorPalette";
import React from "react";
import { JobPageContext } from "../JobPageContext";
import QuickView from "../Layout/QuickView";

function QuickViewFilter() {
  return (
    <JobPageContext.Consumer>
      {({
        statusFilter,
        setstatusFilter,
        handleRemovestatusFilter,
        filterConfig
      }) => (
        <QuickView
          title={
            <Box flex={1} display="flex" alignItems="center">
              <Icon
                style={{
                  marginRight: "15px",
                  width: "1.5em",
                  height: "1.5em",
                  fill: "#666"
                }}
                path={mdiFilterOutline}
              ></Icon>
              <Box fontSize="15px">FILTER</Box>
            </Box>
          }
        >
          <Box display="flex" flexDirection="column">
            {filterConfig.map(
              ({ title, subTitle, optionEntities, orders }, i) => {
                return (
                  <FormControl
                    key={i}
                    style={{ marginTop: i > 0 && "2em" }}
                    component="fieldset"
                  >
                    <legend>
                      <Box fontSize="14px" fontWeight="bold">
                        {title}
                      </Box>
                      <Box marginTop="0.5em" color={colors.gray[0]}>
                        {subTitle}
                      </Box>
                    </legend>
                    <FormGroup
                      style={{
                        marginTop: "1em",
                        paddingLeft: "9px"
                      }}
                    >
                      {orders.map(key => (
                        <FormControlLabel
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
