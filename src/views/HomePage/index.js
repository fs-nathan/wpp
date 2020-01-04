import React from "react";
import { Route } from 'react-router-dom';
import './style.scss';

function HomePage() {
  return (
    <Route 
      path='/'
      render={({ match: { url, } }) => (
        <>
          <Route 
            path={`${url}`}
            exact
            render={props => (
              <div className='views_HomePage___container'>
                <div style={{ gridArea: 'left'}}>Left</div>
                <div style={{ gridArea: 'logo'}}>Logo</div>
                <div style={{ gridArea: 'middle'}}>Middle</div>
                <div style={{ gridArea: 'right'}}>Right</div>
              </div>
            )}  
          />
        </>
      )}
    />
  );
}

export default HomePage;
