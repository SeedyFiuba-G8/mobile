export type ToggleSearchBarActionType = {
    type: string;
};

export const toggleSearchBarAction = (): ToggleSearchBarActionType => {
    return {
        type: 'TOGGLE_SEARCH_BAR',
    };
};

export default toggleSearchBarAction;
