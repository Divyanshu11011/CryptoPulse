import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg relative max-w-[90%] max-h-[90vh] w-full h-full overflow-hidden">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          style={{ fontSize: '16px' }}
        >
          &times;
        </button>
        <div className="w-full h-full overflow-hidden">
          <iframe
            src=""
            style={{ width: '100%', height: '100%', border: 'none', overflow: 'hidden' }}
            title="Coin Swap"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Modal;
