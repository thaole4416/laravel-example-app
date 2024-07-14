// src/components/ConnectCustomerPopup.js

import React, { useState, useEffect } from "react";

const ConnectCustomerPopup = ({
    isOpen,
    onClose,
    affiliates,
    customers,
    onConnect,
}) => {
    const [selectedAffiliate, setSelectedAffiliate] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState("");

    useEffect(() => {
        // Reset state when popup opens
        setSelectedAffiliate("");
        setSelectedCustomer("");
    }, [isOpen]);

    const handleConnect = () => {
        // Call API to connect customer here
        const data = {
            affiliate_id: selectedAffiliate,
            shopify_customer_id: selectedCustomer,
        };

        // Example of API call using fetch
        fetch("http://localhost:8000/api/connect-customer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                // Close popup and refresh connect customer data
                onClose();
                onConnect();
            })
            .catch((error) => {
                console.error("Error connecting customer:", error);
                // Handle error
            });
    };

    if (!isOpen) return null;

    return (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={onClose}>
                    Close
                </button>
                <h2>Connect Customer</h2>
                <label>Select Affiliate:</label>
                <select
                    value={selectedAffiliate}
                    onChange={(e) => setSelectedAffiliate(e.target.value)}
                >
                    <option value="">Select an Affiliate</option>
                    {affiliates.map((affiliate) => (
                        <option key={affiliate.id} value={affiliate.id}>
                            {affiliate.name}
                        </option>
                    ))}
                </select>
                <label>Select Customer:</label>
                <select
                    value={selectedCustomer}
                    onChange={(e) => setSelectedCustomer(e.target.value)}
                >
                    <option value="">Select a Customer</option>
                    {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                            {customer.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleConnect}>Connect</button>
            </div>
        </div>
    );
};

export default ConnectCustomerPopup;
