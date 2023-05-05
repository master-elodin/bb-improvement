import { flexCentered } from '../../../styleUtils';

export const jiraIssueStyle = {
  '.jira-issue': {
    ...flexCentered,
    height: '100%',
    'justify-content': 'flex-start',
    'padding-left': '16px',
  },
  '.jira-issue .spinner': {
    border: '2px solid var(--color-disabled)',
    height: '3em',
    width: '3em',
  },
  '.jira-issue__trigger': {
    display: 'flex',
    cursor: 'pointer',
  },
  '.jira-issue__key': {
    'padding-right': '4px',
  },
  '.jira-issue__popover-content': {
    ...flexCentered,
    'flex-direction': 'column',
    'white-space': 'pre-wrap',
    width: '300px',
  },
  // popover
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
    padding: '0 8px',
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
