import * as React from 'react';
import { IJiraData } from '../../../types';

interface IProps {
  issue: IJiraData;
}

const JiraIssuePopover = ({ issue }: IProps) => {
  return (
    <div className={'jira-issue-popover'}>
      <p>
        <img src={issue.issueType.iconUrl} alt={issue.issueType.name} />
        <a href={`${issue.site.cloudUrl}/browse/${issue.key}`} target={'_blank'} rel={'noreferrer'}>
          {issue.key}
        </a>
        <span>{issue.summary}</span>
      </p>
      <div className={'jira-issue-popover__row'}>
        <div className={'jira-issue-popover__assignee'}>
          <img src={issue.assignee.avatarUrls['128x128']} alt={'avatar'} />
          {issue.assignee.displayName}
        </div>
      </div>
    </div>
  );
};

export default JiraIssuePopover;
