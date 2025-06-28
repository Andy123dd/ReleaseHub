import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Dropdown, Menu, Button, Badge, Tag, Space, List, Avatar } from 'antd';
import { SortAscendingOutlined, CaretDownOutlined, CaretRightOutlined, PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const ProjectCategoryList = ({
  projects,
  selectedProjectId,
  projectCategories,
  statusStyles,
  onProjectSelect,
}) => {
  const [sortBy, setSortBy] = useState('name-asc');
  const [sortedProjects, setSortedProjects] = useState({});

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

  // 排序选项菜单
  const sortMenu = (
    <Menu onClick={({ key }) => setSortBy(key)} selectedKeys={[sortBy]}>
      <Menu.Item key="name-asc">按名称排序 (A-Z)</Menu.Item>
      <Menu.Item key="name-desc">按名称排序 (Z-A)</Menu.Item>
      <Menu.Item key="recent">最近更新</Menu.Item>
      <Menu.Item key="oldest">最早更新</Menu.Item>
      <Menu.Item key="most-branches">最多分支</Menu.Item>
      <Menu.Item key="least-branches">最少分支</Menu.Item>
    </Menu>
  );

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-700">项目分类</h3>
        <Space size="small">
          <Button icon={<PlusSquareOutlined />} size="small" onClick={() => {}}>展开全部</Button>
          <Button icon={<MinusSquareOutlined />} size="small" onClick={() => {}}>折叠全部</Button>
          <Dropdown overlay={sortMenu} trigger={['click']}>
            <Button icon={<SortAscendingOutlined />} size="small">排序</Button>
          </Dropdown>
        </Space>
      </div>

      <Collapse bordered defaultActiveKey={Object.keys(projectCategories || {})}>
        {Object.entries(projectCategories || {}).map(([category, categoryProjects]) => {
          if (categoryProjects.length === 0) return null;

          return (
            <Panel
              header={(
                <Space>
                  {statusStyles[category] && <Tag color={statusStyles[category]?.bg?.replace('bg-', '') || 'default'} />}
                  <span>{category}项目</span>
                  <Badge count={categoryProjects.length} size="small" />
                </Space>
              )}
              key={category}
              extra={categoryProjects.length}
            >
              <List
                dataSource={categoryProjects}
                renderItem={project => (
                  <List.Item
                    key={project.id}
                    onClick={() => onProjectSelect(project.id)}
                    className={selectedProjectId === project.id ? 'bg-primary/5' : ''}
                    hoverable
                    actions={[<Badge count={project.branches} size="small" />]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar icon={<span className={`fa ${project.icon}`} />} />}
                      title={project.name}
                    />
                  </List.Item>
                )}
              />
            </Panel>
          );
        })}
      </Collapse>
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
