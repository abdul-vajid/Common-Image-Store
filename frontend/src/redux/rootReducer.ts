import { combineReducers } from 'redux';
import userSlice from './reducers/userSlice';



const rootReducer = combineReducers({
    userReducer: userSlice
});

export default rootReducer;