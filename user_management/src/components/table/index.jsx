import { useContext } from "react";
import { PropTypes } from "prop-types";

import { UserContext } from "../../providers/user.provider";
import { USER_EVENTS } from "../../reducers/user.reducer";

import "./style.scss";
import Input from "../Input";

const Table = ({ columns }) => {
    const [state, dispatch] = useContext(UserContext);
    const { pagination, usersToShow, currentEditingUser, selectedUsers, isSelectAllChecked } = state;
    const users = usersToShow.slice((pagination.currentPage - 1) * pagination.pageSize, pagination.currentPage * pagination.pageSize);

    const onSelect = ({ selectAll = false, data = {}, event }) => {
        if (selectAll) {
            dispatch({ type: USER_EVENTS.SELECT_ALL_USERS, payload: { checked: event.target.checked } });
            return;
        }
        dispatch({ type: USER_EVENTS.SELECT_USER, payload: { ...data, checked: event.target.checked } });
    };

    const onValueChange = (id, fieldName, value) => {
        dispatch({ type: USER_EVENTS.ON_EDIT_USER, payload: { id, fieldName, value } });
    };

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <td>
                            <input type="checkbox" checked={isSelectAllChecked} onChange={(event) => onSelect({ selectAll: true, event })} />
                        </td>
                       {
                            columns.map((column, index) => {
                                return (
                                    <th key={`${column.name}-${index}`}>{column.title}</th>
                                )
                            })
                       } 
                    </tr>
                </thead>
                <tbody>
                    {
                        users.length > 0 ? users.map((item, index) => {
                            return (
                                <tr key={index} className={selectedUsers.has(item.id) && "selected"}>
                                    <td>
                                        <input type="checkbox" checked={selectedUsers.has(item.id)} onChange={(event) => onSelect({ data: item, event })} />
                                    </td>
                                    {
                                       columns.map((column) => (
                                            <td key={`${column.name}-${index}`}>
                                                {
                                                    column.renderer ? column.renderer(item) : 
                                                    currentEditingUser.has(item.id)
                                                    ? (<Input defaultValue={item[column.name]} onBlur={({ target: { value } }) => onValueChange(item.id, column.name, value)}  />)
                                                    : item[column.name]
                                                }
                                            </td>
                                        ))
                                    }
                                </tr>
                            )
                        })
                        :   (<tr>
                                <td colSpan={columns.length + 1}>
                                    <span className="no-data-found">No data found</span>
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
};

Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        renderer: PropTypes.func,
    })).isRequired,
};


export default Table;