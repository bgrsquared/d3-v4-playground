import * as types from '../constants/ActionTypes';

import fetch from 'isomorphic-fetch';

const rawData = './data/sample.json';

export function refreshRandomData() {
  return {
    type: types.REFRESH_RANDOM_DATA,
  };
}

export function setObject(object) {
  return {
    type: types.SET_OBJECT,
    object,
  };
}

export function setRaw(raw) {
  return {
    type: types.SET_RAW,
    raw,
  };
}

export function getRaw() {
  return dispatch => {
    return fetch(rawData)
      .then(response => response.json())
      .then(json => {
        return dispatch(setRaw(json));
      });
  };
}
