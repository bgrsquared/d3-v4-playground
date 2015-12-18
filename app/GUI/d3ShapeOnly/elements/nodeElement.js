import React, { Component, PropTypes } from 'react';

export default class NodeElement extends Component {
  shouldComponentUpdate(nextProps) {
    return (nextProps.classy !== 'node' ||
    this.props.classy !== 'node' ||
    this.props.rotationPlus !== nextProps.rotationPlus);
  }

  render() {
    const { n, onMouseOver, onMouseOut, classy, rotationPlus } = this.props;

    return (<text
      className={classy}
      transform={'rotate(' + (n.x + rotationPlus - 90) + ')translate(' +
                 (n.y + 8) + ',0)' + ((n.x + rotationPlus) % 360 < 180 ? '' : 'rotate(180)')}
      dy={'.31em'}
      textAnchor={(n.x + rotationPlus) % 360 < 180 ? 'start' : 'end'}
      onMouseOver={() => onMouseOver({ activeNode: n.name })}
      onMouseOut={() => onMouseOut({ activeNode: '' })}
    >
      {n.key}
    </text>);
  }
}

NodeElement.propTypes = {
  classy: PropTypes.string,
  n: PropTypes.object,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  rotationPlus: PropTypes.number,
};
