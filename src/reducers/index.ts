import { combineReducers } from 'redux';
import loginReducer from './LoginReducer';
import sessionReducer from './SessionReducer';

const rootReducer = combineReducers({
    login: loginReducer,
    session: sessionReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
