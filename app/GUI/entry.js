/* global ga, __PRODUCTION__ */

import React, { PropTypes, Component } from 'react';

import { Link } from 'react-router';
import { Button, ButtonGroup } from 'react-bootstrap';

export default class EntryComponent extends Component {
  componentDidMount() {
    if (document.location.hostname !== 'localhost') {
      ga('send', 'pageview', '/d3v4');
    }
  }

  render() {
    let myPath = this.props.location.pathname.substr(1);
    let pathname = '/';
    if (__PRODUCTION__) {
      pathname = '/d3v4/';
      myPath = this.props.location.pathname.substr(6);
    }
    const btns = [];
    const lnks = ['Home', 'D3ShapeOnly', 'D3Layout', 'Motion'];
    lnks.map(l => {
      const lnk = (l === 'Home' ? '' : l.toLowerCase());
      const style = (lnk === myPath ? 'primary' : 'default');

      btns.push(
        <Button
          key={'b' + l}
          bsSize={'xsmall'}
          bsStyle={style}
        >
          <Link
            style={{ color: 'inherit' }}
            to={pathname + lnk}>
            {l}
          </Link>
        </Button>
      );
    });

    return (
      <div>
        <h1>Experiments with d3 v4 & react</h1>
        Examples: <ButtonGroup>
        {btns}
      </ButtonGroup>
        <hr/>
        {this.props.children}
      </div>
    );
  }
}

EntryComponent.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
};
