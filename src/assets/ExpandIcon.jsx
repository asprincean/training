import React from 'react';

const ExpandIcon = ({ className }) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0"
        y="0"
        enableBackground="new 0 0 210 210"
        version="1.1"
        viewBox="0 0 210 210"
        xmlSpace="preserve"
      >
        <path
          fill="#020202"
          d="M34.774 152.509l26.441 26.442 19.93 19.931L3.724 210l11.119-77.422 19.931 19.931zm140.452 0l-30.445-30.441-26.44 26.439 30.441 30.444-19.93 19.931L206.276 210l-11.119-77.422-19.931 19.931zM65.22 122.067l26.439 26.439-30.443 30.444-26.441-26.442 30.445-30.441zm-4.004-91.018l30.443 30.444-26.439 26.44-30.446-30.442-19.931 19.931L3.724 0l77.422 11.118-19.93 19.931zm57.125 30.444l30.441-30.444-19.93-19.931L206.276 0l-11.119 77.422-19.932-19.931-30.445 30.442-26.439-26.44z"
        ></path>
      </svg>
    </div>
  );
};

export default ExpandIcon;
