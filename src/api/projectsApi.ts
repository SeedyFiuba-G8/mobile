import { apiProvider } from './utilities/provider';
import type { Response } from './utilities/provider';

import store from '../stores/MainStore';
import ReviewershipModal from '../components/Profile/ReviewershipModal';

export type Stage = {
    description: string;
    cost: number;
};

export type Project = {
    id: string;
    title: string;
    description: string;
    type: string;
    objective: string;
    country: string;
    city: string;
    publishedOn: string;
    finalizedBy: string;
    tags: Array<string>;
    status: string;
    stages: Array<Stage>;
    coverPicUrl?: string;
    totalFunded: number;
    currentStage: number;
    approvedStage: number;
    contributors: number;
    contributions: number;
    liked: boolean;
};

// Responses
type GetProjectsApiResponse = {
    projects: Array<Project>;
};

export type Reviewer = {
    email: string;
    firstName: string;
    lastName: string;
    reviewerId: string;
    status: string;
};

export type GetProjectApiResponse = Project & {
    userId: string;
    reviewers: Array<Reviewer>;
    likes: number;
};

type ProjectCreationApiResponse = {
    id: string;
};

type ProjectDeletionApiResponse = {
    id: string;
};

type ProjectEditionApiResponse = {
    id: string;
};

export type ReviewRequest = {
    projectId: string;
    userId: string;
    title: string;
    description: string;
    type: string;
    objective: string;
    country: string;
    city: string;
    publishedOn: string;
    finalizedBy: string;
    status: string;
    stages: Array<Stage>;
    coverPicUrl: string;
};

type ReviewRequestApiResponse = {
    requests: Array<ReviewRequest>;
};
// Payloads
type ProjectRequestPayload =
    | Record<string, never>
    | { userId: string }
    | { status?: string; type?: string }
    | { reviewerId: string };

type ProjectCreationRequestPayload = {
    title: string;
    description: string;
    type: string;
    objective: string;
    country: string;
    city: string;
    finalizedBy: string;
    tags: Array<string>;
    reviewers: Array<string>;
    stages: Array<Stage>;
    coverPicUrl?: string;
};

type ProjectEditionRequestPayload = {
    title: string;
    description: string;
    type: string;
    objective: string;
    country: string;
    city: string;
    finalizedBy: string;
    tags: Array<string>;
    reviewers: Array<string>;
    coverPicUrl?: string;
};

type ProjectPublishPayload = {
    status: string;
};

type ReviewershipReplyPayload = {
    status: string;
};

type FundProjectPayload = {
    amount: number;
};

type ProjectAdvancePayload = {
    lastCompletedStage: number;
};

const getAllProjects = async (
    status?: string,
    type?: string
): Promise<Response<GetProjectsApiResponse>> => {
    const authToken = store.getState().session.token;
    const apiResponse = apiProvider.get<
        GetProjectsApiResponse,
        ProjectRequestPayload
    >(
        'projects',
        { type: type, status: status },
        { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return apiResponse;
};

const getUserProjects = async (
    userId: string
): Promise<Response<GetProjectsApiResponse>> => {
    const authToken = store.getState().session.token;
    const apiResponse = apiProvider.get<
        GetProjectsApiResponse,
        ProjectRequestPayload
    >(
        'projects',
        { userId: userId },
        { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return apiResponse;
};

const getProject = async (
    id: string
): Promise<Response<GetProjectApiResponse>> => {
    const authToken = store.getState().session.token;
    const apiResponse = apiProvider.get<
        GetProjectApiResponse,
        ProjectRequestPayload
    >(
        `projects/${id}`,
        {},
        { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return apiResponse;
};

const createProject = async (
    title: string,
    description: string,
    type: string,
    objective: string,
    country: string,
    city: string,
    finalizedBy: string,
    tags: Array<string>,
    reviewers: Array<string>,
    stages: Array<Stage>,
    coverPicUrl?: string
): Promise<Response<ProjectCreationApiResponse>> => {
    const authToken = store.getState().session.token;
    const apiResponse = apiProvider.post<
        ProjectCreationApiResponse,
        ProjectCreationRequestPayload
    >(
        'projects',
        {
            title: title,
            description: description,
            type: type,
            objective: objective,
            country: country,
            city: city,
            finalizedBy: finalizedBy,
            tags: tags,
            reviewers: reviewers,
            coverPicUrl: coverPicUrl,
            stages: stages,
        },
        { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return apiResponse;
};

const updateProject = async (
    id: string,
    title: string,
    description: string,
    type: string,
    objective: string,
    country: string,
    city: string,
    finalizedBy: string,
    tags: Array<string>,
    reviewers: Array<string>,
    coverPicUrl?: string
): Promise<Response<ProjectEditionApiResponse>> => {
    const authToken = store.getState().session.token;
    const apiResponse = apiProvider.patch<
        ProjectEditionApiResponse,
        ProjectEditionRequestPayload
    >(
        `projects/${id}`,
        {
            title: title,
            description: description,
            type: type,
            objective: objective,
            country: country,
            city: city,
            finalizedBy: finalizedBy,
            tags: tags,
            reviewers: reviewers,
            coverPicUrl: coverPicUrl,
        },
        { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return apiResponse;
};

const publishProject = async (
    id: string
): Promise<Response<ProjectEditionApiResponse>> => {
    const authToken = store.getState().session.token;
    const apiResponse = apiProvider.patch<
        ProjectEditionApiResponse,
        ProjectPublishPayload
    >(
        `projects/${id}`,
        {
            status: 'FUNDING',
        },
        { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return apiResponse;
};

const deleteProject = async (
    id: string
): Promise<Response<ProjectDeletionApiResponse>> => {
    const authToken = store.getState().session.token;
    const apiResponse = apiProvider.del<ProjectDeletionApiResponse, null>(
        `projects/${id}`,
        null,
        {
            headers: { Authorization: `Bearer ${authToken}` },
        }
    );
    return apiResponse;
};

const getReviewRequests = async (): Promise<
    Response<ReviewRequestApiResponse>
> => {
    const authToken = store.getState().session.token;
    const userId = store.getState().session.id;
    const apiResponse = apiProvider.get<ReviewRequestApiResponse, null>(
        `reviewrequests/${userId}`,
        null,
        { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return apiResponse;
};

const acceptReviewRequest = async (
    projectId: string
): Promise<Response<null>> => {
    const authToken = store.getState().session.token;
    const userId = store.getState().session.id;
    const apiResponse = apiProvider.put<null, ReviewershipReplyPayload>(
        `reviewrequests/${userId}/${projectId}`,
        { status: 'ACCEPTED' },
        { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return apiResponse;
};

const rejectReviewRequest = async (
    projectId: string
): Promise<Response<null>> => {
    const authToken = store.getState().session.token;
    const userId = store.getState().session.id;
    const apiResponse = apiProvider.put<null, ReviewershipReplyPayload>(
        `reviewrequests/${userId}/${projectId}`,
        { status: 'REJECTED' },
        { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return apiResponse;
};

const getReviewingProjects = async (): Promise<
    Response<GetProjectsApiResponse>
> => {
    const authToken = store.getState().session.token;
    const myUserId = store.getState().session.id;
    const apiResponse = apiProvider.get<
        GetProjectsApiResponse,
        ProjectRequestPayload
    >(
        'projects',
        { reviewerId: myUserId },
        { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return apiResponse;
};

const fundProject = async (
    projectId: string,
    donation: number
): Promise<Response<null>> => {
    const authToken = store.getState().session.token;
    const apiResponse = apiProvider.post<null, FundProjectPayload>(
        `projects/${projectId}/funds`,
        {
            amount: donation,
        },
        { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return apiResponse;
};

const likeProject = async (projectId: string): Promise<Response<null>> => {
    const authToken = store.getState().session.token;
    const apiResponse = apiProvider.post<null, null>(
        `projects/${projectId}/like`,
        null,
        { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return apiResponse;
};

const dislikeProject = async (projectId: string): Promise<Response<null>> => {
    const authToken = store.getState().session.token;
    const apiResponse = apiProvider.del<null, null>(
        `projects/${projectId}/like`,
        null,
        { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return apiResponse;
};

const completeProjectStage = async (
    projectId: string,
    stage: number
): Promise<Response<ProjectEditionApiResponse>> => {
    const authToken = store.getState().session.token;
    const apiResponse = apiProvider.patch<
        ProjectEditionApiResponse,
        ProjectAdvancePayload
    >(
        `projects/${projectId}`,
        {
            lastCompletedStage: stage,
        },
        { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return apiResponse;
};

export {
    getAllProjects,
    getUserProjects,
    createProject,
    getProject,
    updateProject,
    deleteProject,
    getReviewRequests,
    acceptReviewRequest,
    rejectReviewRequest,
    publishProject,
    fundProject,
    getReviewingProjects,
    completeProjectStage,
    likeProject,
    dislikeProject,
};
