import React from 'react';

import { line, basisClosed } from 'd3-shape';

export const Line = () => {
  const lineGenerator = line()
    .curve(basisClosed)
    .x(d => d.x)
    .y(d => d.y);

  const size = 500;
  const random = () => 500 * Math.random();

  const data = [{
    x: 0,
    y: random(),
  }, {
    x: random(),
    y: 0,
  }, {
    x: size,
    y: random(),
  }, {
    x: random(),
    y: size,
  },
  ];
  return (<path stroke={'red'} fill={'none'}
                d={lineGenerator(data)}/>);
};
