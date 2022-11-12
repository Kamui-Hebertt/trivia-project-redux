import { GAME_DIFFICULTY } from '../action';

const INITIAL_STATE = {
  level: '',
};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GAME_DIFFICULTY:
    return {
      ...state,
      level: action.payload,
    };
  default: return state;
  }
};

export default triviaReducer;
