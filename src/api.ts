import { IS_PROD, loggedInUserUuid } from './constants';
import { allUsers as mockUsers, rawData, statuses } from './data';
import { IRow, IStatusResponse, IUser, PRState } from './types';

export const FILTER_KEY = 'bb-script-filters';
const workspace = process.env.REACT_APP_BB_WORKSPACE ?? 'my-workspace';

const reviewingPRs: Record<string, string> = {
  fields:
    '-values.closed_by,-values.description,+values.destination.branch.name,+values.destination.repository.*,' +
    '-values.reviewers,+values.source.branch.name,+values.source.repository.*,+values.source.commit.hash,' +
    '-values.summary',
  page: '1',
  pagelen: '50',
  q: `state="OPEN" AND reviewers.uuid="${loggedInUserUuid}"`,
};

const getUrl = (currentUserUuid: string, isReviewing: boolean, prState: PRState) => {
  const params: Record<string, string> = {
    ...reviewingPRs,
    q: `state="${prState}" AND ${isReviewing ? 'reviewers' : 'author'}.uuid="${currentUserUuid}"`,
  };
  return (
    `https://bitbucket.org/!api/internal/workspaces/${workspace}/pullrequests/?` +
    Object.keys(params)
      .map((key: string) => `${key}=${encodeURIComponent(params[key])}`)
      .join('&')
  );
};

export const getPullRequests = async (currentUserUuid: string, isReviewing: boolean, prState: PRState) => {
  if (!IS_PROD) {
    return rawData.values as IRow[];
  }
  const res = await fetch(getUrl(currentUserUuid, isReviewing, prState));
  const json = await res.json();
  return (json.values ?? []) as IRow[];
};

export const getStatuses = async (commits: string[]): Promise<IStatusResponse> => {
  if (!IS_PROD) {
    return statuses as IStatusResponse;
  }
  const res = await fetch(`https://bitbucket.org/!api/internal/workspaces/${workspace}/commits/statuses`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      'X-Bitbucket-Frontend': 'frontbucket',
      'X-CSRFToken': '??', // TODO
    },
    body: JSON.stringify({ commits }),
  });
  return (await res.json()) as IStatusResponse;
};

interface IMemberResponse {
  values: IUser[];
  next?: string;
}

export const getAllUsers = async (): Promise<IUser[]> => {
  if (!IS_PROD) {
    return mockUsers.values as IUser[];
  }
  const getUsers = async (allUsers: IUser[], next?: string) => {
    const res = await fetch(next ?? `https://bitbucket.org/!api/internal/workspaces/${workspace}/members/?pagelen=100`);
    const data = (await res.json()) as IMemberResponse;
    allUsers.push(...data.values);
    if (data.next) {
      await getUsers(allUsers, data.next);
    }
  };
  const allUsers: IUser[] = [];
  await getUsers(allUsers);
  return allUsers;
};
