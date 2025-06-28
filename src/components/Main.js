import React from 'react';
import PropTypes from 'prop-types';
import ProjectList from './ProjectList';
import BranchAndVersionPanel from './BranchAndVersionPanel';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

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
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <main className="flex flex-1 overflow-hidden">
      <ProjectList 
        projects={projects} 
        selectedProjectId={selectedProjectId}
        viewType="all"
        onProjectSelect={onProjectSelect}
        onToggleFavorite={onToggleFavorite}
        favorites={favorites}
        onViewChange={onViewChange}
      />
      <BranchAndVersionPanel 
        selectedProject={projects.find(p => p.id === selectedProjectId)}
        branches={branches}
        selectedBranch={selectedBranch}
        onBranchSelect={onBranchSelect}
        onToggleFavorite={onToggleFavorite}
        versions={versions}
      />
    </main>
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