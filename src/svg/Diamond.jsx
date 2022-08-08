import React from 'react';

function Diamond({ className }) {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
      >
        <rect
          x="17.6777"
          y="0.707107"
          width="24"
          height="24"
          transform="rotate(45 17.6777 0.707107)"
          fill="#00847F"
          stroke="#005E59"
        />
      </svg>
    </div>
  );
}

export default Diamond;
