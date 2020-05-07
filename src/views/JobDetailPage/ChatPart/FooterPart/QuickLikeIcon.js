import React from 'react';

function QuickLikeIcon({ color }) {
  return (<svg version="1.1" x="0px" y="0px"
    width="30px" height="30px"
    viewBox="40 40 50 50"
    className="chatBox--sendIcon"
  >
    <g>
      <path fill={color} d="M51.608,83.699h-3.925c-1.961,0-3.051-3.216-3.051-9.486s1.09-9.486,3.051-9.486h3.925
c0.962,0,1.742,0.655,1.742,1.459v16.051C53.35,83.043,52.57,83.699,51.608,83.699 M62.483,46.124c0-1.003,0.73-1.776,1.746-1.779
c2.098,0,6.976,1.378,6.976,9.787c0,2.847-0.346,4.391-0.495,5.416c0,0.003,0,0.006,0,0.01c-0.051,0.407,0.27,0.77,0.689,0.77
c8.364,0,12.83,2.215,12.83,4.473c0,1.103-0.451,2.099-1.172,2.832c1.248,0.709,2.1,2.018,2.1,3.534
c0,1.723-1.003,3.182-2.532,3.791c0.478,0.662,0.76,1.472,0.76,2.343c0,1.873-1.121,3.434-2.877,3.922
c0.164,0.406,0.265,0.846,0.265,1.309c0,2.011-3.384,3.635-11.316,3.635c-5.795,0-9.794-1.034-11.333-1.78
c-1.131-0.545-2.615-1.534-2.615-4.447V68.368c0-6.513,7.412-8.718,7.412-15.127C62.918,49.207,62.483,47.505,62.483,46.124"/>
    </g>
  </svg>)
}
export default QuickLikeIcon