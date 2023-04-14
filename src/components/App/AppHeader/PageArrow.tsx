import * as React from 'react';
import { cx } from '../../../utils';

interface IProps {
  pageNum: number;
  onPageClick: (newVal: number) => void;
  limit: number;
  direction: '<' | '>';
}

const PageArrow = ({ pageNum, onPageClick, limit, direction }: IProps) => {
  const isPrevious = direction === '<';
  const isEnabled = isPrevious ? pageNum > 1 : pageNum < limit;
  return (
    <span
      className={cx(
        'app-header__page-selector__page',
        isEnabled && 'link app-header__page-selector__page--clickable',
        !isEnabled && 'app-header__page-selector__page--disabled',
      )}
      onClick={() => isEnabled && onPageClick(pageNum - 1 * (isPrevious ? 1 : -1))}>
      {direction}
    </span>
  );
};

export default PageArrow;
