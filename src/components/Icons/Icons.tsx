import * as React from 'react';

interface IProps {
  selected?: boolean;
  onClick?: () => void;
}

const getOpacity = (selected?: boolean) => (selected === true ? 1 : undefined);

const UpArrow = ({ onClick, selected }: IProps) => (
  <span className={'icon up-arrow'} style={{ opacity: getOpacity(selected) }} onClick={onClick}>
    &#x25B2;
  </span>
);
const DownArrow = ({ onClick, selected }: IProps) => (
  <span className={'icon down-arrow'} style={{ opacity: getOpacity(selected) }} onClick={onClick}>
    &#x25BC;
  </span>
);

export { UpArrow, DownArrow };
