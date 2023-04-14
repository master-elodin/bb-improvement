import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import { FILTER_KEY, setIsProd } from './api';
import { initStyles } from './styles';
import { IInPlaceFilters, IRefreshableFilters, IRowFilters } from './types';
import { sanitizeRegex } from './utils';

initStyles();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const isProd = process.env.NODE_ENV === 'production';
setIsProd(isProd);

const loggedInUserUuid = isProd
  ? // @ts-ignore: this will work in actual bitbucket but not locally
    JSON.parse(jQuery('#bb-bootstrap').attr('data-current-user')).uuid
  : '{2f8139ca-b887-4d13-a41f-ed7f0fe31022}';

const defaultRefreshableFilters: IRefreshableFilters = {
  role: 'reviewers',
  state: 'OPEN',
};

const defaultInPlaceFilters: IInPlaceFilters = {
  userUuid: loggedInUserUuid,
  regex: '',
  tasks: 'any',
  needsReview: 'any',
  repo: 'any',
  branch: 'any',
  build: 'any',
};

let savedFilters = JSON.parse(localStorage.getItem(FILTER_KEY) ?? '{}');
const initialFilters: IRowFilters = {
  ...defaultInPlaceFilters,
  ...defaultRefreshableFilters,
  ...savedFilters,
  pageNum: 1, // always use page 1 on page reload,
  compiledRegex: sanitizeRegex(savedFilters.regex ?? ''),
};

root.render(
  <React.StrictMode>
    <App
      isProd={isProd}
      loggedInUserUuid={loggedInUserUuid}
      defaultRefreshableFilters={defaultRefreshableFilters}
      defaultInPlaceFilters={defaultInPlaceFilters}
      savedFilters={initialFilters}
    />
  </React.StrictMode>,
);
