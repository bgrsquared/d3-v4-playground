import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';

import { line } from 'd3-shape';
import { linear } from 'd3-scale';

export default class d3ShapeComponent extends Component {
  componentDidMount() {
    const { refreshRandomData } = this.props;
    refreshRandomData();
  }

  render() {
    const { app, refreshRandomData } = this.props;
    const { fakeData } = app;

    const width = 500;
    const height = 500;

    const xScale = linear()
      .domain([0, 100])
      .range([0, width]);
    const yScale = linear()
      .domain([0, 100])
      .range([height, 0]);

    const lineGenerator = line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y));

    return (<div>
      <h1>d3-shape</h1>
      <Button onClick={() => refreshRandomData()}>Refresh Data!</Button>
      <div style={{ marginLeft: '10px' }}>
        <svg height={height} width={width} stroke="red"
             strokeWidth="3" fill="none">
          <path d={lineGenerator(fakeData)}/>
        </svg>
      </div>

    </div>);
  }
}

d3ShapeComponent.propTypes = {
  app: PropTypes.object,
  refreshRandomData: PropTypes.func.isRequired,
};
