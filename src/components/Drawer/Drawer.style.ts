export const drawerStyle = {
  '.drawer__root': {
    'background-color': 'var(--color-background)',
    cursor: 'pointer',
    display: 'flex',
    'flex-basis': '20px',
    'flex-direction': 'column',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    transition: 'flex-basis 100ms ease-out',
    '--drawer-header-height': '30px',
  },
  '.drawer__root--open': {
    cursor: 'default',
    'flex-basis': '250px',
  },
  '.drawer__header': {
    'align-items': 'center',
    cursor: 'pointer',
    display: 'flex',
    'flex-basis': 'var(--drawer-header-height)',
    'justify-content': 'space-between',
    'padding': '0 20px 0 10px',
    position: 'relative',
    width: 'calc(100% - 30px)',
  },
  '.drawer__header-title-container': {
    display: 'flex',
    gap: '10px'
  },
  '.drawer__num-visible': {
    'font-size': '.8em',
  },
  '.drawer__toggle': {
    'align-items': 'center',
    'font-size': '8px',
    display: 'flex',
  },
  '.drawer__toggle-arrow': {
    'border-top': '1em solid transparent',
    'border-bottom': '1em solid transparent',
    'border-right': '1em solid var(--color-text)',
    'flex-basis': '30px',
    height: 0,
    transition: 'transform 250ms',
    width: 0,
  },
  '.drawer__toggle-arrow--open': {
    transform: 'rotate(180deg)'
  },
  '.drawer__title': {
    color: 'var(--color-text)',
    margin: 0,
  },
  '.drawer__content': {
    display: 'flex',
    gap: '15px',
    'flex-basis': 'calc(100% - var(--drawer-header-height) - 35px)',
    'flex-direction': 'column',
    'overflow-y': 'auto',
    padding: '10px',
  },
};
