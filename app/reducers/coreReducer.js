import {
  SET_RAW,
  SET_OBJECT,
  REFRESH_RANDOM_DATA,
} from '../constants/ActionTypes';


const rand = () => Math.random() * 100;
const createFakeData = (n) => {
  return Array.from({ length: n }, () => {
    return {
      x: rand(),
      y: rand(),
    };
  });
};

const initN = 5;
const initialState = {
  nFakeData: initN,
  someItem: 'foo',
  fakeData: createFakeData(initN),
  pathType: false,
  raw: [],
  springParamsStd: [170, 26],
};

export default function coreReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RAW:
      return state;
    case SET_OBJECT:
      if (action.object.nFakeData) {
        if (action.object.nFakeData < state.nFakeData) {
          return Object.assign({}, state, action.object,
            { fakeData: state.fakeData.splice(0, action.object.nFakeData) });
        }
        return Object.assign({}, state, action.object,
          {
            fakeData: state.fakeData
              .concat(createFakeData(action.object.nFakeData - state.nFakeData)),
          });
      }
      return Object.assign({}, state, action.object);
    case REFRESH_RANDOM_DATA:
      const fakeData = createFakeData(state.nFakeData);
      return Object.assign({}, state, { fakeData });
    default:
      return state;
  }
}
