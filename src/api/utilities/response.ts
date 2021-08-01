import { AxiosError, AxiosResponse } from 'axios';
import {
    LoggingInFlowState,
    updateLoginStatusAction,
} from '../../actions/UpdateLoginStatusAction';
import { clearSessionData } from '../../session/SessionUtil';
import store from '../../stores/MainStore';

export function handleResponse<T>(response: AxiosResponse): T {
    // Generic http request response processing should be done here (or logging).
    return response.data;
}

export async function handleError(
    error: AxiosError,
    skipTokenCheck: boolean
): Promise<void> {
    // Generic http request response error processing should be done here (or logging).
    console.log(error.response);
    if (error.response?.data?.status === 401 && !skipTokenCheck) {
        await clearSessionData();
        store.dispatch(updateLoginStatusAction(LoggingInFlowState.NotLoggedIn));
    }
}
