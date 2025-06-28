import React from 'react';
import PropTypes from 'prop-types';

const VersionHistory = ({ versions, selectedBranch }) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-4 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <span className="text-sm text-gray-500 mr-2">当前分支:</span>
            <span className="text-sm font-medium text-gray-800 flex items-center">
              <i className="fa fa-code-fork text-primary mr-1.5"></i>
              {selectedBranch || 'main'}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">最新提交:</span>
            <span className="text-sm font-medium text-gray-800">{versions[0]?.commit || '无提交'}</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
            <i className="fa fa-plus mr-1.5"></i> 提交
          </button>
          <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center">
            <i className="fa fa-upload mr-1.5"></i> 推送
          </button>
        </div>
      </div>
      
      {versions.length === 0 ? (
        <div className="p-4 text-center text-gray-500 text-sm">
          <div className="mb-2">
            <i className="fa fa-history text-primary text-3xl"></i>
          </div>
          <p>暂无版本历史</p>
        </div>
      ) : (
        <div className="overflow-y-auto scrollbar-hide flex-1 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700">版本历史</h3>
            <div className="flex items-center space-x-2">
              <button className="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500">
                <i className="fa fa-download text-xs"></i>
              </button>
              <button className="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500">
                <i className="fa fa-ellipsis-v text-xs"></i>
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {versions.map((version, index) => (
              <div key={version.id} className="relative pl-8 pb-6">
                {index < versions.length - 1 && (
                  <div className="absolute left-3 top-5 w-0.5 h-full bg-gray-200"></div>
                )}
                
                <div className="absolute left-2 top-1 w-2 h-2 rounded-full bg-primary"></div>
                
                <div className="flex items-start">
                  <div className="mr-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <img src={version.author.avatar} alt={version.author.name} className="w-8 h-8 rounded-full object-cover" />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center">
                      <h4 className="text-sm font-medium text-gray-800">{version.commit}</h4>
                      <span className="ml-2 px-1.5 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">{version.type}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-1">{version.message}</p>
                    
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <span>{version.author.name}</span>
                      <span className="mx-1.5">•</span>
                      <span>{version.date}</span>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200 transition-colors">
                        <i className="fa fa-eye mr-1"></i> 查看
                      </button>
                      <button className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200 transition-colors">
                        <i className="fa fa-code-fork mr-1"></i> 检出
                      </button>
                      <button className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200 transition-colors">
                        <i className="fa fa-compare mr-1"></i> 对比
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

VersionHistory.propTypes = {
  versions: PropTypes.array.isRequired,
  selectedBranch: PropTypes.string
};

export default VersionHistory;    