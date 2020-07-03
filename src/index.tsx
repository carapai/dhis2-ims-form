import { Provider } from '@dhis2/app-runtime';
import { Config } from '@dhis2/app-service-config/build/types/types';
import { init } from 'd2';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { store } from './Store'
import { StoreContext } from "./Context";
import './index.css';
import * as serviceWorker from './serviceWorker';
import "mobx-react-lite/batchingForReactDom";
import Loading from './components/Loading';

const baseUrl = process.env.REACT_APP_DHIS2_BASE_URL || 'http://localhost:8080/';

const config = {
  baseUrl: baseUrl + 'api',
  headers: process.env.NODE_ENV === 'development' ? { Authorization: process.env.REACT_APP_DHIS2_AUTHORIZATION } : null
};

ReactDOM.render(<Loading />, document.getElementById('root'));

init(config).then((d2: any) => {
  const appConfig: Config = {
    baseUrl,
    apiVersion: 29,
  }
  ReactDOM.render(<Provider config={appConfig} >
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </Provider>, document.getElementById('root'));
}).catch((e: any) => ReactDOM.render(<div style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100vw',
  height: '100vh',
  fontSize: 28
}}>
  {JSON.stringify(e)}
</div>, document.getElementById('root'))
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
