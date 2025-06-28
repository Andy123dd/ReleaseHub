import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Layout, Spin, Alert } from 'antd';
import ProjectList from './ProjectList';
import BranchAndVersionPanel from './BranchAndVersionPanel';

const { Content } = Layout;

const Main = ({ 
  projects, 
  selectedProjectId, 
  branches, 
  selectedBranch, 
  versions,
  favorites,
  onProjectSelect, 
  onBranchSelect, 
  onToggleFavorite,
  onViewChange,
  loading, 
  error 
}) => {
  const [viewType, setViewType] = useState('all');

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="加载中..." />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="加载错误"
        description={error}
        type="error"
        showIcon
        style={{ margin: '20px' }}
      />
    );
  }

  return (
    <Layout style={{ display: 'flex', height: '100vh' }}>
      <ProjectList 
        projects={projects} 
        selectedProjectId={selectedProjectId}
        viewType={viewType}
        onProjectSelect={onProjectSelect}
        onToggleFavorite={onToggleFavorite}
        favorites={favorites}
        onViewChange={(type) => {
          setViewType(type);
          onViewChange(type);
        }}
      />
      <Content style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
        <BranchAndVersionPanel 
          selectedProject={projects.find(p => p.id === selectedProjectId)}
          branches={branches}
          selectedBranch={selectedBranch}
          onBranchSelect={onBranchSelect}
          onToggleFavorite={onToggleFavorite}
          versions={versions}
        />
      </Content>
    </Layout>
  );
};

Main.propTypes = {
  projects: PropTypes.array.isRequired,
  selectedProjectId: PropTypes.string,
  branches: PropTypes.array.isRequired,
  selectedBranch: PropTypes.string,
  versions: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  onProjectSelect: PropTypes.func.isRequired,
  onBranchSelect: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onViewChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default Main;