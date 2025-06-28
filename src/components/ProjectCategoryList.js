import React from 'react';
import PropTypes from 'prop-types';

const ProjectCategoryList = ({ 
  projects, 
  selectedProjectId, 
  projectCategories, 
  statusStyles, 
  onProjectSelect 
}) => {
  return (
    <div className="overflow-y-auto scrollbar-hide flex-1">
      {Object.entries(projectCategories).map(([category, projectIds]) => {
        const categoryProjects = projectIds
          .map(id => projects.find(p => p.id === id))
          .filter(Boolean);

        if (categoryProjects.length === 0) return null;

        return (
          <div key={category} className="mb-2">
            <div className="px-3 py-2 flex items-center justify-between cursor-pointer bg-gray-50">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${statusStyles[category].bg} mr-2`}></div>
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
      })}
    </div>
  );
};

ProjectCategoryList.propTypes = {
  projects: PropTypes.array.isRequired,
  selectedProjectId: PropTypes.string,
  projectCategories: PropTypes.object.isRequired,
  statusStyles: PropTypes.object.isRequired,
  onProjectSelect: PropTypes.func.isRequired
};

export default ProjectCategoryList;