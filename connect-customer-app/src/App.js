import React, { useState, useEffect } from "react";
import ConnectCustomerTable from "./components/ConnectCustomerTable";
import ConnectCustomerButton from "./components/ConnectCustomerButton";
import ConnectCustomerPopup from "./components/ConnectCustomerPopup";

const App = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [affiliates, setAffiliates] = useState([]);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        // Fetch affiliates and customers data
        fetch("http://localhost:8000/api/affiliates")
            .then((response) => response.json())
            .then((data) => {
                setAffiliates(data);
            })
            .catch((error) => {
                console.error("Error fetching affiliates:", error);
            });

        // Fetch customers from Shopify API
        fetch("http://localhost:8000/api/shopify-customers")
            .then((response) => response.json())
            .then((data) => {
                setCustomers(data);
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
                <ConnectCustomerTable />
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
        </div>
    );
};

export default App;
