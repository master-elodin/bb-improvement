import * as React from 'react';
import { IJiraData } from '../../../types';
import { useMemo, useState } from 'react';
import { getJiraIssues } from '../../../api';
import Spinner from '../../Spinner/Spinner';
import Popover from '../../Popover/Popover';
import { DownArrow } from '../../Icons/Icons';
import JiraIssuePopover from './JiraIssuePopover';

interface IProps {
  prId: number;
}

const JiraIssue = ({ prId }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [issues, setIssues] = useState<IJiraData[]>([]);

  const onPopoverVisibleChanged = async (newVal: boolean) => {
    if (newVal && !hasLoaded) {
      setIsLoading(true);
      try {
        setIssues(await getJiraIssues(prId));
      } finally {
        setIsLoading(false);
        setHasLoaded(true);
      }
    }
  };

  const popoverContent = useMemo(() => {
    if (!hasLoaded || isLoading) {
      return <Spinner size={'5px'} />;
    }
    if (issues.length === 0) {
      return <span>No JIRA data found</span>;
    }
    return issues.map((issue, i) => <JiraIssuePopover key={i} issue={issue} />);
  }, [issues, isLoading, hasLoaded]);

  return (
    <div className={'jira-issue'}>
      <Popover
        trigger={
          <div className={'jira-issue__trigger'}>
            <div className={'jira-issue__key'}>View info</div>
            <DownArrow />
          </div>
        }
        onVisibleChange={onPopoverVisibleChanged}
        content={<div className={'jira-issue__popover-content'}>{popoverContent}</div>}
      />
    </div>
  );
};

export default JiraIssue;
