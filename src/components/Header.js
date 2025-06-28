import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteBranches from './FavoriteBranches';

const Header = ({ favorites, onToggleFavorite }) => {
  const [showFavorites, setShowFavorites] = useState(false);

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
        <div className="relative">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setShowFavorites(!showFavorites)}
          >
            <i className="fa fa-star text-yellow-400"></i>
            {favorites.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>
          {showFavorites && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
              <div className="p-2 border-b border-gray-100 font-medium text-sm">我的收藏</div>
              <FavoriteBranches 
                favorites={favorites} 
                onToggleFavorite={onToggleFavorite} 
              />
            </div>
          )}
        </div>
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