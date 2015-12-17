import React, { PropTypes } from 'react';

import { Link } from 'react-router';
import { Button, ButtonGroup } from 'react-bootstrap';

export const EntryComponent = (props) => {
  const myPath = props.location.pathname.substr(1);
  const btns = [];
  const lnks = ['Motion', 'Home'];
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
          to={'/' + lnk}>
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
      {props.children}
    </div>
  );
};

EntryComponent.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
};
