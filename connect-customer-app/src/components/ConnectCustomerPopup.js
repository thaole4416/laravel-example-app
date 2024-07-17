// src/components/ConnectCustomerPopup.js

import React, { useState, useEffect } from "react";
import api from "../api";
import { AsyncPaginate } from "react-select-async-paginate";

const ConnectCustomerPopup = ({ isOpen, onClose, onConnect }) => {
    const [selectedAffiliate, setSelectedAffiliate] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setSelectedAffiliate("");
        setSelectedCustomer("");
    }, [isOpen]);

    const handleConnect = () => {
        const data = {
            affiliate_id: selectedAffiliate?.value,
            shopify_customer_id: selectedCustomer?.value,
            customer_name: selectedCustomer?.name,
            customer_email: selectedCustomer?.email,
        };

        api.post("/connect-customer", data)
            .then((data) => {
                onClose();
                onConnect();
            })
            .catch((error) => {
                if (error.response && error.response.status === 422) {
                    setError(
                        "This affiliate and Shopify customer pair already exists."
                    );
                } else {
                    setError("An unexpected error occurred. Please try again.");
                }
            });
    };

    const loadAffiliates = async (search, loadedOptions, { page }) => {
        const response = await api.get("/affiliates", {
            params: {
                search,
                page,
                limit: 10,
            },
        });
        return {
            options: response.data.data.map((affiliate) => ({
                value: affiliate.id,
                label: `${affiliate.name} (${affiliate.email})`,
            })),
            hasMore: response.data.data.length === 10,
            additional: {
                page: page + 1,
            },
        };
    };

    const loadShopifyCustomers = async (search, loadedOptions, { page }) => {
        const response = await api.get("/shopify-customers", {
            params: {
                ...(search && { search }),
                ...(loadedOptions.length && {
                    after: loadedOptions[loadedOptions.length - 1].value,
                }),
            },
        });
        return {
            options: response.data.data.map((customer) => ({
                value: customer.id,
                label: `${customer.name} (${customer.email})`,
                name: customer.name,
                email: customer.email,
            })),
            hasMore: response.data.data.length === 10,
            additional: {
                page: page + 1,
            },
        };
    };

    if (!isOpen) return null;

    return (
        <div className="popup">
            <div className="popup-inner">
                {error && <div className="alert-banner">{error}</div>}
                <h2>Connect Customer</h2>
                <label className="my-2">Select Affiliate:</label>
                <AsyncPaginate
                    loadOptions={loadAffiliates}
                    onChange={setSelectedAffiliate}
                    additional={{
                        page: 1,
                    }}
                    placeholder="Select Affiliate"
                    isSearchable
                />
                <label className="my-2">Select Customer:</label>
                <AsyncPaginate
                    loadOptions={loadShopifyCustomers}
                    onChange={setSelectedCustomer}
                    additional={{
                        page: 1,
                    }}
                    placeholder="Select Shopify Customer"
                    isSearchable
                />
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
