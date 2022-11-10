import USER from '../action/index';

const INITIAL_STATE = {
  name: '',
  assertions: '',
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
  default: return state;
  }
};

export default playerReducer;
