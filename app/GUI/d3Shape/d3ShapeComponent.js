import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { spring, Motion } from 'react-motion';
require('./d3ShapeStyle.scss');

import { line } from 'd3-shape';
import { linear } from 'd3-scale';

export default class d3ShapeComponent extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    const { refreshRandomData } = this.props;
    refreshRandomData();
  }

  handleMouseDown() {
    this.setState({ open: !this.state.open });
  }

  handleTouchStart(e) {
    e.preventDefault();
    this.handleMouseDown();
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

    console.log(fakeData);
    const pathVars = {};
    fakeData.map((d,i) => {
      pathVars['x' + i] = spring(Math.random() * 100, [50, 7]);
      pathVars['y' + i] = spring(Math.random() * 100, [50, 7]);
    });
    pathVars.x0 = spring((Math.random() * 100), [50, 7]);
    pathVars.y0 = spring((Math.random() * 100), [50, 7]);
    pathVars.x1 = spring((Math.random() * 100), [50, 7]);
    pathVars.y1 = spring((Math.random() * 100), [50, 7]);
    pathVars.x2 = spring((Math.random() * 100), [50, 7]);
    pathVars.y2 = spring((Math.random() * 100), [50, 7]);
    pathVars.x3 = spring((Math.random() * 100), [50, 7]);
    pathVars.y3 = spring((Math.random() * 100), [50, 7]);
    pathVars.x4 = spring((Math.random() * 100), [50, 7]);
    pathVars.y4 = spring((Math.random() * 100), [50, 7]);

    return (<div>
      <h1>d3-shape</h1>
      <button
        onMouseDown={this.handleMouseDown.bind(this)}
        onTouchStart={this.handleTouchStart.bind(this)}>
        Toggle
      </button>

      <Motion style={{ x: spring(this.state.open ? 400 : 0, [50, 7]) }}>
        {({ x }) =>
          <div className="demo0">
            <div className="demo0-block" style={{
                WebkitTransform: `translate3d(${x}px, 0, 0)`,
                transform: `translate3d(${x}px, 0, 0)`,
              }}>{Math.round(x)}
              <svg height={'50px'} width={'50px'}>
                <circle
                  cx={25}
                  cy={25}
                  r={Math.max(0, 20 * x / 400)}
                />
              </svg>
            </div>
          </div>
        }
      </Motion>
      <Button onClick={() => refreshRandomData()}>Refresh Data!</Button>
      <div style={{ marginLeft: '10px' }}>

        <Motion style={{
          sw: spring(Math.floor(Math.random() * 50), [50, 7]),
           x0: pathVars.x0,
           y0: pathVars.y0,
           x1: pathVars.x1,
           y1: pathVars.y1,
           x2: pathVars.x2,
           y2: pathVars.y2,
           x3: pathVars.x3,
           y3: pathVars.y3,
           x4: pathVars.x4,
           y4: pathVars.y4,
        }}>
          {({ sw, x0, y0, x1, y1, x2, y2, x3, y3, x4, y4 }) => {
            const myData = fakeData;
            if (myData.length) {
              myData[0].x = x0;
              myData[0].y = y0;
              myData[1].x = x1;
              myData[1].y = y1;
              myData[2].x = x2;
              myData[2].y = y2;
              myData[3].x = x3;
              myData[3].y = y3;
              myData[4].x = x4;
              myData[4].y = y4;
            }
            return <svg height={height} width={width} stroke="red"
                        strokeWidth={sw + 'px'} fill="none">
              <path d={lineGenerator(myData)}/>
            </svg>
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
};
