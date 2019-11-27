import React from 'react';
import { Route } from 'react-router-dom';
import TabList from './LeftPart/TabList';
import TwoColumnsLayout from '../../components/TwoColumnsLayout';

export const Context = React.createContext();
const { Provider } = Context;

function JobPage() {

  return (
    <Provider value={{
    }}>
      <Route 
        path='/tasks'
        render={({ match: { url, } }) => (
          <>
            <Route 
              path={`${url}`}
              exact
              render={props => (
                <TwoColumnsLayout 
                  leftRenders={[
                    () => <TabList {...props} />,
                  ]}
                  rightRender={
                    () => null
                  }
                />
              )}
            />
          </>
        )}
      />
    </Provider>
  )
}

export default JobPage;
