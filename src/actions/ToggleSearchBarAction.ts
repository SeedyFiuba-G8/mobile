export type ToggleSearchBarActionType = {
    type: string;
};

export const updateBalanceAction = (): ToggleSearchBarActionType => {
    return {
        type: 'TOGGLE_SEARCH_BAR',
    };
};

export default updateBalanceAction;
