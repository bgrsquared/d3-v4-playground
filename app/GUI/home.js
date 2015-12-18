import React from 'react';

import { Link } from 'react-router';

export const HomeComponent = () => {
  return (
    <div>
      <h3>What's this?</h3>
      <p>This repo/blog/... has essentially started as my own playground
        to test out the new d3 version4 in react.</p>
      <p>As I published a few first samples here and there, I was asked to
        provide the respective codes. Here we are:</p>
      <ul>
        <li>
          <a href={'https://github.com/bgrsquared/d3-v4-playground'}
             target={'_blank'}>
            <i className={'fa fa-github'}></i>
            {' Github'}
          </a>
        </li>
        <li>
          <a href={'#'}
             target={'_blank'}>
            <i className={'fa fa-medium'}></i>
            {' Medium blog post'}
          </a>
        </li>
      </ul>
      <p>If you have any feedback or just don't want to miss updates, find me here:</p>
      <a href={'https://twitter.com/ilikepiecharts'}
         target={'_blank'}>
        <i className={'fa fa-twitter'}></i>
        {' @ilikepiecharts'}
      </a>
      <h3>A word on the examples</h3>
      <p>Currently we have the following examples:</p>
      <ul>
        <li>
          <Link to={'/d3shapeonly'}>
            A very simple plain vanilla example using d3-shape (static)
          </Link>
        </li>
        <li>
          <Link to={'/d3layout'}>An example using d3-layouts from d3-v3</Link>
        </li>
        <li>
          <Link to={'/motion'}>An animated example</Link>
        </li>
      </ul>
    </div>
  );
};
