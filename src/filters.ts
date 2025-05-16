import { IInPlaceFilters, IParticipantState, IRow } from './types';

type RowFilter = (row: IRow, filters: IInPlaceFilters) => boolean;

const passesTasks = (row: IRow, filters: IInPlaceFilters) => {
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

const passesNeedsReview = (row: IRow, filters: IInPlaceFilters) => {
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

const passesBranch = (row: IRow, filters: IInPlaceFilters) => {
  return filters.branch === 'any' || filters.branch === row.destination.branch.name;
};

const passesRepo = (row: IRow, filters: IInPlaceFilters) => {
  return filters.repo === 'any' || filters.repo === row.destination.repository.slug;
};

const getRegexFieldString = (row: IRow) =>
  [row.author.display_name, row.title, row.destination.branch.name, row.destination.repository.slug].join('');
const passesRegex = (row: IRow, filters: IInPlaceFilters) => {
  return filters.compiledRegex?.test(getRegexFieldString(row)) ?? true;
};

const passesBuild = (row: IRow, filters: IInPlaceFilters) => {
  return filters.build === 'any' || filters.build === row.buildStatus?.state;
};

const passesDraft = (row: IRow, filters: IInPlaceFilters) => {
  switch (filters.draft) {
    case 'any':
      return true;
    case 'hide':
      return !row.draft;
    case 'only':
      return row.draft;
  }
};

const allFilters: RowFilter[] = [
  passesTasks,
  passesNeedsReview,
  passesBranch,
  passesRepo,
  passesRegex,
  passesBuild,
  passesDraft,
];

export const passesFilters = (row: IRow, filters: IInPlaceFilters) => {
  return allFilters.every((f) => f(row, filters));
};
