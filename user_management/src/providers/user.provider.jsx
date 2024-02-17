import { createContext, useReducer } from "react";
import { INITIAL_STATE, userReducer } from "../reducers/user.reducer";

export const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
    
    return (
        <UserContext.Provider value={[ state, dispatch ]}>
            { children }
        </UserContext.Provider>
    );
};

export default UserProvider;