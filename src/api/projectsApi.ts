import { apiProvider } from './utilities/provider';
import store from '../stores/MainStore';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

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
};

type GetProjectsApiResponse = {
    projects: Array<Project>;
};

type ProjectCreationApiResponse = {
    id: string;
};
type ProjectRequestPayload = Record<string, never> | { userId: string };

type ProjectCreationResult =
    | {
          successful: true;
          id: string;
      }
    | { successful: false };

type ProjectCreationRequestPayload = {
    title: string;
    description: string;
    type: string;
    objective: string;
    country: string;
    city: string;
    finalizedBy: string;
};

type ProjectEditionResult =
    | { successful: true }
    | { successful: false; errorMessage: string };

const getAllProjects = async (): Promise<GetProjectsApiResponse> => {
    const authToken = store.getState().session.token;
    try {
        const apiResponse = apiProvider.get<
            GetProjectsApiResponse,
            ProjectRequestPayload
        >(
            'projects',
            {},
            { headers: { Authorization: `Bearer ${authToken}` } }
        );
        return apiResponse;
    } catch (error) {
        console.log(error.response);
        return { projects: [] };
    }
};

const getUserProjects = async (id: string): Promise<GetProjectsApiResponse> => {
    const authToken = store.getState().session.token;
    try {
        const apiResponse = apiProvider.get<
            GetProjectsApiResponse,
            ProjectRequestPayload
        >(
            'projects',
            { userId: id },
            { headers: { Authorization: `Bearer ${authToken}` } }
        );
        return apiResponse;
    } catch (error) {
        console.log(error.response);
        return { projects: [] };
    }
};

const getProject = async (id: string): Promise<Project> => {
    const authToken = store.getState().session.token;
    const apiResponse = apiProvider.get<Project, ProjectRequestPayload>(
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
    finalizedBy: string
): Promise<ProjectCreationResult> => {
    const authToken = store.getState().session.token;
    try {
        const apiResponse = await apiProvider.post<
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
            },
            { headers: { Authorization: `Bearer ${authToken}` } }
        );
        return { successful: true, id: apiResponse.id };
    } catch (error) {
        console.log(error.response);
        return { successful: false };
    }
};

const updateProject = async (
    id: string,
    title: string,
    description: string,
    type: string,
    objective: string,
    country: string,
    city: string,
    finalizedBy: string
): Promise<ProjectEditionResult> => {
    const authToken = store.getState().session.token;
    try {
        const apiResponse = await apiProvider.patch<
            ProjectCreationApiResponse,
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
            },
            { headers: { Authorization: `Bearer ${authToken}` } }
        );
        return { successful: true };
    } catch (error) {
        console.log(error.response);
        return { successful: false, errorMessage: error.response };
    }
};

const deleteProject = async (id: string): Promise<ProjectEditionResult> => {
    const authToken = store.getState().session.token;
    try {
        const apiResponse = apiProvider.del<Project, null>(
            `projects/${id}`,
            null,
            { headers: { Authorization: `Bearer ${authToken}` } }
        );
        return { successful: true };
    } catch (error) {
        console.log(error.response);
        return { successful: false, errorMessage: error.response };
    }
};
export {
    getAllProjects,
    getUserProjects,
    createProject,
    getProject,
    updateProject,
    deleteProject,
};
