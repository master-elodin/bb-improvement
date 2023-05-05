import { allUsers as mockUsers, jiraIssues, rawData, statuses } from './data';
import { IPullRequestResponse, IAPIFilters, IRow, IStatusResponse, IUser, IJiraData } from './types';

export const API_FILTER_KEY = 'bb-script-refresh-filters';
export const IN_PLACE_FILTER_KEY = 'bb-script-in-place-filters';
export const DRAWER_KEY = 'bb-script-drawer-open';
export const DARK_MODE_KEY = 'bb-script-dark-mode';
export const SAVED_REGEX_KEY = 'bb-script-saved-regex';

export const RESULTS_PER_PAGE = 50;
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
  pagelen: `${RESULTS_PER_PAGE}`,
};

let isProd = false;
export const setIsProd = (newVal: boolean) => (isProd = newVal);

export const getPullRequests = async (filters: IAPIFilters): Promise<IPullRequestResponse> => {
  if (!isProd) {
    return {
      pullRequests: rawData.values as unknown as IRow[],
      pageNum: 1,
      totalNumResults: 55,
    };
  }
  // TODO: use filter for what repo
  const reviewerQ = filters.role === 'all' ? '' : ` AND ${filters.role}.uuid="${filters.userUuid}"`;
  const textQ = filters.text ? ` AND (description~"${filters.text}" OR title~"${filters.text}")` : '';
  const params: Record<string, string> = {
    ...reviewingPRs,
    q: `state="${filters.state}"${reviewerQ}${textQ}`,
    page: `${filters.pageNum ?? 1}`,
  };
  const url =
    `https://bitbucket.org/!api/internal/workspaces/${workspace}/pullrequests/?` +
    Object.keys(params)
      .map((key: string) => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');
  const res = await fetch(url);
  const json = await res.json();
  return {
    pullRequests: (json.values ?? []) as IRow[],
    pageNum: json.page,
    totalNumResults: json.size,
  };
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

export const getJiraIssues = async (prId: number): Promise<IJiraData[]> => {
  if (!isProd) {
    return jiraIssues.values!.map((v) => v.issue) as IJiraData[];
  }

  try {
    const res = await fetch(
      // TODO: handle multiple repos in same workspace
      `https://bitbucket.org/!api/internal/repositories/${workspace}/${workspace}/pullrequests/${prId}/jira/issues?page=1`,
    );
    const values = (await res.json()).values as any[];
    return values.map((v) => v.issue);
    //
  } catch (e) {
    console.error('Failed to get jira issues for ', prId);
  }
  return [];
};
