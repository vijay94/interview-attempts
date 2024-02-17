import { useContext } from "react";
import { FaCheck, FaPencil } from "react-icons/fa6";
import { ImBin } from "react-icons/im";

import { USER_EVENTS } from "../../reducers/user.reducer";
import { UserContext } from "../../providers/user.provider";

import "./style.scss";

const UserActions = ({ id }) => {
    const [state, dispatch] = useContext(UserContext);

    const onUserDelete = () => {
        dispatch({ type: USER_EVENTS.DELETE_USER, payload: id });
    };

    const onUserEdit = () => {
        dispatch({ type: USER_EVENTS.EDIT_USER, payload: id });
    };

    const onUserSave = () => {
        dispatch({ type: USER_EVENTS.SAVE_EDITED_USER, payload: id });
    };

    return (
        <div className="btn-container">
            {
                state.currentEditingUser.has(id)
                ? (<button className="btn btn-success save" onClick={onUserSave}>
                    <FaCheck />
                </button>)
                : (<button className="btn btn-primary edit" onClick={onUserEdit}>
                    <FaPencil />
                </button>)
            }
            <button className="btn btn-danger delete" onClick={onUserDelete}>
                <ImBin />
            </button>
        </div>
    );
};



export default UserActions;