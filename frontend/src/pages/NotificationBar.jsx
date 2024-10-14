// NotificationBar.js
import React from 'react';

const NotificationBar = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 p-4 bg-green-500 text-white z-50">
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="text-white font-bold">
          &times;
        </button>
      </div>
    </div>
  );
};

export default NotificationBar;
