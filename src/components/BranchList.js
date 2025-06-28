import React from 'react';

// 分支数据 - 与UI分离
const branchData = [
  { id: 1, name: 'main', versionCount: 12, isActive: true },
  { id: 2, name: 'develop', versionCount: 8, isActive: false },
  { id: 3, name: 'feature/auth', versionCount: 5, isActive: false },
  { id: 4, name: 'bugfix/501', versionCount: 3, isActive: false },
  { id: 5, name: 'release/v1.2', versionCount: 2, isActive: false },
  { id: 6, name: 'feature/payment', versionCount: 4, isActive: false },
  { id: 7, name: 'hotfix/404', versionCount: 1, isActive: false },
  { id: 8, name: 'feature/docs', versionCount: 2, isActive: false },
];

const BranchList = () => {
  return (
    <div class="w-full md:w-64 lg:w-72 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      <div class="p-3 border-b border-gray-100 flex items-center justify-between">
        <h3 class="text-sm font-medium text-gray-700">分支列表</h3>
        <div class="flex items-center space-x-2">
          <div class="relative">
            <button class="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500">
              <i class="fa fa-search text-xs"></i>
            </button>
          </div>
          <div class="relative">
            <button class="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500">
              <i class="fa fa-filter text-xs"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="overflow-y-auto scrollbar-hide flex-1">
        {branchData.map(branch => (
          <div 
            key={branch.id}
            class={`p-3 flex items-center justify-between cursor-pointer hover-scale ${branch.isActive ? 'bg-primary/5 border-l-2 border-primary' : 'hover:bg-gray-50'}`}
          >
            <div class="flex items-center">
              <div class={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${branch.isActive ? 'bg-primary' : 'bg-gray-200'}`}>
                <i class={`fa fa-code-fork text-xs ${branch.isActive ? 'text-white' : 'text-gray-600'}`}></i>
              </div>
              <span class={`text-sm font-medium ${branch.isActive ? 'text-primary' : 'text-gray-700'}`}>{branch.name}</span>
            </div>
            <span class="text-xs text-gray-500">{branch.versionCount} 版本</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BranchList;