import { ButtonGroup, Collapse } from '@material-ui/core';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ColorButton from '../../../../../components/ColorButton';
import ColorTypo from '../../../../../components/ColorTypo';
import NoDataPlaceHolder from '../../NoDataPlaceHolder';
import ListDemand from './ListDemand';

const Body = styled(Scrollbars)`
  grid-area: body;
  height: 100%;
`;

const StyledButtonGroup = styled(ButtonGroup)`
  margin: 8px 0 20px 0;
`;

function TabBody(props) {
  const commandItems = useSelector(state => state.taskDetail.taskCommand.commandItems);
  const command = useSelector(state => state.taskDetail.taskCommand.command);
  const decisionItems = useSelector(state => state.taskDetail.taskCommand.decisionItems);
  const [value, setValue] = React.useState(0);

  return (
    <Body autoHide autoHideTimeout={500} autoHideDuration={200}>
      <div className="container-dmt-tabbody">
        <StyledButtonGroup fullWidth variant="text">
          <ColorButton onClick={() => setValue(0)}>
            {value === 0 ? (
              <ColorTypo bold>Tất cả ({command.length})</ColorTypo>
            ) : (
                <ColorTypo color="gray">
                  Tất cả ({command.length})
                </ColorTypo>
              )}
          </ColorButton>
          <ColorButton onClick={() => setValue(1)}>
            {value === 1 ? (
              <ColorTypo bold>Chỉ đạo ({commandItems.length})</ColorTypo>
            ) : (
                <ColorTypo color="gray">
                  Chỉ đạo ({commandItems.length})
                </ColorTypo>
              )}
          </ColorButton>
          <ColorButton onClick={() => setValue(2)}>
            {value === 2 ? (
              <ColorTypo bold>
                Quyết định ({decisionItems.length})
              </ColorTypo>
            ) : (
                <ColorTypo color="gray">
                  Quyết định ({decisionItems.length})
                </ColorTypo>
              )}
          </ColorButton>
        </StyledButtonGroup>
        {command.length ?
          <React.Fragment>
            <Collapse in={value === 0} mountOnEnter unmountOnExit timeout={0}>
              <ListDemand {...props} activeArr={command} />
            </Collapse>
            <Collapse in={value === 1} mountOnEnter unmountOnExit timeout={0}>
              <ListDemand {...props} activeArr={commandItems} />
            </Collapse>
            <Collapse in={value === 2} mountOnEnter unmountOnExit timeout={0}>
              <ListDemand {...props} activeArr={decisionItems} />
            </Collapse>
          </React.Fragment>
          :
          <NoDataPlaceHolder
            src="/images/no-command.png"
            title="Chưa có chỉ đạo / Quyết định nào được tạo! Click + để tạo mới."
          ></NoDataPlaceHolder>}
      </div>
    </Body>
  );
}

export default TabBody;
