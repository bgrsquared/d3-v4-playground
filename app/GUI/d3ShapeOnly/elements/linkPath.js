import React, { Component, PropTypes } from 'react';

export default class LinkPath extends Component {
  shouldComponentUpdate(nextProps) {
    return (nextProps.classy !== 'link' ||
    this.props.classy !== 'link' || this.props.tension !== nextProps.tension);
  }

  render() {
    const { l, lineGenerator, classy } = this.props;
    return (<path
      className={classy}
      d={lineGenerator(l)}/>);
  }
}

LinkPath.propTypes = {
  classy: PropTypes.string,
  l: PropTypes.array,
  lineGenerator: PropTypes.func,
  tension: PropTypes.number,
};
