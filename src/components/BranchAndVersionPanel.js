import React from 'react';
import BranchList from './BranchList';
import VersionHistory from './VersionHistory';

const BranchAndVersionPanel = ({ selectedProject, selectedBranch, onBranchSelect, onToggleFavorite, versionHistory }) => {
    return (
        <section className="flex-1 flex flex-col overflow-hidden bg-gray-50">
            <div className="p-4 bg-white border-b border-gray-200 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">{selectedProject.name || '选择一个项目'}</h2>
                        <div className="flex items-center mt-1 text-sm">
                            <span className="text-gray-500">项目 ID:</span>
                            <span className="ml-1 text-gray-700 font-medium">PRJ-{selectedProject.id?.toUpperCase() || '0000'}</span>
                            <span className="mx-2 text-gray-300">|</span>
                            <span className="text-gray-500">最后更新:</span>
                            <span className="ml-1 text-gray-700">2023-06-25 14:30</span>
                        </div>
                    </div>
                    
                    <div className="flex mt-3 md:mt-0 space-x-2">
                        <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
                            <i className="fa fa-plus mr-1.5"></i> 新建分支
                        </button>
                        <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center">
                            <i className="fa fa-code-fork mr-1.5"></i> 检出代码
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="flex-1 flex overflow-hidden">
                <BranchList 
                    branches={selectedProject.branchList || []} 
                    selectedBranch={selectedBranch}
                    projectId={selectedProject.id}
                    onBranchSelect={onBranchSelect}
                    onToggleFavorite={onToggleFavorite}
                />
                <VersionHistory 
                    versions={versionHistory} 
                />
            </div>
        </section>
    );
};

export default BranchAndVersionPanel;