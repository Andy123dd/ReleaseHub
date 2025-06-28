import React, { useState, useEffect } from "react";
import BranchList from "./BranchList";
import VersionHistory from "./VersionHistory";
import { fetchProjectBranches, fetchBranchVersions, toggleFavorite } from "../api";

const BranchAndVersionPanel = ({ selectedProject }) => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBranches = async () => {
      if (!selectedProject) return;
      setLoading(true);
      try {
        const response = await fetchProjectBranches(selectedProject.id);
        setBranches(response.data);
        if (response.data.length > 0) {
          setSelectedBranch(response.data[0].name);
        }
      } catch (err) {
        setError("获取分支数据失败");
      } finally {
        setLoading(false);
      }
    };
    loadBranches();
  }, [selectedProject]);

  useEffect(() => {
    const loadVersions = async () => {
      if (!selectedProject || !selectedBranch) return;
      setLoading(true);
      try {
        const response = await fetchBranchVersions(
          selectedProject.id,
          selectedBranch
        );
        setVersions(response.data);
      } catch (err) {
        setError("获取版本数据失败");
      } finally {
        setLoading(false);
      }
    };
    loadVersions();
  }, [selectedProject, selectedBranch]);

  const onBranchSelect = (branchName) => {
    setSelectedBranch(branchName);
  };

  const onToggleFavorite = (projectId, branchName) => {
    toggleFavorite(projectId, branchName);
    setBranches(prevBranches => 
      prevBranches.map(branch => 
        branch.name === branchName 
          ? { ...branch, favorite: !branch.favorite } 
          : branch
      )
    );
  };
  return (
    <section className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <div className="p-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {selectedProject.name || "选择一个项目"}
            </h2>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-gray-500">项目 ID:</span>
              <span className="ml-1 text-gray-700 font-medium">
                PRJ-{selectedProject.id?.toUpperCase() || "0000"}
              </span>
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

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
          <div className="text-gray-600">加载中...</div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
          <div className="text-red-500">{error}</div>
        </div>
      )}
      <div className="flex-1 flex overflow-hidden">
        <BranchList
          branches={branches}
          selectedBranch={selectedBranch}
          projectId={selectedProject?.id}
          onBranchSelect={onBranchSelect}
          onToggleFavorite={onToggleFavorite}
        />
        <VersionHistory versions={versions} branchName={selectedBranch}/>
      </div>
    </section>
  );
};

export default BranchAndVersionPanel;
