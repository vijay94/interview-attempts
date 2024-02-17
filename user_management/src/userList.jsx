import { useContext, useEffect } from 'react'


import { getUsers } from './services/user.service';

import DataTable from './components/dataTable';
import { UserContext } from './providers/user.provider';
import { USER_EVENTS } from './reducers/user.reducer';
import UserActions from './partials/userActions';
import Pagination from './components/pagination';

const columns = [
    {
        title: 'Name',
        name: 'name',
    },
    {
        title: 'Email',
        name: 'email',
    },
    {
        title: 'Role',
        name: 'role',
    },
    {
        title: 'Status',
        name: 'status',
        renderer: ({ id }) => (<UserActions id={id} />)
    },
];

const App = () => {
    const [state, dispatch] = useContext(UserContext);

    const onSearch = (value) => {
        dispatch({ type: USER_EVENTS.SEARCH_USERS, payload: value });
    };

    const fetchUsers = () => {
        getUsers()
            .then(({ data }) => {
                dispatch({ type: USER_EVENTS.LOAD_USERS, payload: data });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deleteSelected = () => {
        dispatch({ type: USER_EVENTS.DELETE_SELECTED_USERS });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="container">
            <DataTable
                columns={columns}
                onSearch={onSearch}
            />
            <div className="pagination-container">
                <button className="btn btn-delete" onClick={deleteSelected}>Delete Selected</button>
                <Pagination
                    total={state.usersToShow.length}
                    pageSize={state.pagination.pageSize}
                    currentPage={state.pagination.currentPage}
                    handlePageChange={(page) => dispatch({ type: USER_EVENTS.PAGINATE_USERS, payload: page })}
                />
            </div>
        </div>
    );
}

export default App
