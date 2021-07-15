import { apiProvider } from './utilities/provider';
import type { Response } from './utilities/provider';

import store from '../stores/MainStore';
import ReviewershipModal from '../components/Profile/ReviewershipModal';

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
};

type ReviewRequestApiResponse = {
    requests: Array<ReviewRequest>;
};
// Payloads
type ProjectRequestPayload = Record<string, never> | { userId: string };

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
};

type ProjectPublishPayload = {
    status: string;
};

type ReviewershipReplyPayload = {
    status: string;
};

const getAllProjects = async (): Promise<Response<GetProjectsApiResponse>> => {
    const authToken = store.getState().session.token;
    const apiResponse = apiProvider.get<
        GetProjectsApiResponse,
        ProjectRequestPayload
    >('projects', {}, { headers: { Authorization: `Bearer ${authToken}` } });
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
    reviewers: Array<string>
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
    reviewers: Array<string>
): Promise<Response<ProjectEditionApiResponse>> => {
    const authToken = store.getState().session.token;
    const apiResponse = apiProvider.patch<
        ProjectEditionApiResponse,
        ProjectCreationRequestPayload
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
};
