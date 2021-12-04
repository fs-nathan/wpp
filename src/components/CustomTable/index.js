import { Button } from "@material-ui/core";
import { get } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import LoadingOverlay from "../LoadingOverlay";
import NoData from "../NoData";
import HeaderButtonGroup from "./HeaderButtonGroup";
import { bgColorSelector } from "./selectors";
import "./style.scss";
import TableMain from "./TableMain";
import Icon from "@mdi/react";

export const CustomTableContext = React.createContext();
export const CustomTableProvider = CustomTableContext.Provider;
export const CustomTableConsumer = CustomTableContext.Consumer;

const Container = ({ className = "", ...rest }) => (
  <div className={`comp_CustomTable___container ${className}`} {...rest} />
);
export const Header = ({ className = "", ...rest }) => (
  <div className={`comp_CustomTable___header ${className}`} {...rest} />
);
export const LeftHeader = ({ className = "", ...rest }) => (
  <div className={`comp_CustomTable___left-header ${className}`} {...rest} />
);
export const RightHeader = ({ className = "", ...rest }) => (
  <div className={`comp_CustomTable___right-header ${className}`} {...rest} />
);
const StyledTableMain = ({ className = "", ...rest }) => (
  <TableMain
    className={`comp_CustomTable___table-main ${className}`}
    {...rest}
  />
);
const StyledButton = ({ className = "", ...rest }) => (
  <Button
    className={`comp_CustomTable___table-button ${className}`}
    {...rest}
  />
);

export const TableHeader = () => {
  const { options } = React.useContext(CustomTableContext);
  return (
    <Header>
      <LeftHeader>
        <div>
          <p>
            {typeof get(options, "title") === "function"
              ? options.title()
              : get(options, "title", "")}
          </p>
        </div>
        {get(options, "subTitle") ? (
          <span>
            {typeof get(options, "subTitle") === "function"
              ? options.subTitle()
              : get(options, "subTitle", "")}
          </span>
        ) : null}
      </LeftHeader>
      <RightHeader>
        <HeaderButtonGroup />
        {get(options, "mainAction") && (
          <StyledButton
            size="small"
            onClick={get(options, "mainAction.onClick", () => null)}
          >
            {get(options, "mainAction.label", "")}
          </StyledButton>
        )}
      </RightHeader>
    </Header>
  );
};
export function CustomTableLayout({ children, className }) {
  const { options } = React.useContext(CustomTableContext);
  return (
    <Container className={className}>
      <Header>
        <LeftHeader>
          <div>
            <p>
              {typeof get(options, "title") === "function"
                ? options.title()
                : get(options, "title", "")}
            </p>
          </div>
          {get(options, "subTitle") ? (
            <span>
              {typeof get(options, "subTitle") === "function"
                ? options.subTitle()
                : get(options, "subTitle", "")}
            </span>
          ) : null}
        </LeftHeader>
        <RightHeader>
          <HeaderButtonGroup />
          {get(options, "mainAction") && (
            <StyledButton
              size="small"
              onClick={get(options, "mainAction.onClick", () => null)}
            >
              {get(options, "mainAction.label", "")}
            </StyledButton>
          )}
        </RightHeader>
      </Header>
      {children}
    </Container>
  );
}
function CustomTable({
  customHeaderTable: CustomHeaderTable,
  isCustomHeader = false,
}) {
  const { options, data } = React.useContext(CustomTableContext);
  const styleOfTitleHead = {
    margin: 0,
    fontSize: "21px",
    lineHeight: "26px",
    fontWeight: 600,
    textTransform: "unset",
  };
  return (
    <LoadingOverlay
      active={get(options, "loading.bool", false)}
      spinner
      fadeSpeed={0}
      style={{
        height: "100%",
      }}
    >
      <Container>
        {isCustomHeader ? (
          <CustomHeaderTable />
        ) : (
          <Header>
            <LeftHeader>
              <div style={styleOfTitleHead}>
                {typeof get(options, "title") === "function"
                  ? options.title()
                  : get(options, "title", "")}
              </div>
              {get(options, "subTitle")
                ? typeof get(options, "subTitle") === "function"
                  ? options.subTitle()
                  : get(options, "subTitle", "")
                : null}
            </LeftHeader>
            <RightHeader>
              <HeaderButtonGroup />
              {get(options, "mainAction") && (
                <StyledButton
                  size="small"
                  onClick={get(options, "mainAction.onClick", () => null)}
                >
                  {get(options, "mainAction.icon", null) !== null && (
                    <Icon
                      path={get(options, "mainAction.icon")}
                      size={1}
                      style={{ marginRight: "5px", fill: "#fff" }}
                    />
                  )}
                  {get(options, "mainAction.label", "")}
                </StyledButton>
              )}
            </RightHeader>
          </Header>
        )}
        {get(options, "noData.bool", false) ? (
          <NoData
            title={get(options, "noData.title")}
            subtitle={get(options, "noData.subtitle")}
          />
        ) : (
          <StyledTableMain />
        )}
      </Container>
    </LoadingOverlay>
  );
}

export function CustomTableWrapper({
  options,
  columns,
  data,
  bgColor,
  isCustomHeader = false,
  customHeaderTable,
  children,
}) {
  const [searchPatern, setSearchPatern] = React.useState("");
  const [expand, setExpand] = React.useState(false);

  const defaultOptions = {
    search: {
      patern: searchPatern,
      onChange: (str) => setSearchPatern(str),
    },
    expand: {
      bool: expand,
      toggleExpand: () => setExpand((expand) => !expand),
    },
  };
  const context = {
    options: {
      ...defaultOptions,
      ...options,
    },
    columns: columns || [],
    data: data || [],
    bgColor,
  };

  return (
    <CustomTableProvider value={context}>
      {children || (
        <CustomTable
          isCustomHeader={isCustomHeader}
          customHeaderTable={customHeaderTable}
        />
      )}
    </CustomTableProvider>
  );
}

CustomTableWrapper.propTypes = {
  options: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    bgColor: bgColorSelector(state),
  };
};

export default connect(mapStateToProps, null)(CustomTableWrapper);
