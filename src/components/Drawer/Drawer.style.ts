export const drawerStyle = {
  '.drawer__root': {
    'background-color': 'var(--color-background-alt)',
    cursor: 'pointer',
    display: 'flex',
    'flex-basis': '20px',
    'flex-direction': 'column',
    height: 'calc(100% - var(--header-height))',
    'margin-top': 'var(--header-height)',
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
    cursor: 'pointer',
    'flex-basis': 'var(--drawer-header-height)',
    position: 'relative',
  },
  '.drawer__toggle': {
    'font-size': '8px',
  },
  '.drawer__toggle-arrow': {
    'border-top': '1em solid transparent',
    'border-bottom': '1em solid transparent',
    'border-right': '1em solid black',
    height: 0,
    left: '10px',
    position: 'absolute',
    top: '10px',
    transition: 'transform 250ms',
    width: 0,
  },
  '.drawer__toggle-arrow--open': {
    transform: 'rotate(180deg)'
  },
  '.drawer__title': {
    left: '30px',
    margin: 0,
    position: 'absolute',
    top: '8px',
  },
  '.drawer__content': {
    display: 'flex',
    gap: '20px',
    'flex-basis': 'calc(100% - var(--drawer-header-height) - 35px)',
    'flex-direction': 'column',
    'overflow-y': 'auto',
    padding: '10px',
  },
};
