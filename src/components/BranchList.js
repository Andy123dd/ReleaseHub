import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { statusStyles } from '../api';

const BranchList = ({
  branches,
  selectedBranch,
  projectId,
  onBranchSelect,
  onToggleFavorite
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [sortBy, setSortBy] = useState('name'); // 排序字段: name, versions
  const [sortOrder, setSortOrder] = useState('asc'); // 排序顺序: asc, desc

  // 应用搜索过滤
  const filteredBranches = branches.filter(branch => 
    branch.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 应用排序
  const sortedBranches = useMemo(() => {
    return [...filteredBranches].sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else if (sortBy === 'versions') {
        return sortOrder === 'asc' 
          ? a.versions - b.versions 
          : b.versions - a.versions;
      }
      return 0;
    });
  }, [filteredBranches, sortBy, sortOrder]);

  // 获取排序图标
  const getSortIcon = () => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' ? 'fa-sort-alpha-asc' : 'fa-sort-alpha-desc';
    } else if (sortBy === 'versions') {
      return sortOrder === 'asc' ? 'fa-sort-numeric-asc' : 'fa-sort-numeric-desc';
    }
    return 'fa-sort';
  };

  return (
    <div className="w-full md:w-64 lg:w-72 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      <div className="p-3 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">分支列表</h3>
        <div className="flex items-center space-x-2">
          {/* 排序按钮 - 与项目排序下拉框样式统一 */}
          <div className="relative">
            <button 
              onClick={() => setSortMenuOpen(!sortMenuOpen)}
              className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center space-x-1 text-sm"
            >
              <i className={`fa ${getSortIcon()} text-xs mr-1`}></i>
              <span>排序</span>
            </button>
            {/* 排序下拉菜单 */}
            {sortMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">排序方式</div>
                <button
                  onClick={() => {
                    setSortBy('name');
                    setSortOrder(sortBy === 'name' && sortOrder === 'asc' ? 'desc' : 'asc');
                    setSortMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${sortBy === 'name' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  名称 {sortBy === 'name' && (
                    <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </button>
                <button
                  onClick={() => {
                    setSortBy('versions');
                    setSortOrder(sortBy === 'versions' && sortOrder === 'asc' ? 'desc' : 'asc');
                    setSortMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${sortBy === 'versions' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  版本数量 {sortBy === 'versions' && (
                    <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 搜索框 */}
      <div className="p-3 border-b border-gray-100">
        <div className="relative">
          <input 
            type="text" 
            placeholder="搜索分支..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
        </div>
      </div>

      {sortedBranches.length === 0 ? (
        <div className="p-4 text-center text-gray-500 text-sm">
          <div className="mb-2">
            <i className="fa fa-code-fork text-primary text-3xl"></i>
          </div>
          <p>未找到匹配的分支</p>
        </div>
      ) : (
        <div className="overflow-y-auto scrollbar-hide flex-1">
          {sortedBranches.map((branch) => (
            <div
              key={branch.name}
              className={`p-3 flex items-center justify-between ${selectedBranch === branch.name ? 'bg-primary/5 border-l-2 border-primary' : 'hover:bg-gray-50'} cursor-pointer hover-scale`}
              onClick={() => onBranchSelect(branch.name)}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full ${selectedBranch === branch.name ? 'bg-primary' : 'bg-gray-200'} flex items-center justify-center mr-2`}
                >
                  <i
                    className={`fa fa-code-fork ${selectedBranch === branch.name ? 'text-white' : 'text-gray-600'} text-xs`}
                  ></i>
                </div>
                <span
                  className={`text-sm font-medium ${selectedBranch === branch.name ? 'text-primary' : 'text-gray-700'} max-w-[120px] whitespace-nowrap overflow-hidden text-overflow-ellipsis`}
                >
                  {branch.name}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-gray-500 mr-2">
                  {branch.versions} 版本
                </span>
                <button
                  className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(projectId, branch.name);
                  }}
                >
                  <i
                    className={`fa ${branch.favorite ? 'fa-star text-yellow-400' : 'fa-star-o text-gray-500'} text-xs ${branch.favorite ? 'star-animate' : ''}`}
                  ></i>
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