import React from 'react';
import PropTypes from 'prop-types';
import { mockProjects } from '../api';

const FavoriteBranches = ({ favorites, onToggleFavorite }) => {
  return (
    <div className="px-4 space-y-1">
      {favorites.length === 0 ? (
        <div className="p-4 text-center text-gray-500 text-sm">
          <div className="mb-2">
            <i className="fa fa-star text-yellow-400 text-3xl"></i>
          </div>
          <p>您收藏的分支将显示在这里</p>
        </div>
      ) : (
        favorites.map((favorite, index) => {
          const project = mockProjects.find(p => p.id === favorite.projectId);
          return (
            <div key={index} className="p-2 flex items-center justify-between hover:bg-gray-50 rounded-lg cursor-pointer hover-scale">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center mr-2">
                  <i className={`fa ${favorite.branch.icon || 'fa-code-fork'} text-primary text-xs`}></i>
                </div>
                <div>
                  <span className="text-sm font-medium">{favorite.branch.name}</span>
                  <div className="flex items-center mt-0.5">
                    <span className="text-xs text-gray-500">{project ? project.name : '未知项目'}</span>
                    <span className="mx-1.5 text-gray-300">•</span>
                    <span className="text-xs text-green-600">{favorite.branch?.status || '活跃'}</span>
                  </div>
                </div>
              </div>
              <button 
                className="p-1.5 rounded hover:bg-gray-100 transition-colors text-yellow-400"
                onClick={() => onToggleFavorite(favorite.projectId, favorite.branch.name)}
              >
                <i className="fa fa-star text-xs"></i>
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

FavoriteBranches.propTypes = {
  favorites: PropTypes.array.isRequired,
  onToggleFavorite: PropTypes.func.isRequired
};

export default FavoriteBranches;