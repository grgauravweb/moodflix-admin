import React, { useEffect } from 'react';

const Modal = ({ message, onClose }) => {
    useEffect(() => {
        // Close the modal after 3 seconds
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer); // Clean up the timer if the component unmounts
    }, [message, onClose]);

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 animate-fade-in">
            <div className="bg-green-100 p-6 rounded-lg shadow-lg w-96 text-center animate-modal">
                <p className="text-green-700 text-lg font-semibold">{message}</p>
            </div>
        </div>
    );
};

export default Modal;
