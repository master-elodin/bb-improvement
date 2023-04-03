import { IFilter, IRow } from './types';
import { loggedInUserUuid } from './constants';

export type FilterType = 'needsReview' | 'tasks' | 'branch' | 'repo' | 'prState' | 'isReviewing';
const rowHasApproval = (row: IRow) => row.participants.some((user) => user.user.uuid === loggedInUserUuid && user.approved);
export const filters: Record<string, Record<string, IFilter>> = {
  tasks: {
    any: () => true,
    yes: (row: IRow) => row.task_count > 0,
    no: (row: IRow) => row.task_count === 0,
  },
  needsReview: {
    any: () => true,
    yes: (row: IRow) => !rowHasApproval(row),
    no: (row: IRow) => rowHasApproval(row),
  },
  branch: {
    any: () => true,
  },
  repo: {
    any: () => true,
  }
};
