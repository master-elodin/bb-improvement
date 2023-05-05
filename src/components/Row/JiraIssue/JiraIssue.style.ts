export const jiraIssueStyle = {
  '.jira-issue': {
    'align-items': 'center',
    display: 'flex',
    height: '100%',
  },
  '.jira-issue--loading': {
    'padding-left': '30px',
  },
  '.jira-issue .spinner': {
    border: '2px solid var(--color-disabled)',
    height: '3em',
    width: '3em',
  },
  '.jira-issue__trigger': {
    cursor: 'pointer',
  },
  '.jira-issue__key': {
    'padding-right': '4px',
  },
  // popover
  '.jira-issue-popover': {
    'white-space': 'pre-wrap',
    width: '300px',
  },
  '.jira-issue-popover:not(:first-child)': {
    'border-top': '1px solid var(--color-border)',
    'margin-top': '12px',
    'padding-top': '12px',
  },
  '.jira-issue-popover p': {
    margin: '0 0 8px 0',
  },
  '.jira-issue-popover p img': {
    'vertical-align': 'bottom',
  },
  '.jira-issue-popover p a': {
    padding: '0 4px 0 8px',
  },
  '.jira-issue-popover__assignee': {
    display: 'flex',
    gap: '4px',
  },
  '.jira-issue-popover__assignee img': {
    'clip-path': 'circle()',
    height: '16px',
    width: '16px',
    border: '1px solid black',
    'border-radius': '12px',
  },
};
