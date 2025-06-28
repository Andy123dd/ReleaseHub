import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import {
  fetchProjects,
  fetchProjectBranches,
  fetchBranchVersions,
} from './api';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('main');
  const [versions, setVersions] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 初始化加载项目数据
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const response = await fetchProjects();
        setProjects(response.data);
        if (response.data.length > 0) {
          setSelectedProjectId(response.data[0].id);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // 加载选中项目的分支
  useEffect(() => {
    if (selectedProjectId) {
      const loadBranches = async () => {
        try {
          setLoading(true);
          const response = await fetchProjectBranches(selectedProjectId);
          setBranches(response.data);
          setSelectedBranch(response.data[0]?.name || 'main');
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      loadBranches();
    }
  }, [selectedProjectId]);

  // 加载选中分支的版本历史
  useEffect(() => {
    if (selectedProjectId && selectedBranch) {
      const loadVersions = async () => {
        try {
          setLoading(true);
          const response = await fetchBranchVersions(
            selectedProjectId,
            selectedBranch
          );
          setVersions(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      loadVersions();
    }
  }, [selectedProjectId, selectedBranch]);

  // 处理项目选择
  const handleProjectSelect = (projectId) => {
    setSelectedProjectId(projectId);
  };

  // 处理分支选择
  const handleBranchSelect = (branchName) => {
    setSelectedBranch(branchName);
  };

  // 处理收藏切换
  const handleToggleFavorite = (projectId, branchName) => {
    const project = projects.find((p) => p.id === projectId);
    let branch = branches.find((b) => b.name === branchName);

    if (!branch) {
      branch = { name: branchName, status: '活跃' };
    }

    // 检查是否已收藏
    const isFavorite = favorites.some(
      (f) => f.projectId === projectId && f.branch.name === branchName
    );

    if (isFavorite) {
      // 取消收藏
      setFavorites(
        favorites.filter(
          (f) => !(f.projectId === projectId && f.branch.name === branchName)
        )
      );
    } else {
      // 添加收藏
      setFavorites([...favorites, { projectId, branch }]);
    }

    // 更新项目分支的收藏状态
    if (project && branches) {
      const updatedBranches = branches.map((b) => {
        if (b.name === branchName) {
          return { ...b, favorite: !b.favorite };
        }
        return b;
      });

      setBranches(updatedBranches);
    }
  };

  // 处理视图切换
  const handleViewChange = (viewType) => {
    // 视图切换逻辑
  };

  return (
    <Router>
      <div className="flex flex-col h-screen overflow-hidden">
        <Header 
          favorites={favorites} 
          onToggleFavorite={handleToggleFavorite} 
        />
        <Main
          projects={projects}
          selectedProjectId={selectedProjectId}
          branches={branches}
          selectedBranch={selectedBranch}
          versions={versions}
          favorites={favorites}
          onProjectSelect={handleProjectSelect}
          onBranchSelect={handleBranchSelect}
          onToggleFavorite={handleToggleFavorite}
          onViewChange={handleViewChange}
          loading={loading}
          error={error}
        />
      </div>
    </Router>
  );
}

export default App;
