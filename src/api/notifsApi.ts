import store from '../stores/MainStore';
import type { Response } from './utilities/provider';
import { apiProvider } from './utilities/provider';

type MessageNotificationPayload = {
    message: string;
};

const notifyMessage = async (
    message: string,
    userId: string
): Promise<Response<null>> => {
    const authToken = store.getState().session.token;
    const apiResponse = apiProvider.post<null, MessageNotificationPayload>(
        `users/${userId}/message`,
        {
            message: message,
        },
        { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return apiResponse;
};

export { notifyMessage };
