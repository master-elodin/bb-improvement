export const darkModeToggleStyle = {
  '.dark-mode-toggle': {
    'align-items': 'center',
    'background-color': 'var(--color-text)',
    'border-radius': '10px',
    cursor: 'pointer',
    height: '20px',
    margin: '22px 0 0 30px',
    position: 'relative',
    width: '40px',
  },
  '.dark-mode-toggle--on': {
    'background-color': '#FCFDFF',
  },
  '.dark-mode-toggle--on .dark-mode-toggle__slider': {
    transform: 'translateX(100%)'
  },
  '.dark-mode-toggle__slider': {
    'background-color': 'var(--color-background-alt)',
    'border-radius': '9px',
    height: '18px',
    width: '18px',
    left: '1px',
    position: 'absolute',
    top: '1px',
    transition: 'transform 200ms',
  },
  '.dark-mode-toggle__icon': {
    'font-size': '12px',
    position: 'absolute',
    top: '3px',
  },
  '.dark-mode-toggle__sun': {
    color: '#0A1E47',
    left: '4px',
  },
  '.dark-mode-toggle__moon': {
    color: '#FCFDFF',
    right: '4px',
  }
}