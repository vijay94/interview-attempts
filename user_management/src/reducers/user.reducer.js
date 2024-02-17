export const INITIAL_STATE = {
    users: [],
    usersToShow: [],
    currentEditingUser: new Set(),
    pagination: {
        currentPage: 1,
        pageSize: 10,
    },
    currentSearch: "",
    selectedUsers: new Set(),
    isSelectAllChecked: false,
};

export const USER_EVENTS = {
    LOAD_USERS: "LOAD_USERS",
    DELETE_USER: "DELETE_USER",
    EDIT_USER: "EDIT_USER",
    SEARCH_USERS: "SEARCH_USERS",
    PAGINATE_USERS: "PAGINATE_USERS",
    SAVE_EDITED_USER: "SAVE_EDITED_USER",
    ON_EDIT_USER: "ON_EDIT_USER",
    SELECT_ALL_USERS: "SELECT_ALL_USERS",
    SELECT_USER: "SELECT_USER",
    DELETE_SELECTED_USERS: "DELETE_SELECTED_USERS"
};

//TODO refactor this
export const userReducer = (state, action) => {
    switch (action.type) {
        case USER_EVENTS.LOAD_USERS:
            return {
                ...state,
                users: action.payload,
                usersToShow: action.payload
            };
        case USER_EVENTS.DELETE_USER:
            const users = state.users.filter(user => user.id !== action.payload);
            return {
                ...state,
                users: users,
                usersToShow: users
            };
        case USER_EVENTS.SEARCH_USERS: 
            return {
                ...state,
                usersToShow: state.users.filter(user => `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(action.payload.toLowerCase())),
                currentSearch: action.payload
            };
        case USER_EVENTS.EDIT_USER:
            state.currentEditingUser.add(action.payload);
            return {
                ...state,
                currentEditingUser: new Set([...state.currentEditingUser]),
            };
        case USER_EVENTS.SAVE_EDITED_USER:
            state.currentEditingUser.delete(action.payload);
            return {
                ...state,
                currentEditingUser: new Set([...state.currentEditingUser]),
            };
        case USER_EVENTS.ON_EDIT_USER:
            const editedUser = state.users.find(user => user.id === action.payload.id);
            editedUser[action.payload.fieldName] = action.payload.value;
            return {
                ...state,
                users: state.users.map(user => user.id === action.payload.id ? editedUser : user),
                usersToShow: state.usersToShow.map(user => user.id === action.payload.id ? editedUser : user),
            };
        case USER_EVENTS.PAGINATE_USERS:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    currentPage: action.payload
                },
                usersToShow: state.users.filter(user => `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(state.currentSearch.toLowerCase()))
            };

        case USER_EVENTS.SELECT_ALL_USERS:
            if (!action.payload.checked) {
                return {
                    ...state,
                    isSelectAllChecked: false,
                    selectedUsers: new Set(),
                };
            }
            const selectedUsers = state.usersToShow
                .slice((state.pagination.currentPage - 1) * state.pagination.pageSize, state.pagination.currentPage * state.pagination.pageSize)
                .map(user => user.id);
            return {
                ...state,
                isSelectAllChecked: true,
                selectedUsers: new Set(selectedUsers),
            };
        case USER_EVENTS.SELECT_USER:
            if (!action.payload.checked) {
                state.selectedUsers.delete(action.payload.id);
            } else {
                state.selectedUsers.add(action.payload.id);
            }
            return {
                ...state,
                selectedUsers: new Set(state.selectedUsers),
            };

        case USER_EVENTS.DELETE_SELECTED_USERS:
            const usersAfterDelete = state.users.filter(user => !state.selectedUsers.has(user.id));
            return {
                ...state,
                users: usersAfterDelete,
                usersToShow: usersAfterDelete,
                selectedUsers: new Set(),
                isSelectAllChecked: false,
            };
        default:
            return state;
    }
};