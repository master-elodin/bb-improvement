import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { IN_PLACE_FILTER_KEY, setIsProd } from './api';
import { initStyles } from './styles';
import { IInPlaceFilters } from './types';
import { sanitizeRegex } from './utils';

initStyles();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const isProd = process.env.NODE_ENV === 'production';
setIsProd(isProd);

const loggedInUserUuid = isProd
  ? // @ts-ignore: this will work in actual bitbucket but not locally
    JSON.parse(jQuery('#bb-bootstrap').attr('data-current-user')).uuid
  : '{d1b86571-abc6-4eae-a638-6b0826c01498}';

const savedInPlaceFilters = JSON.parse(localStorage.getItem(IN_PLACE_FILTER_KEY) ?? '{}');
const defaultInPlaceFilters: IInPlaceFilters = {
  regex: '',
  tasks: 'any',
  needsReview: 'any',
  repo: 'any',
  branch: 'any',
  build: 'any',
  ...savedInPlaceFilters,
  userUuid: loggedInUserUuid,
  compiledRegex: sanitizeRegex(savedInPlaceFilters.regex ?? ''),
};

root.render(
  <React.StrictMode>
    <App loggedInUserUuid={loggedInUserUuid} savedInPlaceFilters={defaultInPlaceFilters} />
  </React.StrictMode>,
);
