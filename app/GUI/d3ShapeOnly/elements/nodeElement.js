import React, { Component, PropTypes } from 'react';

export default class NodeElement extends Component {
  shouldComponentUpdate(nextProps) {
    return (nextProps.classy !== 'node' || this.props.classy !== 'node');
  }

  render() {
    const { n, onMouseOver, onMouseOut, classy } = this.props;
    return (<text

      className={classy}
      transform={'rotate(' + (n.x - 90) + ')translate(' +
                 (n.y + 8) + ',0)' + (n.x < 180 ? '' : 'rotate(180)')}
      dy={'.31em'}
      textAnchor={n.x < 180 ? 'start' : 'end'}
      onMouseOver={() => onMouseOver({ activeNode: n.name })}
      onMouseOut={() => onMouseOut({ activeNode: '' })}
    >
      {n.key}
    </text>);
  }
}

NodeElement.propTypes = {
  classy: PropTypes.string,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  n: PropTypes.object,
};
