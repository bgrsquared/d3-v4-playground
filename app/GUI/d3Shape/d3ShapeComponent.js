import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { spring, Motion } from 'react-motion';
require('./d3ShapeStyle.scss');

import { line, linear as linearInterpolation,
  linearClosed, cardinal, cardinalClosed } from 'd3-shape';
import { linear } from 'd3-scale';
import { lab } from 'd3-interpolate';

export default class d3ShapeComponent extends Component {
  componentDidMount() {
    const { refreshRandomData } = this.props;
    refreshRandomData();
  }

  render() {
    const { app, refreshRandomData, setObject } = this.props;
    const { fakeData, nFakeData, pathType } = app;
    const springParams = [50, 7];

    let pt;
    switch (pathType) {
      case 'cardinal':
        pt = cardinal;
        break;
      case 'linear':
        pt = linearInterpolation;
        break;
      case 'cardinalClosed':
        pt = cardinalClosed;
        break;
      case 'linearClosed':
        pt = linearClosed;
        break;
      default:
        pt = linearInterpolation;
    }

    const width = 500;
    const height = 500;

    const xScale = linear()
      .domain([0, 100])
      .range([0, width]);
    const yScale = linear()
      .domain([0, 100])
      .range([height, 0]);

    const lineGenerator = line()
      .curve(pt)
      .x(d => xScale(d.x))
      .y(d => yScale(d.y));

    const pathVars = {};
    fakeData.map((d, i) => {
      pathVars['x' + i] = spring(d.x, [50, 7]);
      pathVars['y' + i] = spring(d.y, [50, 7]);
    });

    const col = lab('steelblue', 'orangered');

    return (<div style={{ marginLeft: '20px' }}>
      <h1>d3.v4 & react </h1>
      <p>Path with {nFakeData} nodes (closed, cardinal)</p>
      <p>reactjs rendering "d3-shape" line</p>
      <p>Data provided by redux</p>
      <p>Animations using react-motion (path, stroke-width, color)</p>
      <Button onClick={() => refreshRandomData()}>Refresh Data!</Button>
      <ButtonGroup>
        <Button
          onClick={() => { setObject({ pathType: 'linear' }); }}>
          Linear
        </Button>
        <Button
          onClick={() => { setObject({ pathType: 'linearClosed' }); }}>
          Linear Closed
        </Button>
        <Button
          onClick={() => { setObject({ pathType: 'cardinalClosed' }); }}>
          Cardinal Closed
        </Button>
        <Button
          onClick={() => { setObject({ pathType: 'cardinal' }); }}>
          Cardinal
        </Button>
      </ButtonGroup>
      <div style={{ marginLeft: '10px' }}>

        <Motion style={{
          sw: spring(Math.floor(Math.random() * 50), springParams),
          color: spring(Math.random(), springParams),
           ...pathVars,
           pathKeys: Object.keys(pathVars),
        }}>
          {inter => {
            const { pathKeys } = inter;
            const myData = fakeData;

            pathKeys.map(k => {
              const coord = k.substr(0, 1);
              const no = +k.substr(1);
              myData[no][coord] = inter[k];
            });
            return (<svg height={height} width={width} stroke={col(inter.color)}
                         strokeWidth={inter.sw / 10 + 'px'} fill="none">
              <path d={lineGenerator(fakeData)}/>
            </svg>);
          }
          }
        </Motion>

      </div>

    </div>);
  }
}

d3ShapeComponent.propTypes = {
  app: PropTypes.object,
  refreshRandomData: PropTypes.func.isRequired,
  setObject: PropTypes.func.isRequired,
};
