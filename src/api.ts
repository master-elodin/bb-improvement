import { IS_PROD, userUuid } from './constants';
import { allUsers as mockUsers, rawData, statuses } from './data';
import { IRow, IStatusResponse, IUser } from './types';

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
  // TODO: this can probably be improved
  const allUsers: IUser[] = [];
  await getUsers(allUsers);
  return allUsers;
};
