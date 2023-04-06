import { IFilter, IParticipantState, IRow, IUser } from './types';

export type FilterType = 'needsReview' | 'tasks' | 'branch' | 'repo' | 'prState' | 'isReviewing';
const rowHasExpectedState = (row: IRow, user: IUser, expectedState: IParticipantState) =>
  row.participants.some((participant) => {
    return participant.user.uuid === user.uuid && participant.state === expectedState;
  });
export const filters: Record<string, Record<string, IFilter>> = {
  tasks: {
    any: () => true,
    yes: (row: IRow) => row.task_count > 0,
    no: (row: IRow) => row.task_count === 0,
  },
  needsReview: {
    any: () => true,
    yes: (row: IRow, user) => rowHasExpectedState(row, user, null),
    no: (row: IRow, user) => rowHasExpectedState(row, user, 'approved'),
    changesRequested: (row: IRow, user) => rowHasExpectedState(row, user, 'changes_requested'),
  },
  branch: {
    any: () => true,
  },
  repo: {
    any: () => true,
  },
};
