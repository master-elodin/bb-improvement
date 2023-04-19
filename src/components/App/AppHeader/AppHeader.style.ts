export const appHeaderStyle = {
  '.app-header__root': {
    'align-items': 'center',
    'border-bottom': '1px solid var(--color-border)',
    display: 'flex',
    gap: '20px',
    height: '23px',
    'justify-content': 'flex-start',
    padding: '5px 10px',
  },
  '.app-header__title': {
    display: 'flex',
    'font-size': '1.6em',
  },
  '.app-header__title svg': {
    'padding-top': '2px',
  },
  '.app-header__title .app-header__title-text': {
    'padding-left': '.5em',
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
  '.app-header__config': {
    display: 'flex',
    gap: '15px',
  },
  '.app-header__user-button': {
    'border-radius': '.5em',
    color: 'var(--color-text)',
    cursor: 'pointer',
    display: 'flex',
    'font-size': '24px',
    height: '1em',
    width: '1em',
  },
  '.app-header__user-config-content': {
    'align-items': 'flex-end',
    display: 'flex',
    'flex-direction': 'column',
    gap: '15px',
  },
  '.app-header__request-container': {
    display: 'flex',
  },
  '.app-header__request-trigger': {
    'align-items': 'center',
    'background-color': 'var(--color-btn-primary)',
    'border-left': '1px solid white',
    'border-radius': '0 3px 3px 0',
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    height: '25px',
    'justify-content': 'center',
    'margin-left': '-2px',
    width: '27px',
  },
  '.app-header__request-content': {
    display: 'flex',
    'flex-direction': 'column',
    gap: '15px',
    width: '200px',
  },
  '.app-header__request-trigger .icon': {
    transition: 'transform 200ms',
  },
  '.app-header__request-trigger--open .icon': {
    transform: 'rotate(180deg)',
  },
};
