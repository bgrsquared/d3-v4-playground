import React from 'react';

import { pie, arc } from 'd3-shape';
import { lab } from 'd3-interpolate';

export const Pie = () => {
  const data = [1, 1, 2, 3, 5, 8, 13, 21];
  const arcs = pie()(data);

  const arcGen = arc()
    .innerRadius(0)
    .outerRadius(100);

  const col = lab('darkgray', 'yellow');

  return (<g>
    {arcs.map(a => {
      const ratio = Math.abs(a.startAngle - a.endAngle) / 2 / Math.PI;
      return (<path
        fill={col(ratio)}
        stroke={'white'}
        d={arcGen(a)}/>);
    })}
  </g>);
};
