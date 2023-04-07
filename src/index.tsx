import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import { setIsProd } from './api';
import { initStyles } from './styles';

initStyles();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const isProd = process.env.NODE_ENV === 'production';
setIsProd(isProd);

const loggedInUserUuid = isProd
  ? // @ts-ignore: this will work in actual bitbucket but not locally
    JSON.parse(jQuery('#bb-bootstrap').attr('data-current-user')).uuid
  : '{2f8139ca-b887-4d13-a41f-ed7f0fe31022}';

root.render(
  <React.StrictMode>
    <App isProd={isProd} loggedInUserUuid={loggedInUserUuid} />
  </React.StrictMode>,
);
