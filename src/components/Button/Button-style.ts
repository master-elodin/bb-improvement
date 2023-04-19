export const buttonStyle = {
  '.button': {
    '--button-border': '1px solid var(--color-border)',
    border: 'var(--button-border)',
    'border-radius': '3px',
    cursor: 'pointer',
    padding: '3px',
    'text-align': 'center',
  },
  '.button:hover': {
    'box-shadow': '0 0 2px var(--color-border)',
  },
  '.button--primary': {
    '--button-border': 'var(--color-btn-primary)',
    'background-color': 'var(--color-btn-primary)',
    border: 'none',
    color: 'white',
    'font-weight': 'bold',
    padding: '4px 8px',
  },
  '.button--primary:hover': {
    'background-color': '#417DF5',
  },
  '.button--danger': {
    '--button-border': 'var(--color-btn-danger)',
    'background-color': 'var(--color-btn-danger)',
    border: 'none',
    color: 'white',
    'font-weight': 'bold',
    padding: '4px 8px',
  },
  '.button--danger:hover': {
    'background-color': '#E23936',
  },
  '.button--disabled': {
    'background-color': 'var(--color-disabled)',
    'pointer-events': 'none',
  }
};
