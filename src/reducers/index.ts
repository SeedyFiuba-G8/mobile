import { combineReducers } from 'redux';
import loginReducer from './LoginReducer';
import ProfileReducer from './ProfileReducer';
import sessionReducer from './SessionReducer';
import balanceReducer from './BalanceReducer';
import InterfaceReducer from './InterfaceReducer';

const rootReducer = combineReducers({
    login: loginReducer,
    session: sessionReducer,
    profile: ProfileReducer,
    balance: balanceReducer,
    interface: InterfaceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
