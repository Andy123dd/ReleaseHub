import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ProjectCategoryList = ({
  projects,
  selectedProjectId,
  projectCategories,
  statusStyles,
  onProjectSelect,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [sortBy, setSortBy] = useState('name-asc');
  const [sortedProjects, setSortedProjects] = useState({});
  // 添加分类折叠状态管理
  const [expandedCategories, setExpandedCategories] = useState({});

  // 初始化所有分类为展开状态
  useEffect(() => {
    const initialExpanded = {};
    Object.keys(projectCategories).forEach(category => {
      initialExpanded[category] = true;
    });
    setExpandedCategories(initialExpanded);
  }, [projectCategories]);

  // 展开所有分类
  const expandAll = () => {
    const allExpanded = {};
    Object.keys(projectCategories).forEach(category => {
      allExpanded[category] = true;
    });
    setExpandedCategories(allExpanded);
  };

  // 折叠所有分类
  const collapseAll = () => {
    const allCollapsed = {};
    Object.keys(projectCategories).forEach(category => {
      allCollapsed[category] = false;
    });
    setExpandedCategories(allCollapsed);
  };

  // 处理排序逻辑
  useEffect(() => {
    const sorted = {};
    Object.entries(projectCategories).forEach(([category, projectIds]) => {
      let categoryProjects = projectIds
        .map(id => projects.find(p => p.id === id))
        .filter(Boolean);

      // 根据选择的排序方式进行排序
      switch(sortBy) {
        case 'name-asc':
          categoryProjects.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          categoryProjects.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'recent':
          categoryProjects.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
          break;
        case 'oldest':
          categoryProjects.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
          break;
        case 'most-branches':
          categoryProjects.sort((a, b) => b.branches - a.branches);
          break;
        case 'least-branches':
          categoryProjects.sort((a, b) => a.branches - b.branches);
          break;
        default:
          break;
      }

      sorted[category] = categoryProjects;
    });
    setSortedProjects(sorted);
  }, [projects, projectCategories, sortBy]);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sortButton = document.getElementById('sortButton');
      const sortDropdown = document.getElementById('sortDropdown');
      if (sortButton && sortDropdown && !sortButton.contains(event.target) && !sortDropdown.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 排序选项数据抽离
  const sortOptions = [
    { label: '按名称排序 (A-Z)', value: 'name-asc' },
    { label: '按名称排序 (Z-A)', value: 'name-desc' },
    { label: '最近更新', value: 'recent' },
    { label: '最早更新', value: 'oldest' },
    { label: '最多分支', value: 'most-branches' },
    { label: '最少分支', value: 'least-branches' },
  ];

  // 切换分类展开/折叠状态
  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className="overflow-y-auto scrollbar-hide flex-1">
      <div className="flex items-center justify-between p-3 border-b border-gray-100">
        <h3 className="text-sm font-medium text-gray-700">项目分类</h3>
        <div className="flex space-x-2">
          <button
            onClick={expandAll}
            className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
          >
            <i className="fa fa-plus-square-o mr-1"></i>展开
          </button>
          <button
            onClick={collapseAll}
            className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
          >
            <i className="fa fa-minus-square-o mr-1"></i>折叠
          </button>
          <div className="relative">
            <button
              id="sortButton"
              onClick={() => setDropdownVisible(!dropdownVisible)}
              className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
            >
              <i className="fa fa-sort mr-1"></i>排序
            </button>
            {dropdownVisible && (
              <div
                id="sortDropdown"
                className="absolute right-0 mt-1 w-48 bg-white shadow-lg rounded-md z-10"
              >
                {sortOptions.map(option => (
                  <div
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setDropdownVisible(false);
                    }}
                    className={`px-4 py-2 text-xs cursor-pointer hover:bg-gray-100 ${sortBy === option.value ? 'bg-gray-100 font-medium' : ''}`}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {Object.entries(sortedProjects).map(([category, categoryProjects]) => {
        if (categoryProjects.length === 0) return null;

        return (
          <div key={category} className="mb-2">
            {/* 分类标题 - 添加点击事件和箭头方向切换 */}
            <div 
              className="px-3 py-2 flex items-center justify-between cursor-pointer bg-gray-50"
              onClick={() => toggleCategory(category)}
            >
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${statusStyles[category].bg} mr-2`}></div>
                <span className="text-xs font-medium text-gray-700 max-w-[100px] whitespace-nowrap overflow-hidden text-overflow-ellipsis">{category}项目</span>
                <span className="ml-2 px-1.5 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full">{categoryProjects.length}</span>
              </div>
              <i className={`fa ${expandedCategories[category] ? 'fa-angle-down' : 'fa-angle-right'} text-gray-400 text-xs`}></i>
            </div>

            {/* 项目列表 - 根据展开状态显示/隐藏 */}
            {expandedCategories[category] && (
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
                      <span className={`text-sm font-medium ${selectedProjectId === project.id ? 'text-primary' : 'text-gray-700'} max-w-[180px] whitespace-nowrap overflow-hidden text-overflow-ellipsis`}>{project.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">{project.branches} 分支</span>
                  </div>
                ))}
              </div>
            )}
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
  onProjectSelect: PropTypes.func.isRequired,
};

export default ProjectCategoryList;
