import {
  SET_RAW,
  SET_OBJECT,
  REFRESH_RANDOM_DATA,
} from '../constants/ActionTypes';

const n = 5;
const rand = () => Math.random() * 100;
const createFakeData = () => {
  return Array.from({ length: n }, () => {
    return {
      x: rand(),
      y: rand(),
    };
  });
};

const initialState = {
  nFakeData: n,
  someItem: 'foo',
  fakeData: createFakeData(),
  pathType: 'cardinal',
  raw: [],
};

export default function coreReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RAW:
      return state;
    case SET_OBJECT:
      return Object.assign({}, state, action.object);
    case REFRESH_RANDOM_DATA:
      const fakeData = createFakeData();
      return Object.assign({}, state, { fakeData });
    default:
      return state;
  }
}
