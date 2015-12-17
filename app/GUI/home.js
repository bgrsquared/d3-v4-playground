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
        <li>Github: TODO</li>
        <li>Medium Blog: TODO</li>
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
        <li>A very simple plain vanilla example using d3-shape (static) TODO</li>
        <li>An example using d3-layout TODO</li>
        <li><Link to={'/motion'}>An animated example</Link></li>
      </ul>
    </div>
  );
};