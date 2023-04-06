import * as React from 'react';

export const ApprovedIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' role='presentation' style={{ opacity: '.9' }}>
    <g fillRule='evenodd'>
      <circle fill='white' cx='12' cy='12' r='12' />
      <circle fill='#36B37E' cx='12' cy='12' r='10' />
      <path
        d='M9.707 11.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 10-1.414-1.414L11 12.586l-1.293-1.293z'
        fill='white'
      />
    </g>
  </svg>
);

export const RequestChangesIcon = () => (
  <svg role='presentation' width='16' height='16' viewBox='0 0 24 24' style={{ opacity: '.9' }}>
    <g fillRule='evenodd'>
      <circle fill='white' cx='12' cy='12' r='12' />
      <circle fill='#FFAB00' cx='12' cy='12' r='10' />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M17.144 10.76068C17.134700000000002 10.76068 17.1254 10.76078 17.1161 10.76099L7.14397 10.76099C6.45361 10.76099 5.8939699999999995 11.32063 5.8939699999999995 12.011C5.8939699999999995 12.7013 6.45361 13.261 7.14397 13.261L17.144 13.261V13.2607L17.144 13.2607C17.8343 13.2607 18.394 12.701 18.394 12.0107C18.394 11.32033 17.8343 10.76068 17.144 10.76068z'
        fill='#F4F5F7' />
    </g>
  </svg>
);

export const FailedIcon = () => (
  <svg width='16' height='16' viewBox='4 4 18 18' role='presentation' style={{ color: '#DE350B', opacity: '.9' }}>
    <g fillRule='evenodd'>
      <path
        d='M13.416 4.417a2.002 2.002 0 00-2.832 0l-6.168 6.167a2.002 2.002 0 000 2.833l6.168 6.167a2.002 2.002 0 002.832 0l6.168-6.167a2.002 2.002 0 000-2.833l-6.168-6.167z'
        fill='currentColor'
      />
      <path d='M12 14a1 1 0 01-1-1V8a1 1 0 012 0v5a1 1 0 01-1 1m0 3a1 1 0 010-2 1 1 0 010 2' fill='white' />
    </g>
  </svg>
);
