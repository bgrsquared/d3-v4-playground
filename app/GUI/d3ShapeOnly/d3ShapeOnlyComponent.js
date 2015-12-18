/* global ga */

import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import { Line } from './shapes/line';
import { Pie } from './shapes/pie';
import { RadialLine } from './shapes/radialLine';

export default class d3ShapeOnlyComponent extends Component {
  render() {
    // bump the pie around a bit...
    const calcCenter = () => 150 + Math.random() * 200;

    return (<div>
      <p>As a simple example, this <strong>static</strong> component consists of a svg container
        and adds a <strong>Line</strong> (as a component)
        and a <strong>pie chart</strong> (as a component), plus
        a <strong>radial line</strong> (as a component)</p>

      <Button
        bsStyle={'danger'}
        onClick={() => { this.forceUpdate(); }}>
        Produce some new random data (not animated)
      </Button>
      <br/><br/>

      <div style={{ height: 500, width: 500, border: '2px solid lightgray' }}>
        <svg height={500} width={500}>
          <Line/>
          <g transform={'translate(' + calcCenter() + ', ' + calcCenter() + ')'}>
            <Pie/>
            <RadialLine/>
          </g>
        </svg>
      </div>

    </div>);
  }
}
