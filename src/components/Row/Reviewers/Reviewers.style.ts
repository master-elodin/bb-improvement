export const reviewersStyle = {
  '.reviewers__root': {
    'background-color': '',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
  },
  '.reviewers__avatar': {
    position: 'absolute',
    display: 'inline-block',
    top: '7px',
  },
  '.reviewers__avatar img': {
    'clip-path': 'circle()',
    height: '24px',
    width: '24px',
    border: '1px solid black',
    'border-radius': '12px',
  },
  '.reviewers__fade': {
    background: 'linear-gradient(to right, transparent 5%, var(--color-row-background)), ' +
      'linear-gradient(to right, transparent 5%, var(--color-row-background))',
    height: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
    width: '30px',
  }
}