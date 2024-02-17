import { useEffect, useState } from "react";
import { LuChevronsLeft, LuChevronsRight, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { PropTypes } from "prop-types";

import "./style.scss";

const Pagination = ({ currentPage, pageSize, total, handlePageChange, maxToShow }) => {
    const totalPages = Math.ceil(total/pageSize);
    const [pagesToShow, setPagesToShow] = useState([]);

    useEffect(() => {
        const pages = [];
        const start = totalPages - 5 > 0 ? totalPages - 5 :  1;
        for (let i = start; i < start + maxToShow && i <= totalPages; i++) {
            pages.push(i);
        }
        setPagesToShow(pages);
    }, [currentPage, total]);

    return (<div className="pagination-wrapper">
        <button className="btn btn-primary btn-rounded first-page" disabled={currentPage === 1} onClick={() => handlePageChange(1)}>
            <LuChevronsLeft />
        </button>
        <button className="btn btn-primary btn-rounded previous-page" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
            <LuChevronLeft />
        </button>
        {
            pagesToShow.map((page) => {
                return (
                    <button key={page} className={`btn ${page === currentPage && 'btn-primary'} ${page}`} onClick={() => handlePageChange(page)}>
                        {page}
                    </button>
                )
            })
        }
        <button className="btn btn-primary btn-rounded next-page" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
            <LuChevronRight />
        </button>
        <button className="btn btn-primary btn-rounded last-page" disabled={currentPage === totalPages} onClick={() => handlePageChange(Math.ceil(total/pageSize))}>
            <LuChevronsRight />
        </button>
    </div>)
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    handlePageChange: PropTypes.func.isRequired,
    maxToShow: PropTypes.number,
    pageSize: PropTypes.number,
};

Pagination.defaultProps = {
    maxToShow: 5,
    pageSize: 10,
};

export default Pagination;