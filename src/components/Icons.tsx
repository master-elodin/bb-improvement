import * as React from 'react';

interface IProps {
  selected?: boolean;
  onClick?: () => void;
}

const UpArrow = ({ onClick, selected = true }: IProps) => (
  <span className={'icon up-arrow'} style={{ opacity: selected ? 1 : 0.2 }} onClick={onClick}>
    &#x25B2;
  </span>
);
const DownArrow = ({ onClick, selected = true }: IProps) => (
  <span className={'icon down-arrow'} style={{ opacity: selected ? 1 : 0.2 }} onClick={onClick}>
    &#x25BC;
  </span>
);

export { UpArrow, DownArrow };
