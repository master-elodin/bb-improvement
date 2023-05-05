import * as React from 'react';
import { IJiraData } from '../../../types';
import { useMemo, useState } from 'react';
import { getJiraIssues } from '../../../api';
import Spinner from '../../Spinner/Spinner';
import { cx } from '../../../utils';
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

  // TODO: header doesn't line up

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
    <div className={cx('jira-issue', isLoading && 'jira-issue--loading')}>
      <Popover
        trigger={
          <>
            <span className={'jira-issue__key jira-issue__trigger'}>View info</span>
            <DownArrow />
          </>
        }
        onVisibleChange={onPopoverVisibleChanged}
        content={popoverContent}
      />
    </div>
  );
};

export default JiraIssue;
