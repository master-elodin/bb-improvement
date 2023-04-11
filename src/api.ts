import { allUsers as mockUsers, rawData, statuses } from './data';
import { IRow, IRowFilters, IStatusResponse, IUser } from './types';

export const FILTER_KEY = 'bb-script-filters';
export const DRAWER_KEY = 'bb-script-drawer-open';
const workspace = process.env.REACT_APP_BB_WORKSPACE ?? 'my-workspace';

const fields = [
  '-values.closed_by',
  '-values.description',
  '-values.reviewers',
  '-values.summary',
  '+values.destination.branch.name',
  '+values.destination.repository.slug',
  '+values.source.branch.name',
  '+values.source.commit.hash',
  '+values.participants.*',
  '+values.task_count',
];

const statusFields = ['+*.commit_status.updated_on', '+*.commit_status.description', '+*.commit_status.name'];

const reviewingPRs: Record<string, string> = {
  fields: fields.join(','),
  page: '1',
  pagelen: '50',
};

let isProd = false;
export const setIsProd = (newVal: boolean) => (isProd = newVal);

export const getPullRequests = async (filters: IRowFilters) => {
  if (!isProd) {
    return rawData.values as unknown as IRow[];
  }
  const reviewerQ = filters.role === 'all' ? '' : ` AND ${filters.role}.uuid="${filters.userUuid}"`
  const params: Record<string, string> = {
    ...reviewingPRs,
    q: `state="${filters.state}"${reviewerQ}`,
  };
  const url = (
    `https://bitbucket.org/!api/internal/workspaces/${workspace}/pullrequests/?` +
    Object.keys(params)
      .map((key: string) => `${key}=${encodeURIComponent(params[key])}`)
      .join('&')
  );
  const res = await fetch(url);
  const json = await res.json();
  return (json.values ?? []) as IRow[];
};

export const getStatuses = async (commits: string[]): Promise<IStatusResponse> => {
  if (!isProd) {
    return statuses as IStatusResponse;
  }
  const res = await fetch(
    `https://bitbucket.org/!api/internal/repositories/${workspace}/${workspace}/commits/statuses/` +
      `?fields=${encodeURIComponent(statusFields.join(','))}`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Bitbucket-Frontend': 'frontbucket',
      },
      body: commits.map((commit) => `commits=${commit}`).join('&'),
    },
  );
  return (await res.json()) as IStatusResponse;
};

interface IMemberResponse {
  values: IUser[];
  next?: string;
}

export const getAllUsers = async (): Promise<IUser[]> => {
  if (!isProd) {
    return mockUsers.values as IUser[];
  }
  const allUsers: IUser[] = [];
  try {
    const getUsers = async (allUsers: IUser[], next?: string) => {
      const res = await fetch(
        next ?? `https://bitbucket.org/!api/internal/workspaces/${workspace}/members/?pagelen=100`,
      );
      const data = (await res.json()) as IMemberResponse;
      allUsers.push(...data.values);
      if (data.next) {
        await getUsers(allUsers, data.next);
      }
    };
    await getUsers(allUsers);
  } catch (e) {
    console.error('Failed to get users', e);
    // @ts-ignore: controlled outside the app
    allUsers.push(...JSON.parse(fallbackMembers ?? '[]'));
  }
  return allUsers;
};
