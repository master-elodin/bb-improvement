import * as React from 'react';

interface ILink {
  href: string;
}

export type UserRecord = { [uuid: string]: IUser };

export interface IUser {
  display_name: string;
  nickname: string;
  uuid: string;
  links: {
    avatar: ILink;
  };
}

export type IParticipantState = 'approved' | 'changes_requested' | null;

export interface IParticipant {
  approved: boolean;
  role: 'REVIEWER' | 'PARTICIPANT';
  state: IParticipantState;
  user: IUser;
}

export type PRState = 'OPEN' | 'MERGED' | 'DECLINED';

export interface IPullRequest {
  id: number;
  title: string;
  state: PRState;
  source: {
    commit: {
      hash: string;
    };
    branch: {
      name: string;
    };
  };
  destination: {
    branch: {
      name: string;
    };
    repository: {
      links: {
        html: ILink;
      };
      slug: string;
    };
  };
  author: IUser;
  participants: IParticipant[];
  task_count: number;
  comment_count: number;
  created_on: string;
  updated_on: string;
  closed_on?: string;
  links: {
    self: ILink;
    html: ILink;
  };
}

export interface IPullRequestResponse {
  pullRequests: IPullRequest[];
  pageNum: number;
  totalNumResults: number;
}

type BuildState = 'SUCCESSFUL' | 'INPROGRESS' | 'FAILED';

export interface IStatus {
  state: BuildState;
  commit_status: {
    name: string;
    url: string;
    description: string;
    updated_on: string;
  };
  status_counts: {
    FAILED: number;
    STOPPED: number;
    INPROGRESS: number;
    SUCCESSFUL: number;
  };
}

export interface IStatusResponse {
  [hash: string]: IStatus;
}

export interface IRow extends IPullRequest {
  hidden?: boolean;
  buildStatus?: IStatus;
}

export interface ICol {
  id: string;
  getValue: (val: IRow) => string | number;
  getRendered: (val: IRow, currentUser: IUser) => React.ReactNode;
  label: string;
  hideSort?: boolean;
}

export interface IAPIFilters {
  role: 'reviewers' | 'author' | 'all';
  state: PRState;
  userUuid: string;
  pageNum: number;
  text?: string;
}

export interface IInPlaceFilters {
  userUuid: string;
  regex: string;
  compiledRegex?: RegExp;
  tasks: 'any' | 'yes' | 'no';
  needsReview: 'any' | 'yes' | 'no' | 'changesRequested';
  branch: 'any' | string;
  repo: 'any' | string;
  build: 'any' | BuildState;
}

export interface ISavedRegex {
  key: string;
  name: string;
  value: string;
}

export interface IOption {
  value: string;
  label: string;
  rendered?: React.ReactNode;
}

export interface IPRSummarized {
  branches: string[];
  repos: string[];
  authors: IOption[];
  pageNum: number;
  totalNumResults: number;
}

// TODO: remove real data
export interface IJiraData {
  key: string; // 'CRIBL-16175';
  summary: string; // 'Create util for input autofocus hack';
  issueType: {
    name: string; // 'Story';
    iconUrl: string; // 'https://taktak.atlassian.net/images/icons/issuetypes/story.svg';
  };
  status: {
    name: string; // 'In Review';
  };
  site: {
    cloudUrl: string;
  };
  assignee: {
    displayName: string; // 'Tim VanDoren';
    avatarUrls: {
      '128x128': 'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5ff31b56849d640111331a31/8d8fb9af-35cb-4ae7-b9aa-2a9260446957/128';
    };
  };
}
