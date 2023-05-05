import { flexCentered } from '../../styleUtils';

const lightModeVars = {
  '--color-background': '#F5F6FF',
  '--color-background-alt': '#FCFDFF',
  '--color-disabled': '#EBECF5',
  '--color-text': '#0A1E47',
  '--color-link': '#3764eb',
  '--color-border': '#0A1E47',
  '--color-box-shadow': 'rgba(0, 0, 0, 0.35)',
  '--color-input-background': '#FCFDFF',
  '--color-input-icon': '#0A1E47',
  '--color-highlight': '#ff1ff8',
  '--color-btn-primary': '#3773eb',
  '--color-btn-danger': '#d82f2c',
  '--dropdown-border-radius': '3px',
  '--shadow-filter-highlight': '0 0 7px var(--color-highlight)',
  '--shadow-basic': 'var(--color-box-shadow) 3px 6px 6px, var(--color-box-shadow) -3px 3px 5px',
};
const darkModeVars = {
  '--color-background': '#000a1f',
  '--color-background-alt': '#0A1429',
  '--color-box-shadow': 'rgba(255, 255, 255, 0.35)',
  '--color-disabled': '#8597A9',
  '--color-text': '#ecf0f1',
  '--color-link': '#5271D1',
  '--color-border': '#ecf0f1',
  '--color-input-background': '#ecf0f1',
  '--color-input-icon': '#0A1E47',
  '--shadow-filter-highlight':
    '0 0 7px var(--color-highlight), 0 1px 6px var(--color-highlight), 0 1px 6px var(--color-highlight)',
};

const colWidthsFixed = {
  '--width-jira': '100px',
  '--width-tasks': '100px',
  '--width-comments': '130px',
  '--width-build': '100px',
  '--width-reviewers': '180px',
  '--width-activity': '190px',
}
const colWidths = {
  '--width-name': `calc(100% - ${Object.keys(colWidthsFixed).map(key => `var(${key})`).join(' - ')})`,
  ...colWidthsFixed,
}

export const appStyle = {
  '.app__root': {
    ...lightModeVars,
    ...colWidths,
    'background-color': 'var(--color-background)',
    color: 'var(--color-text)',
    height: '100vh',
    width: '100vw',
  },
  '.app__root.app__root--dark': {
    ...darkModeVars,
  },
  '.app__content': {
    'background-color': 'var(--color-background)',
    display: 'flex',
    height: 'calc(100% - 34px)',
    width: '100%',
    '--header-height': '30px',
  },
  '.app__content-loading-container': {
    ...flexCentered,
    height: '100%',
    width: '100%',
  },
  '.app__content-header': {
    display: 'flex',
    height: 'var(--header-height)',
    'justify-content': 'space-around',
    'line-height': 'var(--header-height)',
    'min-width': '1260px',
    width: '100%',
  },
  '.app__content-header .icon': {
    opacity: 0.2,
  },
  '.app__content-header-col': {
    cursor: 'pointer',
    display: 'flex',
    'justify-content': 'space-between',
    'text-align': 'left',
  },
  '.app__content-header-label': {
    'padding-left': '8px',
  },
  '.app__content-header-col-actions': {
    display: 'flex',
    'padding-right': '8px',
  },
  '.app__content-body': {
    display: 'flex',
    'flex-direction': 'column',
    'flex-grow': 1,
    'flex-shrink': 1,
    height: 'calc(100% - 20px)',
    'min-width': 0,
    'overflow-x': 'auto',
    width: '100%',
  },
  '.app__content-rows': {
    height: 'calc(100% - var(--header-height))',
    'min-width': '1260px',
    'overflow-y': 'auto',
    width: '100%',
  },
  '.app__sort-arrows': {
    display: 'flex',
    'justify-content': 'flex-end',
  },
};
