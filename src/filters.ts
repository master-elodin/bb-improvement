import { IParticipantState, IRow, IRowFilters } from './types';

const passesTasks = (row: IRow, filters: IRowFilters) => {
  switch (filters.tasks) {
    case 'yes':
      return row.task_count > 0;
    case 'no':
      return row.task_count === 0;
    case 'any':
      return true;
  }
};

const rowHasExpectedState = (row: IRow, userUuid: string, expectedState: IParticipantState) =>
  row.participants.some((participant) => {
    return participant.user.uuid === userUuid && participant.state === expectedState;
  });

const passesNeedsReview = (row: IRow, filters: IRowFilters) => {
  switch (filters.needsReview) {
    case 'yes':
      return rowHasExpectedState(row, filters.userUuid, null);
    case 'no':
      return rowHasExpectedState(row, filters.userUuid, 'approved');
    case 'changesRequested':
      return rowHasExpectedState(row, filters.userUuid, 'changes_requested');
    case 'any':
      return true;
  }
};

const passesBranch = (row: IRow, filters: IRowFilters) => {
  return filters.branch === 'any' || filters.branch === row.destination.branch.name;
};
const passesRepo = (row: IRow, filters: IRowFilters) => {
  return filters.repo === 'any' || filters.repo === row.destination.repository.slug;
};

export const passesFilters = (row: IRow, filters: IRowFilters) => {
  return (
    passesTasks(row, filters) &&
    passesNeedsReview(row, filters) &&
    passesBranch(row, filters) &&
    passesRepo(row, filters)
  );
};
