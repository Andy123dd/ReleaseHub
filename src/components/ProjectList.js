import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Button,
  Space,
  Badge,
  Layout,
  Card,
  List,
  Empty,
  Spin,
  Dropdown,
  Menu,
  Tag,
  Avatar,
  Typography,
} from 'antd';
import {
  SearchOutlined,
  StarOutlined,
  StarFilled,
  FilterOutlined,
  MoreOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  BellOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  fetchProjects,
  projectCategories,
  statusStyles,
  toggleFavorite,
} from '../api';
import ProjectCategoryList from './ProjectCategoryList';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    loadProjects();
    setCategories(projectCategories || {});
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await fetchProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (projectId) => {
    try {
      await toggleFavorite(projectId);
      setProjects(
        projects.map((project) =>
          project.id === projectId
            ? { ...project, favorite: !project.favorite }
            : project
        )
      );
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  let filteredProjects = [];
  if (projects != null) {
    filteredProjects = projects.filter((project) => {
      const matchesSearch = project.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || project.categoryId === selectedCategory;
      const matchesFavorite = !showFavorites || project.favorite;
      return matchesSearch && matchesCategory && matchesFavorite;
    });
  }

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleProjectSelect = (projectId) => {
    console.log('Selected project ID:', projectId);
    // Add project selection logic here
  };

  return (
    <Layout className="h-full">
      <Sider width={240} theme="light" className="border-r">
        <ProjectCategoryList
          projectCategories={categories}
          projects={projects}
          statusStyles={statusStyles}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
          onProjectSelect={handleProjectSelect}
        />
      </Sider>
      <Layout className="flex-1 overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <Space size="middle">
            <Button
              icon={<AppstoreOutlined />}
              onClick={() => setViewMode('grid')}
              type={viewMode === 'grid' ? 'primary' : 'default'}
              size="small"
            />
            <Button
              icon={<UnorderedListOutlined />}
              onClick={() => setViewMode('list')}
              type={viewMode === 'list' ? 'primary' : 'default'}
              size="small"
            />
          </Space>
          <Space size="middle">
            <Button
              icon={
                showFavorites ? (
                  <StarFilled style={{ color: '#faad14' }} />
                ) : (
                  <StarOutlined />
                )
              }
              onClick={() => setShowFavorites(!showFavorites)}
              type={showFavorites ? 'primary' : 'default'}
              size="small"
            >
              收藏
            </Button>
            <Button icon={<FilterOutlined />} size="small">
              筛选
            </Button>
          </Space>
        </div>

        <div className="p-4">
          <Space.Compact style={{ width: '100%' }}>
            <Input
              placeholder="搜索项目..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button type="primary">搜索</Button>
          </Space.Compact>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Spin size="large" />
            </div>
          ) : filteredProjects.length === 0 ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="没有找到匹配的项目"
            />
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  hoverable
                  className="h-full flex flex-col"
                >
                  <div className="flex justify-between items-start mb-2">
                    <Badge
                      status={
                        project.status === 'active' ? 'success' : 'default'
                      }
                      text={project.status}
                    />
                    <Dropdown overlay={menu} placement="bottomRight">
                      <Button
                        icon={<MoreOutlined />}
                        size="small"
                        type="text"
                      />
                    </Dropdown>
                  </div>
                  <Card.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={
                      <Space>
                        {project.name}
                        {project.favorite && (
                          <StarFilled
                            style={{ color: '#faad14', fontSize: '16px' }}
                          />
                        )}
                      </Space>
                    }
                    description={
                      <div>
                        <Text type="secondary" className="block mb-1">
                          {project.owner}
                        </Text>
                        <Tag color={project.categoryColor}>
                          {project.categoryName}
                        </Tag>
                      </div>
                    }
                  />
                  <div className="mt-auto pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <Text type="secondary" className="text-sm">
                        {project.updateTime}
                      </Text>
                      <Button
                        icon={
                          project.favorite ? (
                            <StarFilled style={{ color: '#faad14' }} />
                          ) : (
                            <StarOutlined />
                          )
                        }
                        onClick={() => handleToggleFavorite(project.id)}
                        size="small"
                        type="text"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={filteredProjects}
              renderItem={(project) => (
                <List.Item
                  actions={[
                    <Button
                      icon={<StarOutlined />}
                      size="small"
                      type={project.favorite ? 'primary' : 'default'}
                      onClick={() => handleToggleFavorite(project.id)}
                    >
                      {project.favorite ? '已收藏' : '收藏'}
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={
                      <Space>
                        {project.name}
                        {project.favorite && (
                          <StarFilled style={{ color: '#faad14' }} />
                        )}
                      </Space>
                    }
                    description={
                      <div className="flex items-center">
                        <Tag color={project.categoryColor} className="mr-2">
                          {project.categoryName}
                        </Tag>
                        <Text type="secondary" className="mr-2">
                          {project.owner}
                        </Text>
                        <Text type="secondary">{project.updateTime}</Text>
                      </div>
                    }
                  />
                  <Badge
                    status={project.status === 'active' ? 'success' : 'default'}
                    text={project.status}
                  />
                </List.Item>
              )}
            />
          )}
        </div>
      </Layout>
    </Layout>
  );
};

ProjectList.propTypes = {};

export default ProjectList;
