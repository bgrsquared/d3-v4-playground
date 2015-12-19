/* global __DEVTOOLS__ */

// BASICS
require('react-bootstrap');
require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('./styles/myStyles.scss');
require('../node_modules/font-awesome/css/font-awesome.min.css');

// CORE
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';

import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import { createHistory } from 'history';
import { Route, IndexRoute } from 'react-router';
import { devTools } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import coreReducer from './reducers/coreReducer';

import MotionContainer from './GUI/withReactMotion/motionContainer';
import D3ShapeContainer from './GUI/d3ShapeOnly/d3ShapeOnlyContainer';
import D3LayoutContainer from './GUI/d3Layout/d3LayoutContainer';
import EntryComponent from './GUI/entry';
import { HomeComponent } from './GUI/home';

// Configure routes like normal
const routes = (
  <Route path="/" component={EntryComponent}>
    <IndexRoute component={HomeComponent}/>
    <Route path="motion" component={MotionContainer}/>
    <Route path="d3shapeonly" component={D3ShapeContainer}/>
    <Route path="d3layout" component={D3LayoutContainer}/>
    <Route path="d3v4">
      <IndexRoute component={HomeComponent}/>
      <Route path="motion" component={MotionContainer}/>
      <Route path="d3shapeonly" component={D3ShapeContainer}/>
      <Route path="d3layout" component={D3LayoutContainer}/>
    </Route>
  </Route>
);

const reducer = combineReducers({
  router: routerStateReducer,
  app: coreReducer,
});

// Compose reduxReactRouter with other store enhancers
const store = compose(
  applyMiddleware(/* m1, m2, m3 */),
  reduxReactRouter({
    routes,
    createHistory,
  }),
  devTools()
)(createStore)(reducer);

class Root extends Component {
  constructor() {
    super();
    this.state = {
      showDebug: false,
    };
  }

  render() {
    const { showDebug } = this.state;
    const debug = [];
    const debugButton = [];
    if (__DEVTOOLS__) {
      debugButton.push(<Button
        bsSize={'small'}
        bsStyle={'danger'}
        key={'dbgBtn'}
        onClick={() => {this.setState({ showDebug: !showDebug }); }}
      >Debug
      </Button>);
      debugButton.push(<hr key={'hr'}/>);
      if (showDebug) {
        debug.push(
          <DebugPanel bottom right top key={'dbgPnl'}>
            <DevTools monitor={LogMonitor} store={store}/>
          </DebugPanel>
        );
      }
    }

    return (
      <div>
        {debugButton}
        <Provider store={store}>
          <ReduxRouter />
        </Provider>
        {debug}
      </div>
    );
  }
}


ReactDOM.render(<Root />, document.getElementById('app'));

// Elsewhere, in a component module...
/*
 import { connect } from 'react-redux';
 import { pushState } from 'redux-router';

 connect(
 state => ({ q: state.router.location.query.q }),

 { pushState }
 )(SearchBox);
 */
