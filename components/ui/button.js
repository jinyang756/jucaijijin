// 按钮组件
import React from 'react';

export const Button = ({ children, className = '', onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${disabled
        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
        : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'}
      ${className}`}
    >
      {children}
    </button>
  );
};