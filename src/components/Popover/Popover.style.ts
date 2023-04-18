export const popoverStyle = {
  '.popover__root': {
    position: 'relative',
    'z-index': 2,
  },
  '.popover__trigger': {},
  '.popover__content': {
    border: '1px solid var(--color-border)',
    'background-color': 'var(--color-background-alt)',
    'border-radius': '5px',
    opacity: '0',
    padding: '8px',
    position: 'absolute',
    right: 0,
    top: '2em',
    transition: 'opacity 100ms ease-in',
  },
  '.popover__content--visible': {
    opacity: 1,
  },
};
