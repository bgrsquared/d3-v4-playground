/* global ga */

import React, { Component } from 'react';

import { Line } from './shapes/line';
import { Pie } from './shapes/pie';

export default class d3ShapeOnlyComponent extends Component {
  render() {
    return (<div>
      <p>As a simple example, this <strong>static</strong> component consists of a svg container
      and adds a <strong>Line</strong> (as a component)
        and a <strong>pie chart</strong> (as a component)</p>

      <div style={{ height: 500, width: 500, border: '2px solid lightgray' }}>
        <svg height={500} width={500}>
          <Line/>
          <g transform={'translate(250,250)'}>
            <Pie/>
          </g>
        </svg>
      </div>

    </div>);
  }
}
