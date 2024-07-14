import React from "react";

const ConfirmDialog = ({ isOpen, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="confirm-dialog">
            <p>{message}</p>
            <button onClick={onConfirm}>Confirm</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default ConfirmDialog;
