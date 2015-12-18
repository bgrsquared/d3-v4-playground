import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { bindActionCreators } from 'redux';
import * as RawActions from '../../actions/RawActions';

import D3ShapeOnlyComponent from './d3ShapeOnlyComponent';

function mapStateToProps(state) {
  return {
    router: state.router,
    app: state.app,
  };
}

function mapDispatchToProps(dispatch) {
  const allActions = Object.assign({},
    bindActionCreators(RawActions, dispatch), { dispatch }, { pushState });
  return allActions;
}

export default connect(mapStateToProps,
  mapDispatchToProps)(D3ShapeOnlyComponent);
