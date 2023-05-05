export const popoverStyle = {
  '.popover__root': {
    position: 'relative',
  },
  '.popover__content': {
    border: '1px solid var(--color-border)',
    'background-color': 'var(--color-background-alt)',
    'border-radius': '5px',
    padding: '8px',
    position: 'absolute',
    right: 0,
    top: '2em',
    transition: 'opacity 100ms ease-in',
    'z-index': 2,
  },
};
