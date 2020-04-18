import { Button } from '@material-ui/core';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import LoadingOverlay from '../LoadingOverlay';
import NoData from '../NoData';
import HeaderButtonGroup from './HeaderButtonGroup';
import { bgColorSelector } from './selectors';
import './style.scss';
import TableMain from './TableMain';

export const CustomTableContext = React.createContext();
export const CustomTableProvider = CustomTableContext.Provider;
export const CustomTableConsumer = CustomTableContext.Consumer;

const Container = ({ className = "", ...rest }) => (
  <div className={`comp_CustomTable___container ${className}`} {...rest} />
);
const Header = ({ className = "", ...rest }) => (
  <div className={`comp_CustomTable___header ${className}`} {...rest} />
);
const LeftHeader = ({ className = "", ...rest }) => (
  <div className={`comp_CustomTable___left-header ${className}`} {...rest} />
);
const RightHeader = ({ className = "", ...rest }) => (
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
export function CustomTableLayout({ children }) {
  const { options } = React.useContext(CustomTableContext);
  return (
    <Container>
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
function CustomTable() {
  const { options, data } = React.useContext(CustomTableContext);
  return (
    <LoadingOverlay
      active={get(options, 'loading.bool', false)}
      spinner
      fadeSpeed={100}
      style={{
        height: '100%',
      }}
    >
      <Container>
        <Header>
          <LeftHeader>
            <div>
              <p>
                {typeof get(options, 'title') === 'function'
                  ? options.title()
                  : get(options, 'title', '')}
              </p>
            </div>
            {get(options, 'subTitle') ? (
              <span>
                {typeof get(options, 'subTitle') === 'function'
                  ? options.subTitle()
                  : get(options, 'subTitle', '')}
              </span>
            ) : null}
          </LeftHeader>
          <RightHeader>
            <HeaderButtonGroup />
            {get(options, 'mainAction') && (
              <StyledButton
                size="small"
                onClick={get(options, "mainAction.onClick", () => null)}
              >
                {get(options, "mainAction.label", "")}
              </StyledButton>
            )}
          </RightHeader>
        </Header>
        {data.length === 0
          ? <NoData
            title={get(options, 'noData.title')}
            subtitle={get(options, 'noData.subtitle')}
          />
          : <StyledTableMain />}
      </Container>
    </LoadingOverlay>
  );
}

function CustomTableWrapper({ options, columns, data, bgColor }) {
  const [searchPatern, setSearchPatern] = React.useState('');
  const [expand, setExpand] = React.useState(false);

  const defaultOptions = {
    search: {
      patern: searchPatern,
      onChange: str => setSearchPatern(str)
    },
    expand: {
      bool: expand,
      toggleExpand: () => setExpand(expand => !expand)
    }
  };

  const context = {
    options: {
      ...defaultOptions,
      ...options
    },
    columns: columns || [],
    data: data || [],
    bgColor,
  };

  return (
    <CustomTableProvider value={context}>
      <CustomTable />
    </CustomTableProvider>
  );
}

CustomTableWrapper.propTypes = {
  options: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    bgColor: bgColorSelector(state),
  }
}

export default connect(
  mapStateToProps,
  null,
)(CustomTableWrapper);
