import {
  SET_RAW,
  SET_FILTER,
  REFRESH_RANDOM_DATA,
} from '../constants/ActionTypes';

const initialState = {
  someItem: 'foo',
  fakeData: [],
  raw: [],
};

const rand = () => Math.random() * 100;

export default function coreReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RAW:
      return state;
    case SET_FILTER:
      return state;
    case REFRESH_RANDOM_DATA:
      const n = Math.floor(Math.random() * 10) + 2;
      const fakeData = Array.from({ length: n }, () => {
        return {
          x: rand(),
          y: rand(),
        };
      });
      return Object.assign({}, state, { fakeData });
    default:
      return state;
  }
}
