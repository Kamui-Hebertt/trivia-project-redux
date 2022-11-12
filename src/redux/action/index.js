export const USER = 'USER';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const START_NEW_GAME = 'START_NEW_GAME';

export const userInfo = (state) => ({
  type: USER,
  state,
});

export const updateScore = (payload) => ({
  type: UPDATE_SCORE,
  payload,
});

export const newGame = () => ({
  type: START_NEW_GAME,
});
