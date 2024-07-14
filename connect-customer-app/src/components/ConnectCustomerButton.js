import React from "react";

const ConnectCustomerButton = ({ onClick }) => {
    return (
        <button onClick={onClick} className="connect-customer-btn">
            Connect Customer
        </button>
    );
};

export default ConnectCustomerButton;
