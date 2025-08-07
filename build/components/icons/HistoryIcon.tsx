
import React from 'react';

const HistoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 22h16" />
    <path d="M7 22v-4h4v4" />
    <path d="M15 22v-4h4v4" />
    <path d="M7 18v-7l5-3l5 3v7" />
    <path d="M12 12v6" />
  </svg>
);

export default HistoryIcon;
