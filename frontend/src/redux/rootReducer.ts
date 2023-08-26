import { combineReducers } from 'redux';
import userSlice from './reducers/userSlice';
import storeSlice from './reducers/storeSlice';



const rootReducer = combineReducers({
    userReducer: userSlice,
    storeReducer: storeSlice
});

export default rootReducer;