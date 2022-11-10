import { SUCESS_REQUEST } from '../action/fetch';

const INITIAL_STATE = {
  questions: {},
};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUCESS_REQUEST:
    return {
      ...state,
      questions: action.payload,
    };
  default: return state;
  }
};

export default triviaReducer;
