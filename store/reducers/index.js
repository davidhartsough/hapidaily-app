import { combineReducers } from 'redux';
import goals from './goals';
import impacts from './impacts';
import people from './people';

export default combineReducers({
  goals,
  impacts,
  people
});
