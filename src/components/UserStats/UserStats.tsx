import * as React from 'react';
import { useEffect, useState } from 'react';
import { getPullRequests } from '../../api';
import { msToTime } from '../../utils';
import Spinner from '../Spinner/Spinner';

interface IProps {
  userUuid: string;
}

interface IStat {
  label: string;
  value: string | number;
}

const getStats = async (userUuid: string): Promise<IStat[]> => {
  const all = await getPullRequests(userUuid, false, 'MERGED');
  const stats: IStat[] = [{ label: 'Sample size', value: all.length }];
  let totalTimeToMerge = 0;
  let totalNumComments = 0;
  let totalNumTasks = 0;
  all.forEach((pr) => {
    const opened = new Date(pr.created_on).getTime();
    const closed = pr.closed_on ? new Date(pr.closed_on).getTime() : Date.now();
    totalTimeToMerge += closed - opened;

    totalNumComments += pr.comment_count;
    totalNumTasks += pr.task_count;
  });
  console.log('totalNumComments', totalNumComments, 'totalNumTasks', totalNumTasks);
  stats.push({ label: 'Avg time to close', value: msToTime(Math.floor(totalTimeToMerge / all.length)) });
  stats.push({ label: 'Avg comments', value: Math.ceil(totalNumComments / all.length) });
  stats.push({ label: 'Avg tasks', value: (totalNumTasks / all.length).toFixed(2) });

  return stats;
};

const UserStats = ({ userUuid }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [stats, setStats] = useState<IStat[]>([]);

  useEffect(() => {}, []);

  useEffect(() => {
    if (popoverVisible && !hasLoaded) {
      setIsLoading(true);
      getStats(userUuid).then((data) => {
        setStats(data);
        setHasLoaded(true);
        setIsLoading(false);
      });
    }
  }, [userUuid, popoverVisible, hasLoaded]);

  return (
    <div className={'user-stats'}>
      <div className={'user-stats__trigger'} onClick={() => setPopoverVisible(!popoverVisible)}>
        stats
      </div>
      {popoverVisible && (
        <div className={'user-stats__content'}>
          {!isLoading &&
            stats.map((stat) => (
              <div className={'user-stats__content-row'} key={stat.label}>
                <div className={'user-stats__content-row__label'}>{stat.label}</div>
                <div className={'user-stats__content-row__value'}>{stat.value}</div>
              </div>
            ))}
          {isLoading && <Spinner />}
        </div>
      )}
    </div>
  );
};

export default UserStats;
