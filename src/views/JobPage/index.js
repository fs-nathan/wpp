import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import TabList from './LeftPart/TabList';

export const Context = React.createContext();
const { Provider } = Context;

const Container = styled(({ expand, ...rest }) => <div {...rest} />)`
  height: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: ${props => props.expand ? 'auto' : 'minmax(300px, 1fr) minmax(800px, 3fr)'};
`;

const LeftDiv = styled(({ expand, ...rest }) => <div {...rest} />)`
  display: ${props => props.expand ? 'none' : 'inherit'};
`;

const RightDiv = styled.div`
  border-left: 1px solid rgba(0, 0, 0, .1);
`;

function JobPage() {

  const [expand, setExpand] = React.useState(false);
  
  function handleExpand(expand) {
    setExpand(expand);
  }

  return (
    <Provider value={{
    }}>
      <Container expand={expand}>
        <Route 
          path='/tasks'
          render={({ match: { url, } }) => (
            <LeftDiv expand={expand}>
              <Route path={`${url}/`} 
                render={props => 
                  <TabList {...props} />
                } 
                exact 
              />
            </LeftDiv>
          )}
        />
        <Route 
          path='/tasks'
          render={({ match: { url, } }) => (
            <RightDiv>
            </RightDiv>
          )}
        />
      </Container>
    </Provider>
  )
}

export default JobPage;
