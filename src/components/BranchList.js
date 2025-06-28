import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { statusStyles } from '../api';

const BranchList = ({
  branches,
  selectedBranch,
  projectId,
  onBranchSelect,
  onToggleFavorite,
  onFilterBranch,
  onCreateBranch,
  onRefreshBranches,
  onExportBranches,
  onCleanupBranches
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
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
  const getSortIcon = (field) => {
    if (sortBy !== field) return null;
    return sortOrder === 'asc' ? 'fa-sort-asc' : 'fa-sort-desc';
  };

  return (
    <div className="w-full md:w-64 lg:w-72 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      <div className="p-3 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">分支列表</h3>
        <div className="flex items-center space-x-2">
          {/* 过滤器和排序按钮 */}
          <div className="relative">
            <button 
              className="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500"
              onClick={() => setFilterMenuOpen(!filterMenuOpen)}
            >
              <i className="fa fa-filter text-xs"></i>
            </button>
            {/* 过滤器和排序下拉菜单 */}
            {filterMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                <div className="p-2 border-b border-gray-100 font-medium text-sm">分支过滤</div>
                <div className="py-1">
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      onFilterBranch && onFilterBranch('all');
                      setFilterMenuOpen(false);
                    }}
                  >
                    所有分支
                  </button>
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      onFilterBranch && onFilterBranch('active');
                      setFilterMenuOpen(false);
                    }}
                  >
                    活跃分支
                  </button>
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      onFilterBranch && onFilterBranch('merged');
                      setFilterMenuOpen(false);
                    }}
                  >
                    已合并分支
                  </button>
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      onFilterBranch && onFilterBranch('closed');
                      setFilterMenuOpen(false);
                    }}
                  >
                    已关闭分支
                  </button>
                </div>
                <div className="border-t border-gray-100 my-1"></div>
                <div className="p-2 font-medium text-sm text-gray-500">排序方式</div>
                <div className="py-1">
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setSortBy('name');
                      setSortOrder(sortBy === 'name' && sortOrder === 'asc' ? 'desc' : 'asc');
                      setFilterMenuOpen(false);
                    }}
                  >
                    <span className="flex items-center justify-between w-full">
                      <span>名称</span>
                      <i className={`fa ${getSortIcon('name')} text-xs`}></i>
                    </span>
                  </button>
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setSortBy('versions');
                      setSortOrder(sortBy === 'versions' && sortOrder === 'asc' ? 'desc' : 'asc');
                      setFilterMenuOpen(false);
                    }}
                  >
                    <span className="flex items-center justify-between w-full">
                      <span>版本数量</span>
                      <i className={`fa ${getSortIcon('versions')} text-xs`}></i>
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* 更多选项按钮 */}
          <div className="relative">
            <button 
              className="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500"
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
            >
              <i className="fa fa-ellipsis-v text-xs"></i>
            </button>
            {/* 更多选项下拉菜单 */}
            {moreMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                <div className="py-1">
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      onCreateBranch && onCreateBranch();
                      setMoreMenuOpen(false);
                    }}
                  >
                    <i className="fa fa-plus mr-2 text-xs"></i> 创建分支
                  </button>
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      onRefreshBranches && onRefreshBranches();
                      setMoreMenuOpen(false);
                    }}
                  >
                    <i className="fa fa-refresh mr-2 text-xs"></i> 刷新列表
                  </button>
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      onExportBranches && onExportBranches();
                      setMoreMenuOpen(false);
                    }}
                  >
                    <i className="fa fa-download mr-2 text-xs"></i> 导出分支信息
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    onClick={() => {
                      onCleanupBranches && onCleanupBranches();
                      setMoreMenuOpen(false);
                    }}
                  >
                    <i className="fa fa-trash mr-2 text-xs"></i> 清理无效分支
                  </button>
                </div>
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
                  className={`text-sm font-medium ${selectedBranch === branch.name ? 'text-primary' : 'text-gray-700'}`}
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
  onToggleFavorite: PropTypes.func.isRequired,
  onFilterBranch: PropTypes.func,
  onCreateBranch: PropTypes.func,
  onRefreshBranches: PropTypes.func,
  onExportBranches: PropTypes.func,
  onCleanupBranches: PropTypes.func
};

export default BranchList;
