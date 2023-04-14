import * as React from 'react';
import PageArrow from './PageArrow';
import PageNumber from './PageNumber';

interface IProps {
  currentPage: number;
  possiblePages: number[];
  onPageClick: (newVal: number) => void;
}

const PageSelector = ({ currentPage, possiblePages, onPageClick }: IProps) => {
  const numPages = possiblePages.length;
  return (
    <div className={'app-header__page-selector'}>
      <PageArrow pageNum={currentPage} onPageClick={onPageClick} limit={1} direction={'<'} />
      {currentPage > 3 && (
        <>
          <PageNumber pageNum={1} currentPage={currentPage} onPageClick={onPageClick} />
          {'...'}
        </>
      )}
      {possiblePages.slice(Math.max(0, currentPage - 3), Math.min(numPages, currentPage + 2)).map((p) => (
        <PageNumber key={p} pageNum={p} currentPage={currentPage} onPageClick={onPageClick} />
      ))}
      {currentPage < numPages - 3 && numPages > 3 && (
        <>
          {'...'}
          <PageNumber pageNum={numPages} currentPage={currentPage} onPageClick={onPageClick} />
        </>
      )}
      <PageArrow pageNum={currentPage} onPageClick={onPageClick} limit={numPages} direction={'>'} />
    </div>
  );
};

export default PageSelector;
