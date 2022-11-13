import { combineReducers } from 'redux';
import player from './player';
import trivia from './trivia';

const rootReducer = combineReducers({
  player,
  trivia,
});

export default rootReducer;
