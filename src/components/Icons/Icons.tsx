import * as React from 'react';

interface IProps {
  selected?: boolean;
  onClick?: () => void;
}

const getOpacity = (selected?: boolean) => (selected === true ? 1 : undefined);

export const UpArrow = ({ onClick, selected }: IProps) => (
  <span className={'icon up-arrow'} style={{ opacity: getOpacity(selected) }} onClick={onClick}>
    &#x25B2;
  </span>
);

export const DownArrow = ({ onClick, selected }: IProps) => (
  <span className={'icon down-arrow'} style={{ opacity: getOpacity(selected) }} onClick={onClick}>
    &#x25BC;
  </span>
);

export const UserIcon = () => (
  // https://www.svgrepo.com/svg/511194/user-circle
  <svg width='1em' height='1em' viewBox='0 0 24 24' fill='none'>
    <g id='User / User_Circle'>
      <path
        id='Vector'
        d='M17.2166 19.3323C15.9349 17.9008 14.0727 17 12 17C9.92734 17 8.06492 17.9008 6.7832 19.3323M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11C15 12.6569 13.6569 14 12 14Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
  </svg>
);
