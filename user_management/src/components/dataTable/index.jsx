import { useState } from "react";
import { PropTypes } from "prop-types";

import Table from "../table";

import "./style.scss";

const DataTable = ({ columns, onSearch }) => {
    const [search, setSearch] = useState('');

    const handleSearch = (event) => {
        setSearch(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <div className="data-table-container">
            <div className="search-wrapper">
                <input className="search" type="text" value={search} onChange={handleSearch} placeholder="Search by name, email or role" />
            </div>
            <Table columns={columns} />
        </div>
    );
};

DataTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        renderer: PropTypes.func,
    })).isRequired,
    onSearch: PropTypes.func.isRequired,
};

export default DataTable;