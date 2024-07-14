import React, { useState, useEffect } from "react";

const ConnectCustomerTable = () => {
    const [connectCustomers, setConnectCustomers] = useState([]);

    useEffect(() => {
        // Fetch connect customer data here
        fetch("http://localhost:8000/api/connect-customer")
            .then((response) => response.json())
            .then((data) => {
                setConnectCustomers(data);
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
                        <th>Customer ID</th>
                        <th>Affiliate ID</th>
                        {/* Add other headers as needed */}
                    </tr>
                </thead>
                <tbody>
                    {connectCustomers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.shopify_customer_id}</td>
                            <td>{customer.affiliate_id}</td>
                            {/* Add other columns as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ConnectCustomerTable;
