import { apiProvider } from './utilities/provider';
import type { Response } from './utilities/provider';

import store from '../stores/MainStore';

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
};

// Responses
type GetProjectsApiResponse = {
    projects: Array<Project>;
};

export type GetProjectApiResponse = Project & {
    userId: string;
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
    tags: Array<string>
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
    tags: Array<string>
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

export {
    getAllProjects,
    getUserProjects,
    createProject,
    getProject,
    updateProject,
    deleteProject,
};
