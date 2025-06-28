import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProjectCategoryList from './ProjectCategoryList';
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
  const [searchTerm, setSearchTerm] = useState('');
  // 筛选收藏的项目
  const favoriteProjects = projects.filter(project => project.favorite);

  // 应用搜索过滤
  const filteredProjects = viewType === 'favorites' 
    ? favoriteProjects.filter(project => 
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : projects.filter(project => 
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <section className="w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 flex flex-col overflow-hidden transition-all duration-300">
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <input 
            type="text" 
            placeholder="搜索项目..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
              <span className="ml-1.5 px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">{favoriteProjects.length}</span>
            </span>
          </button>
          {/* 其他标签页按钮 */}
        </div>
      </div>
      
      <div className="overflow-y-auto scrollbar-hide flex-1">
        {viewType === 'favorites' ? (
          <ProjectCategoryList
            projects={filteredProjects}
            selectedProjectId={selectedProjectId}
            projectCategories={projectCategories}
            statusStyles={statusStyles}
            onProjectSelect={onProjectSelect}
          />
        ) : (
          <ProjectCategoryList
            projects={filteredProjects}
            selectedProjectId={selectedProjectId}
            projectCategories={projectCategories}
            statusStyles={statusStyles}
            onProjectSelect={onProjectSelect}
          />
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