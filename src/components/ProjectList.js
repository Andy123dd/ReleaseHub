import React from 'react';
import PropTypes from 'prop-types';
import FavoriteBranches from './FavoriteBranches';
import { projectCategories, statusStyles } from '../api';

const ProjectList = ({ 
  projects, 
  selectedProjectId, 
  viewType, 
  onProjectSelect, 
  onToggleFavorite,
  favorites,
  onViewChange 
}) => {
  return (
    <section className="w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 flex flex-col overflow-hidden transition-all duration-300">
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <input 
            type="text" 
            placeholder="搜索项目..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
          <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>
      
      <div className="border-b border-gray-200 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-1 min-w-max px-2">
          <button 
            className={`px-4 py-2 text-sm font-medium ${viewType === 'all' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => onViewChange('all')}
          >
            <span className="flex items-center">
              <i className="fa fa-th-large mr-1.5"></i> 所有项目
            </span>
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${viewType === 'favorites' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => onViewChange('favorites')}
          >
            <span className="flex items-center">
              <i className="fa fa-star mr-1.5"></i> 收藏
              <span className="ml-1.5 px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">{favorites.length}</span>
            </span>
          </button>
          {/* 其他标签页按钮 */}
        </div>
      </div>
      
      <div className="overflow-y-auto scrollbar-hide flex-1">
        {viewType === 'favorites' ? (
          <FavoriteBranches 
            favorites={favorites} 
            onToggleFavorite={onToggleFavorite} 
          />
        ) : (
          Object.entries(projectCategories).map(([category, projectIds]) => {
            const categoryProjects = projectIds.map(id => projects.find(p => p.id === id)).filter(Boolean);
            if (categoryProjects.length === 0) return null;
            
            return (
              <div key={category} className="mb-2">
                <div className="px-3 py-2 flex items-center justify-between cursor-pointer bg-gray-50">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${statusStyles[category].bg.replace('bg-', 'bg-')} mr-2`}></div>
                    <span className="text-xs font-medium text-gray-700">{category}项目</span>
                    <span className="ml-2 px-1.5 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full">{categoryProjects.length}</span>
                  </div>
                  <i className="fa fa-angle-down text-gray-400 text-xs"></i>
                </div>
                
                <div className="pl-8">
                  {categoryProjects.map(project => (
                    <div 
                      key={project.id} 
                      className={`p-2 flex items-center justify-between hover:bg-gray-50 rounded-lg cursor-pointer hover-scale ${selectedProjectId === project.id ? 'bg-primary/5 border-l-2 border-primary' : ''}`}
                      onClick={() => onProjectSelect(project.id)}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded ${selectedProjectId === project.id ? 'bg-primary/10' : 'bg-gray-100'} flex items-center justify-center mr-2`}>
                          <i className={`fa ${project.icon} ${selectedProjectId === project.id ? 'text-primary' : 'text-gray-500'} text-xs`}></i>
                        </div>
                        <span className={`text-sm font-medium ${selectedProjectId === project.id ? 'text-primary' : 'text-gray-700'}`}>{project.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{project.branches} 分支</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

ProjectList.propTypes = {
  projects: PropTypes.array.isRequired,
  selectedProjectId: PropTypes.string,
  viewType: PropTypes.string.isRequired,
  onProjectSelect: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  favorites: PropTypes.array.isRequired,
  onViewChange: PropTypes.func.isRequired
};

export default ProjectList;    