import * as React from 'react';

interface ILink {
  href: string;
}

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

export interface IStatus {
  state: 'SUCCESSFUL' | 'INPROGRESS' | 'FAILED';
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
  getValue: (val: IRow) => string | number;
  getRendered?: (val: IRow, currentUser: IUser) => React.ReactNode;
  label: string;
  colClass?: string;
  matchFilter?: (filterVal: string, row: IRow) => boolean;
}

export interface IRowFilters {
  userUuid: string;
  tasks: 'any' | 'yes' | 'no';
  needsReview: 'any' | 'yes' | 'no' | 'changesRequested';
  branch: 'any' | string;
  repo: 'any' | string;
  author: 'any' | string;
  role: 'reviewers' | 'author' | 'all';
  state: PRState;
  pageNum?: number;
}

export interface IOption {
  value: string;
  label: string;
}

export interface IPRSummarized {
  branches: string[];
  repos: string[];
  authors: IOption[];
  pageNum: number;
  totalNumResults: number;
}
