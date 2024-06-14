import {combineReducers} from 'redux';
import loadingReducer from './loadingReducer';
import puzzleReducer from './puzzleReducer';

const GlobalState = combineReducers({
  loading:loadingReducer,
  puzzle:puzzleReducer,
});

export default GlobalState;