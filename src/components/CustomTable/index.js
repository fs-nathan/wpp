import React from 'react';
import HeaderButtonGroup from './HeaderButtonGroup';
import TableMain from './TableMain';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import './style.scss';

export const CustomTableContext = React.createContext();
export const CustomTableProvider = CustomTableContext.Provider;
export const CustomTableConsumer = CustomTableContext.Consumer;

const Container = ({ className = '', ...rest }) => <div className={`comp_CustomTable___container ${className}`} {...rest} />;
const Header = ({ className = '', ...rest }) => <div className={`comp_CustomTable___header ${className}`} {...rest} />;
const LeftHeader = ({ className = '', ...rest }) => <div className={`comp_CustomTable___left-header ${className}`} {...rest} />;
const RightHeader = ({ className = '', ...rest }) => <div className={`comp_CustomTable___right-header ${className}`} {...rest} />;
const StyledButton = ({ className = '', ...rest }) => <Button className={`comp_CustomTable___button ${className}`} {...rest} />;
const StyledTableMain = ({ className = '', ...rest }) => <TableMain className={`comp_CustomTable___table-main ${className}`} {...rest} />;

function CustomTable() {
  const { options } = React.useContext(CustomTableContext);

  return (
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
              onClick={get(options, 'mainAction.onClick', () => null)}
            >
              {get(options, 'mainAction.label', '')}
            </StyledButton>
          )}
        </RightHeader>
      </Header>
      <StyledTableMain />
    </Container>
  );
}

function CustomTableWrapper({ options, columns, data }) {
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
    data: data || []
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

export default CustomTableWrapper;
