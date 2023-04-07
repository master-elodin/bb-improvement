export const drawerStyle = {
  '.drawer__root': {
    'background-color': 'var(--color-background-alt)',
    'flex-basis': '20px',
    height: 'calc(100% - var(--header-height))',
    'margin-top': 'var(--header-height)',
    overflow: 'hidden',
    position: 'relative',
    transition: 'flex-basis 100ms ease-out',
  },
  '.drawer__root--open': {
    'flex-basis': '200px',
  },
  '.drawer__toggle': {
    'font-size': '8px',
    cursor: 'pointer',
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
};
