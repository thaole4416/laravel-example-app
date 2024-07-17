import React from "react";

const ConnectCustomerTable = ({
    onDelete,
    connectCustomers,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    total,
}) => {
    const itemsPerPage = 2;

    const totalPages = Math.ceil(total / itemsPerPage);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className="connect-customer-table">
                <h2>Connect Customer Table</h2>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="form-control"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        style={{ maxWidth: "300px" }}
                    />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Connection ID</th>
                            <th>Affiliate</th>
                            <th>Customer</th>
                            <th>Shopify Customer ID</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {connectCustomers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.affiliate}</td>
                                <td>
                                    {customer.customer_name} (
                                    {customer.customer_email})
                                </td>
                                <td>{customer.shopify_customer_id}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => onDelete(customer.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex justify-content-end">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`btn btn-sm ${
                                currentPage === index + 1
                                    ? "btn-primary"
                                    : "btn-secondary"
                            } mx-1 my-3`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ConnectCustomerTable;
