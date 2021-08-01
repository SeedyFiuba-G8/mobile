import type { ToggleSearchBarActionType } from '../actions/ToggleSearchBarAction';

type InterfaceState = {
    searchBarVisible: boolean;
};

const InterfaceReducer = (
    state = initialState,
    action: ToggleSearchBarActionType
): InterfaceState => {
    switch (action.type) {
        case 'TOGGLE_SEARCH_BAR':
            return {
                searchBarVisible: !state.searchBarVisible,
            };
        default:
            return state;
    }
};

const initialState = {
    searchBarVisible: false,
};

export default InterfaceReducer;
