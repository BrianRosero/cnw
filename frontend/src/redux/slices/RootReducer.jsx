import { combineReducers } from 'redux';

// rootReducer import
import customizationSlice from './CustomizationSlice.jsx';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {register, login, logout } from '../../actions/auth.jsx';
import auth from "../../reducers/auth";
import message from "../../reducers/message";

// ==============================|| COMBINE REDUCER ||============================== //

const rootReducer = combineReducers({
    account: persistReducer(
        {
            key: 'account',
            storage,
            keyPrefix: 'berry-'
        },
        register, login, logout
    ),
    auth,
    message,
    customization: customizationSlice
});

export default rootReducer;
