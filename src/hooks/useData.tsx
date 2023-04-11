import { useState } from 'react';
import { getPullRequests, getStatuses } from '../api';
import { IPRSummarized, IRow, IRowFilters } from '../types';

const useData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [summarized, setSummarized] = useState<IPRSummarized>({
    branches: [],
    repos: [],
    authors: [],
  });
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
    const pullRequests = await getPullRequests(filters);
    const branches = [...new Set(pullRequests.map((pr) => pr.destination.branch.name))].sort();
    const repos = [...new Set(pullRequests.map((pr) => pr.destination.repository.slug))].sort();
    const authorsById = pullRequests.reduce((acc: { [uuid: string]: string }, val) => {
      acc[val.author.uuid] = val.author.display_name;
      return acc;
    }, {});
    const authors = Object.keys(authorsById)
      .map((uuid) => ({
        label: authorsById[uuid],
        value: uuid,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    setSummarized({
      branches,
      repos,
      authors,
    });

    setPullRequests(pullRequests);
    await addBuildStatus(pullRequests.map((pr) => pr.source.commit.hash));

    setIsLoading(false);
  };

  return {
    isLoading,
    summarized,
    pullRequests,
    refresh,
  };
};

export default useData;
