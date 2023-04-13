// TODO:
// @media (prefers-color-scheme: dark) {
//   /* Dark theme styles go here */
// }
//
// @media (prefers-color-scheme: light) {
//   /* Light theme styles go here */
// }

const lightModeVars = {
  '--color-background': '#F5F6FF',
  '--color-background-alt': '#FCFDFF',
  '--color-disabled': '#EBECF5',
  '--color-text': '#0A1E47',
  '--color-link': '#3764eb',
  '--color-border': '#0A1E47',
  '--color-input-background': '#FCFDFF',
  '--color-input-icon': '#0A1E47',
  '--color-highlight': '#ff1ff8',
  '--shadow-filter-highlight': '0 0 7px var(--color-highlight)',
}
const darkModeVars = {
  '--color-background': '#000a1f',
  '--color-background-alt': '#0A1429',
  '--color-disabled': '#8597A9',
  '--color-text': '#ecf0f1',
  '--color-link': '#5271D1',
  '--color-border': '#ecf0f1',
  '--color-input-background': '#ecf0f1',
  '--color-input-icon': '#0A1E47',
  '--shadow-filter-highlight': '0 0 7px var(--color-highlight), 0 1px 6px var(--color-highlight), 0 1px 6px var(--color-highlight)',
}

export const appStyle = {
  '.app__root': {
    ...lightModeVars,
    'background-color': 'var(--color-background)',
    color: 'var(--color-text)',
    height: '100vh',
    overflow: 'hidden',
    width: '100vw',
  },
  '.app__root.app__root--dark': {
    ...darkModeVars,
  },
  '.app__header': {
    'border-bottom': '1px solid var(--color-border)',
    display: 'flex',
    height: '42px',
    'justify-content': 'space-between',
    padding: '10px',
  },
  '.app__user-section': {
    display: 'flex',
  },
  '.app__content': {
    'background-color': 'var(--color-background)',
    display: 'flex',
    height: 'calc(100% - 60px)',
    padding: '10px 10px 0 0',
    width: 'calc(100% - 10px)',
    '--header-height': '30px',
  },
  '.app__content-loading-container': {
    'align-items': 'center',
    display: 'flex',
    'justify-content': 'center',
    height: '100%',
    width: '100%',
  },
  '.app__content-header': {
    display: 'flex',
    height: 'var(--header-height)',
    'justify-content': 'space-around',
    'line-height': 'var(--header-height)',
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
  '.app__header-action-container': {
    display: 'flex',
    'align-items': 'center',
  },
  '.app__refresh-btn.button': {
    height: '20px',
    'line-height': '20px',
    padding: '2px 8px',
  },
  '.app__content-body': {
    display: 'flex',
    'flex-direction': 'column',
    'flex-grow': 1,
    'flex-shrink': 1,
    height: 'calc(100% - 20px)',
    'min-width': 0,
    width: '100%',
  },
  '.app__content-rows': {
    'overflow-x': 'hidden',
    'overflow-y': 'auto',
    width: '100%',
  },
  '.app__sort-arrows': {
    display: 'flex',
    'justify-content': 'flex-end',
  },
  '.app__page-selector': {
    'margin': '0 24px 0 8px',
  },
  '.app__page-selector__page': {
    padding: '0 2px',
  },
  '.app__page-selector__page:not(.app__page-selector__page--current)': {
    color: 'blue',
    cursor: 'pointer',
  },
  '.app__page-selector__page--current': {
    color: 'var(--color-text) !important',
    'font-weight': 'bold',
  },
};
