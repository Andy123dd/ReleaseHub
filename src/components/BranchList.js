import React from 'react';
import PropTypes from 'prop-types';
import { statusStyles } from '../api';

const BranchList = ({ branches, selectedBranch, projectId, onBranchSelect, onToggleFavorite }) => {
  return (
    <div className="w-full md:w-64 lg:w-72 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      <div className="p-3 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">分支列表</h3>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button className="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500">
              <i className="fa fa-filter text-xs"></i>
            </button>
          </div>
          <button className="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500">
            <i className="fa fa-ellipsis-v text-xs"></i>
          </button>
        </div>
      </div>
      
      {branches.length === 0 ? (
        <div className="p-4 text-center text-gray-500 text-sm">
          <div className="mb-2">
            <i className="fa fa-code-fork text-primary text-3xl"></i>
          </div>
          <p>该项目暂无分支</p>
        </div>
      ) : (
        <div className="overflow-y-auto scrollbar-hide flex-1">
          {branches.map(branch => (
            <div 
              key={branch.name} 
              className={`p-3 flex items-center justify-between ${selectedBranch === branch.name ? 'bg-primary/5 border-l-2 border-primary' : 'hover:bg-gray-50'} cursor-pointer hover-scale`}
              onClick={() => onBranchSelect(branch.name)}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full ${selectedBranch === branch.name ? 'bg-primary' : 'bg-gray-200'} flex items-center justify-center mr-2`}>
                  <i className={`fa fa-code-fork ${selectedBranch === branch.name ? 'text-white' : 'text-gray-600'} text-xs`}></i>
                </div>
                <span className={`text-sm font-medium ${selectedBranch === branch.name ? 'text-primary' : 'text-gray-700'}`}>{branch.name}</span>
                <span className={`ml-2 px-1.5 py-0.5 ${statusStyles[branch.status].bg} ${statusStyles[branch.status].text} text-xs rounded-full ${branch.status === '活跃' ? 'badge-pulse' : ''}`}>{branch.status}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-gray-500 mr-2">{branch.versions} 版本</span>
                <button 
                  className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(projectId, branch.name);
                  }}
                >
                  <i className={`fa ${branch.favorite ? 'fa-star text-yellow-400' : 'fa-star-o text-gray-500'} text-xs ${branch.favorite ? 'star-animate' : ''}`}></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

BranchList.propTypes = {
  branches: PropTypes.array.isRequired,
  selectedBranch: PropTypes.string,
  projectId: PropTypes.string,
  onBranchSelect: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired
};

export default BranchList;    