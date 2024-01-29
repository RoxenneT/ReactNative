import { combineReducers } from 'redux';
import userReducer from './userReducer';
import hotelsReducer from './hotelsReduser';
// import reviewReducer from './reviewReducer';

const rootReducer = combineReducers({
  user: userReducer,
  hotels: hotelsReducer,
  // reviews: reviewReducer,
});

export default rootReducer;
