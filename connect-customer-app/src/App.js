import React, { useState, useEffect } from "react";
import ConnectCustomerTable from "./components/ConnectCustomerTable";
import ConnectCustomerButton from "./components/ConnectCustomerButton";
import ConnectCustomerPopup from "./components/ConnectCustomerPopup";
import api from "./api";
import ConfirmDialog from "./components/ConfirmDialog";

const App = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [affiliates, setAffiliates] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedDeleteId, setSelectedDeleteId] = useState(null);
    const [connectCustomers, setConnectCustomers] = useState([]);

    const handleDelete = (id) => {
        setSelectedDeleteId(id);
        setIsConfirmOpen(true);
    };

    const fetchConnectCustomers = async () => {
        try {
            const response = await api.get("/connect-customer");
            setConnectCustomers(response.data);
        } catch (error) {
            console.error(
                "There was an error fetching the connect customers!",
                error
            );
        }
    };

    const handleConfirmDelete = async () => {
        try {
            await api.delete(`/connect-customer/${selectedDeleteId}`);
            setIsConfirmOpen(false);
            fetchConnectCustomers();
        } catch (error) {
            console.error(
                "There was an error deleting the connect customer!",
                error
            );
        }
    };

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            api.post("/login", {
                email: "tungtk@secomus.com",
                password: "111111",
            }).then((data) => {
                localStorage.setItem("token", data.data.access_token);
            });
        }
        api.get("/affiliates")
            .then((data) => {
                setAffiliates(data.data?.data ?? []);
            })
            .catch((error) => {
                console.error("Error fetching affiliates:", error);
            });

        api.get("/shopify-customers")
            .then((data) => {
                setCustomers(data?.data ?? []);
            })
            .catch((error) => {
                console.error("Error fetching customers from Shopify:", error);
            });
    }, []);

    const handleConnectCustomer = () => {
        setIsOpen(true);
    };

    const handleClosePopup = () => {
        setIsOpen(false);
    };

    return (
        <div className="App">
            <header>
                <ConnectCustomerButton onClick={handleConnectCustomer} />
            </header>
            <main>
                <ConnectCustomerTable onDelete={handleDelete} />
            </main>
            <ConnectCustomerPopup
                isOpen={isOpen}
                onClose={handleClosePopup}
                affiliates={affiliates}
                customers={customers}
                onConnect={() => {
                    // Refresh connect customer table after connecting
                    // You can implement refresh logic here or trigger a refresh in ConnectCustomerTable component
                }}
            />
            <ConfirmDialog
                isOpen={isConfirmOpen}
                message="Are you sure you want to delete this connection?"
                onConfirm={handleConfirmDelete}
                onCancel={() => setIsConfirmOpen(false)}
            />
        </div>
    );
};

export default App;
