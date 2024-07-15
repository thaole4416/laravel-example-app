import React from "react";

const ConfirmDialog = ({ isOpen, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="confirm-dialog">
            <div className="confirm-dialog-box">
                <div className="confirm-dialog-title">Confirm Deletion</div>
                <div className="confirm-dialog-message">{message}</div>
                <div className="confirm-dialog-buttons">
                    <button
                        className="confirm-dialog-button confirm"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                    <button
                        className="confirm-dialog-button cancel"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
