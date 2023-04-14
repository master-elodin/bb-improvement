export const appHeaderStyle = {
  '.app-header__root': {
    'align-items': 'end',
    'border-bottom': '1px solid var(--color-border)',
    display: 'flex',
    gap: '20px',
    height: '42px',
    'justify-content': 'flex-start',
    padding: '10px',
  },
  '.app-header__root .drawer-filters__filter': {
    'flex-basis': '180px',
  },
  '.app-header__refresh-btn.button': {
    height: '20px',
    'line-height': '20px',
    padding: '2px 8px',
  },
  '.app-header__page-selector': {
    'align-items': 'end',
    display: 'flex',
    'flex-grow': 1,
    gap: '14px',
    'justify-content': 'center',
    height: '100%',
    padding: '4px 0',
    'text-align': 'center',
  },
  '.app-header__page-selector__page': {
    'font-size': '1.2em',
  },
  '.app-header__page-selector__page--current': {
    color: 'var(--color-text)',
    'font-weight': 'bold',
  },
  '.app-header__page-selector__page--clickable': {
    color: 'var(--color-link)',
    cursor: 'pointer',
  },
  '.app-header__page-selector__page--disabled': {
    color: 'var(--color-text)',
    cursor: 'default',
  },
};
