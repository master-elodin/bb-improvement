import { IS_PROD, userUuid } from './constants';
import { rawData, statuses } from './data';
import { IRow, IStatusResponse } from './types';

const workspace = process.env.REACT_APP_BB_WORKSPACE ?? 'my-workspace';

const queryParams: Record<string, string> = {
  fields:
    '-values.closed_by,-values.description,+values.destination.branch.name,+values.destination.repository.*,' +
    '-values.reviewers,+values.source.branch.name,+values.source.repository.*,+values.source.commit.hash,' +
    '-values.summary',
  page: '1',
  pagelen: '50',
  q: `state="OPEN" AND reviewers.uuid="${userUuid}"`,
};

const url =
  `https://bitbucket.org/!api/internal/workspaces/${workspace}/pullrequests/?` +
  Object.keys(queryParams)
    .map((key: string) => `${key}=${encodeURIComponent(queryParams[key])}`)
    .join('&');

export const getData = async () => {
  if (!IS_PROD) {
    return rawData.values as IRow[];
  }
  const res = await fetch(url);
  const json = await res.json();
  return (json.values ?? []) as IRow[];
};

export const getStatuses = async (): Promise<IStatusResponse> => {
  if (!IS_PROD) {
    return statuses as IStatusResponse;
  }
  const res = await fetch(`https://bitbucket.org/!api/internal/workspaces/${workspace}/commits/statuses`);
  return (await res.json()) as IStatusResponse;
};
