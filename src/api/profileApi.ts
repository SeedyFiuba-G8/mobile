import { apiProvider } from './utilities/provider';
import type { Response } from './utilities/provider';

import store from '../stores/MainStore';

export type Profile = {
    firstName: string;
    lastName: string;
    banned: boolean;
    signupDate: string;
    profilePicUrl?: string;
    country: string;
    city: string;
    interests: Array<string>;
    address?: string;
    balance?: number;
};

export type Donation = {
    userId: string;
    txHash: string;
    projectId: string;
    amount: number;
    date: string;
    status: string;
    title: string;
    type: string;
};

// Resposes
type GetProfileApiRespose = Profile;

type GetDonationHistoryApiResponse = Array<Donation>;

// Payload
export type UpdateProfilePayload = {
    city?: string;
    country?: string;
    interests?: string[];
    profilePicUrl?: string;
};

type TransferFundsPayload = {
    amount: number;
};

const getProfile = async (
    userId: string
): Promise<Response<GetProfileApiRespose>> => {
    const authToken = store.getState().session.token;
    const apiResponse = apiProvider.get<GetProfileApiRespose, null>(
        `users/${userId}`,
        null,
        { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return apiResponse;
};

const updateProfile = async (
    userId: string,
    payload: UpdateProfilePayload
): Promise<Response<null>> => {
    const authToken = store.getState().session.token;

    const apiResponse = apiProvider.patch<null, UpdateProfilePayload>(
        `users/${userId}`,
        payload,
        { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return apiResponse;
};

const getDonationHistory = async (
    userId: string
): Promise<Response<GetDonationHistoryApiResponse>> => {
    const authToken = store.getState().session.token;
    const apiResponse = apiProvider.get<GetDonationHistoryApiResponse, null>(
        `users/${userId}/fundings`,
        null,
        { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return apiResponse;
};

const withdrawFunds = async (
    amount: number,
    walletAddress: string
): Promise<Response<null>> => {
    const authToken = store.getState().session.token;
    const apiResponse = apiProvider.post<null, TransferFundsPayload>(
        `wallets/${walletAddress}/funds`,
        { amount: amount },
        { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return apiResponse;
};

export { getProfile, updateProfile, withdrawFunds, getDonationHistory };
