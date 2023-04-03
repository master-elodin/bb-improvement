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

export type PRState = 'OPEN';

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
      slug: string;
    }
  };
  author: IUser;
  participants: {
    role: 'REVIEWER' | 'PARTICIPANT';
    approved: boolean;
    user: IUser;
  }[];
  task_count: number;
  comment_count: number;
  created_on: string;
  updated_on: string;
  links: {
    self: ILink;
    html: ILink;
  };
}

export interface IStatusResponse {
  [hash: string]: {
    state: string;
    status_counts: {
      FAILED: number;
      STOPPED: number;
      INPROGRESS: number;
      SUCCESSFUL: number;
    };
  };
}

export interface IRow extends IPullRequest {
  hidden?: boolean;
  buildStatus?: 'success' | 'fail' | 'in_progress';
}

export interface ICol {
  getValue: (val: IRow) => string | number;
  getRendered?: (val: IRow, currentUser: IUser) => React.ReactNode;
  label: string;
  colClass?: string;
  matchFilter?: (filterVal: string, row: IRow) => boolean;
}

export type IFilter = (row: IRow) => boolean;
