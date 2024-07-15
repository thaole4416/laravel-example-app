// src/components/ConnectCustomerPopup.js

import React, { useState, useEffect } from "react";
import api from "../api";

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
        setSelectedAffiliate("");
        setSelectedCustomer("");
    }, [isOpen]);

    const handleConnect = () => {
        const customer = customers.find((c) => c.id === selectedCustomer);

        const data = {
            affiliate_id: selectedAffiliate,
            shopify_customer_id: selectedCustomer,
            customer_name: customer?.name,
            customer_email: customer?.email,
        };

        api.post("/connect-customer", data)
            .then((data) => {
                onClose();
                onConnect();
            })
            .catch((error) => {
                console.error("Error connecting customer:", error);
            });
    };

    if (!isOpen) return null;

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Connect Customer</h2>
                <label>Select Affiliate:</label>
                <select
                    value={selectedAffiliate}
                    onChange={(e) => setSelectedAffiliate(e.target.value)}
                >
                    <option value="">Select an Affiliate</option>
                    {affiliates.map((affiliate) => (
                        <option key={affiliate.id} value={affiliate.id}>
                            {affiliate?.name}
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
                            {customer.email}
                        </option>
                    ))}
                </select>
                <div className="confirm-dialog-buttons">
                    <button
                        className="confirm-dialog-button confirm"
                        onClick={handleConnect}
                    >
                        Connect
                    </button>
                    <button
                        className="confirm-dialog-button cancel"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConnectCustomerPopup;
