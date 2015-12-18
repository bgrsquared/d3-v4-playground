import React from 'react';

import { line, linearClosed } from 'd3-shape';

export const Line = () => {
  const lineGenerator = line()
    .curve(linearClosed)
    .x(d => d.x)
    .y(d => d.y);
  const data = [{
    x: 0,
    y: 0,
  }, {
    x: 500,
    y: 100,
  }, {
    x: 250,
    y: 500,
  },
  ];
  return (<path stroke={'red'} fill={'none'}
                d={lineGenerator(data)}/>);
};
