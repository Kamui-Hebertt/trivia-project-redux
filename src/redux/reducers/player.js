import { USER, UPDATE_SCORE, START_NEW_GAME } from '../action/index';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER: return {
    ...state,
    name: action.state.userName,
    gravatarEmail: action.state.userEmail,

  };
  case UPDATE_SCORE:
    return {
      ...state,
      assertions: state.assertions + 1,
      score: state.score + action.payload,
    };
  case START_NEW_GAME:
    return {
      ...state,
      score: 0,
    };
  default: return state;
  }
};

export default playerReducer;
