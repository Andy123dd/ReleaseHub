import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm z-10">
      <div className="flex items-center space-x-4">
        <div className="text-primary font-bold text-xl flex items-center">
          <i className="fa fa-cubes mr-2"></i>
          <span>ProjectHub</span>
        </div>
        <div className="hidden md:flex items-center space-x-1 text-sm text-gray-500">
          <Link to="/" className="cursor-pointer hover:text-primary transition-colors">首页</Link>
          <i className="fa fa-angle-right text-xs"></i>
          <span className="cursor-pointer hover:text-primary transition-colors">项目管理</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
          <i className="fa fa-bell-o text-gray-500"></i>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-full transition-colors">
          <img src="https://picsum.photos/id/1005/200/200" alt="用户头像" className="w-8 h-8 rounded-full object-cover border border-gray-200" />
          <span className="text-sm font-medium hidden md:inline">张明</span>
          <i className="fa fa-angle-down text-gray-400 text-xs"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;    