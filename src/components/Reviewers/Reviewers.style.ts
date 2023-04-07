export const reviewersStyle = {
  '.reviewers__root': {
    height: '100%',
    position: 'relative',
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
    background: 'linear-gradient(to right, transparent 5%, var(--color-background)), ' +
      'linear-gradient(to right, transparent 5%, var(--color-background))',
    height: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
    width: '30px',
  }
}