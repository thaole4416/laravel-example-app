import React, { useState, useEffect } from "react";
import api from "../api";

const ConnectCustomerTable = ({ onDelete }) => {
    const [connectCustomers, setConnectCustomers] = useState([]);

    useEffect(() => {
        // Fetch connect customer data here
        api.get("/connect-customer")
            .then((data) => {
                setConnectCustomers(data.data?.data ?? []);
            })
            .catch((error) => {
                console.error("Error fetching connect customers:", error);
            });
    }, []);

    return (
        <div className="connect-customer-table">
            <h2>Connect Customer Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>Connection ID</th>
                        <th>Customer</th>
                        <th>Shopify Customer ID</th>
                        <th>Affiliate</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {connectCustomers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>
                                {customer.customer_name} (
                                {customer.customer_email})
                            </td>
                            <td>{customer.shopify_customer_id}</td>
                            <td>{customer.affiliate}</td>
                            <td>
                                <button onClick={() => onDelete(customer.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ConnectCustomerTable;
