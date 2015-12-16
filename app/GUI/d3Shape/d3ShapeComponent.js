import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { spring, /* Motion, */ TransitionMotion } from 'react-motion';
require('./d3ShapeStyle.scss');

import { line, linear as linearInterpolation,
  linearClosed, cardinal, cardinalClosed } from 'd3-shape';
import { linear } from 'd3-scale';
import { lab } from 'd3-interpolate';

export default class d3ShapeComponent extends Component {
  constructor() {
    super();
    this.state = {
      width: 0.9 * window.innerWidth,
    };
  }

  componentDidMount() {
    const { refreshRandomData } = this.props;
    refreshRandomData();
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  getStyles(fakeData) {
    const { springParamsStd } = this.props.app;
    const { width } = this.state;

    const xScale = linear()
      .domain([0, 100])
      .range([0.1 * width, 0.9 * width]);
    const yScale = linear()
      .domain([0, 100])
      .range([0.9 * width, 0.1 * width]);

    const configs = {};
    fakeData.map((d, i) => {
      configs['point' + i] = {
        x: spring(xScale(d.x), springParamsStd),
        y: spring(yScale(d.y), springParamsStd),
        r: spring(50 * Math.random(), springParamsStd),
      };
    });
    return configs;
  }

  handleResize() {
    this.setState({ width: 0.9 * window.innerWidth });
  }

  willEnter(key, style) {
    const { springParamsStd } = this.props;
    return Object.assign({}, style, { r: spring(0, springParamsStd) });
  }

  willLeave(key, style) {
    const { springParamsStd } = this.props;
    return Object.assign({}, style, { r: spring(-20, springParamsStd) });
  }

  render() {
    const { width } = this.state;
    const { app, refreshRandomData, setObject } =
      this.props;
    const { fakeData, nFakeData, pathType, springParamsStd } = app;

    const pt = pathType || cardinal;

    const lineGenerator = line()
      .curve(pt)
      .x(d => d.x)
      .y(d => d.y);

    const randomColor = () => '#' + ((1 << 24) * Math.random() | 0).toString(16);
    const col = lab(randomColor(), randomColor());

    const numberButtons = [];
    const numbers = [5, 10, 50, 100, 500];
    numbers.map(n => {
      const style = (n === nFakeData ? 'primary' : 'default');
      numberButtons.push(
        <Button
          key={'nBtn' + n}
          bsSize={"xsmall"}
          bsStyle={style}
          onClick={() => { setObject({ nFakeData: n }); }}>
          {n}
        </Button>);
    });

    const interpolationButtons = [];
    const interpolations = [
      linearInterpolation, linearClosed, cardinalClosed, cardinal,
    ];
    interpolations.map(i => {
      const style = (i === pt ? 'primary' : 'default');
      interpolationButtons.push(
        <Button
          key={'iBtn' + i}
          bsSize={"xsmall"}
          bsStyle={style}
          onClick={() => { setObject({ pathType: i }); }}>
          {i.name}
        </Button>);
    });

    const springControlButtons = [];
    const springControls = [
      {
        name: 'noWobble',
        value: [170, 26],
      },
      {
        name: 'gentle',
        value: [120, 14],
      },
      {
        name: 'wobbly',
        value: [180, 12],
      },
      {
        name: 'stiff',
        value: [210, 20],
      },
    ];
    springControls.map(s => {
      const style = (s.value[0] === springParamsStd[0] &&
      s.value[1] === springParamsStd[1] ? 'primary' : 'default');
      springControlButtons.push(
        <Button
          key={'scBtn' + s.name}
          bsSize={"xsmall"}
          bsStyle={style}
          onClick={() => { setObject({ springParamsStd: s.value }); }}>
          {s.name}
        </Button>);
    });

    return (<div style={{ marginLeft: '20px' }}>
      <h1>d3.v4 & react </h1>
      <p>Path with {nFakeData} nodes ({pt.name} interpolation)</p>
      <p>reactjs rendering "d3-shape" line</p>
      <p>Data provided by redux</p>
      <p>Animations using react-motion</p>
      <Button
        bsSize={"xsmall"}
        onClick={() => refreshRandomData()}>Refresh Data!
      </Button>{' '}
      <ButtonGroup>
        {numberButtons}
      </ButtonGroup>
      <br/>
      <ButtonGroup>
        {interpolationButtons}
      </ButtonGroup>
      <br/>
      <ButtonGroup>
        {springControlButtons}
      </ButtonGroup>

      <div style={{ marginLeft: '10px', marginRight: '10px' }}>
        <br/>
        <TransitionMotion
          styles={this.getStyles(fakeData)}
          willEnter={this.willEnter.bind(this)}
          willLeave={this.willLeave.bind(this)}
        >
          {inter => {
            const myPath = [];
            const pts = fakeData.length;
            Object.keys(inter).map((p, i) => {
              const point = inter[p];
              if (i < pts) {
                myPath.push({
                  x: point.x,
                  y: point.y,
                });
              }
            });

            return (<div style={{ border: '2px solid lightgray' }}>
              <svg height={width} width={width}
                   stroke={ 'lightgray' }
                   strokeWidth={'5px'} fill="none">
                <path d={lineGenerator(myPath)}/>
                {
                  Object.keys(inter).map((key, i) => {
                    const { ...style } = inter[key];
                    return (
                      <circle key={'circ' + i}
                              cx={style.x}
                              cy={style.y}
                              r={Math.max(0, style.r)}
                              stroke={col(i / (nFakeData - 1))}
                      />
                    );
                  })
                }
              </svg>
            </div>);
          }}
        </TransitionMotion>
      </div>
    </div>);
  }
}

d3ShapeComponent.propTypes = {
  app: PropTypes.object,
  refreshRandomData: PropTypes.func.isRequired,
  setObject: PropTypes.func.isRequired,
  springParamsStd: PropTypes.array,
};
