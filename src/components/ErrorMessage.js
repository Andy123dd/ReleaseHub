import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-full bg-gray-50 p-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fa fa-exclamation-triangle text-red-500 text-2xl"></i>
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">加载失败</h3>
        <p className="text-gray-600 mb-4">{message || '无法加载数据，请稍后重试'}</p>
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          重试
        </button>
      </div>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string
};

export default ErrorMessage;    