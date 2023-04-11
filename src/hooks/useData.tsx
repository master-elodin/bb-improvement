import { useState } from 'react';
import { getPullRequests, getStatuses } from '../api';
import { IRow, IRowFilters } from '../types';

const useData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allBranches, setAllBranches] = useState<string[]>([]);
  const [allRepoNames, setAllRepoNames] = useState<string[]>([]);
  const [pullRequests, setPullRequests] = useState<IRow[]>([]);

  const addBuildStatus = async (commits: string[]) => {
    try {
      // TODO: make statuses work for every repo
      const statuses = await getStatuses(commits);
      setPullRequests((prevState) => {
        prevState.forEach((pr) => {
          pr.buildStatus = statuses[pr.source.commit.hash];
        });
        return [...prevState];
      });
    } catch (e) {
      console.error('Could not add status', e);
    }
  };

  const refresh = async (filters: IRowFilters) => {
    setIsLoading(true);
    const pullRequests = await getPullRequests(filters.userUuid, filters.role === 'reviewer', filters.state);
    const branches = [...new Set(pullRequests.map((row) => row.destination.branch.name))].sort();
    setAllBranches(branches);

    const repoNames = [...new Set(pullRequests.map((p) => p.destination.repository.slug))].sort();
    setAllRepoNames(repoNames);

    setPullRequests(pullRequests);
    await addBuildStatus(pullRequests.map((pr) => pr.source.commit.hash));

    setIsLoading(false);
  };

  return {
    isLoading,
    allBranches,
    allRepoNames,
    pullRequests,
    refresh,
  };
};

export default useData;
