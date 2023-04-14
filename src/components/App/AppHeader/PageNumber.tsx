import * as React from 'react';
import { cx } from '../../../utils';

interface IProps {
  currentPage: number;
  pageNum: number;
  onPageClick: (newVal: number) => void;
}

const PageNumber = ({ currentPage, pageNum, onPageClick }: IProps) => {
  return (
    <span
      className={cx(
        'app-header__page-selector__page',
        currentPage !== pageNum && 'link app-header__page-selector__page--clickable',
        currentPage === pageNum && 'app-header__page-selector__page--current',
      )}
      onClick={() => onPageClick(pageNum)}>
      {pageNum}
    </span>
  );
};

export default PageNumber;
