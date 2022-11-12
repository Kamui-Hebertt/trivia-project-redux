export const USER = 'USER';
export const UPDATE_SCORE = 'UPDATE_SCORE';

export const userInfo = (state) => ({
  type: USER,
  state,
});

export const updateScore = (payload) => ({
  type: UPDATE_SCORE,
  payload,
});
