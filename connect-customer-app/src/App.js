import React, { useState, useEffect } from "react";
import ConnectCustomerTable from "./components/ConnectCustomerTable";
import ConnectCustomerButton from "./components/ConnectCustomerButton";
import ConnectCustomerPopup from "./components/ConnectCustomerPopup";
import api from "./api";
import ConfirmDialog from "./components/ConfirmDialog";

const itemsPerPage = 2;
const App = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedDeleteId, setSelectedDeleteId] = useState(null);
    const [connectCustomers, setConnectCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(10);
    const [isRefetch, setRefetch] = useState(0);

    const handleDelete = (id) => {
        setSelectedDeleteId(id);
        setIsConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await api.delete(`/connect-customer/${selectedDeleteId}`);
            setIsConfirmOpen(false);
            setRefetch((f) => f + 1);
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
    }, []);

    useEffect(() => {
        api.get(`/connect-customer`, {
            params: {
                search: searchTerm,
                page: currentPage,
                limit: itemsPerPage,
            },
        })
            .then((data) => {
                setConnectCustomers(data.data?.data ?? []);
                setTotal(data.data?.meta?.total ?? 10);
            })
            .catch((error) => {
                console.error("Error fetching connect customers:", error);
            });
    }, [searchTerm, currentPage, isRefetch]);

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
                <ConnectCustomerTable
                    connectCustomers={connectCustomers}
                    onDelete={handleDelete}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    total={total}
                />
            </main>
            <ConnectCustomerPopup
                isOpen={isOpen}
                onClose={handleClosePopup}
                onConnect={() => {
                    setRefetch((f) => f + 1);
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
