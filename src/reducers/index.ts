import { combineReducers } from 'redux';
import loginReducer from './LoginReducer';
import ProfileReducer from './ProfileReducer';
import sessionReducer from './SessionReducer';

const rootReducer = combineReducers({
    login: loginReducer,
    session: sessionReducer,
    profile: ProfileReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
