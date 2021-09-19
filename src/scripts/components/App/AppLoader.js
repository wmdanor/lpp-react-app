import * as React from 'react';
import './AppLoader.scss';

function AppLoader() {
  return (
    <div id="app-loader">
      <div className="lds-facebook">
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

export default AppLoader;
