import React from 'react';

function Time({ className, seconds }) {
  const format = (seconds) => {
    let hh = Math.floor(seconds / 3600);
    let mm = Math.floor((seconds % 3600) / 60);
    let ss = Math.floor(seconds - hh * 3600 - mm * 60);

    if (mm < 10) {
      mm = '0' + mm;
    }
    if (ss < 10) {
      ss = '0' + ss;
    }

    console.log(hh, mm, ss);

    return hh === 0 ? `${mm}:${ss}` : `${hh}:${mm}:${ss}`;
  };

  return <time className={className}>{format(seconds)}</time>;
}

export default Time;
