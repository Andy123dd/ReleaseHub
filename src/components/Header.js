import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Dropdown, Badge, Avatar, Typography, Space } from 'antd';
import { BellOutlined, StarOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import FavoriteBranches from './FavoriteBranches';

const { Header } = Layout;
const { Title } = Typography;

const HeaderComponent = ({ favorites, onToggleFavorite }) => {
  const userMenu = (
    <Menu>
      <Menu.Item key="profile">个人资料</Menu.Item>
      <Menu.Item key="settings">设置</Menu.Item>
      <Menu.Item key="logout">退出登录</Menu.Item>
    </Menu>
  );

  const favoriteMenu = (
    <div className="w-72 p-2">
      <div className="border-b border-gray-100 font-medium text-sm mb-2">我的收藏</div>
      <FavoriteBranches 
        favorites={favorites} 
        onToggleFavorite={onToggleFavorite} 
      />
    </div>
  );

  return (
    <Header className="bg-white border-b px-4 py-0 shadow-sm">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center space-x-6">
          <Title level={4} className="m-0 text-primary">
            <Space>
              <UserOutlined />
              <span>ProjectHub</span>
            </Space>
          </Title>
          <Menu mode="horizontal" selectedKeys={['projects']} className="border-0">
            <Menu.Item key="home">
              <Link to="/">首页</Link>
            </Menu.Item>
            <Menu.Item key="projects">项目管理</Menu.Item>
          </Menu>
        </div>
        <div className="flex items-center space-x-4">
          <Dropdown overlay={favoriteMenu} placement="bottomRight">
            <Badge count={favorites.length} showZero>
              <div className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors">
                <StarOutlined style={{ color: '#faad14' }} />
              </div>
            </Badge>
          </Dropdown>
          <Badge dot>
            <div className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors">
              <BellOutlined />
            </div>
          </Badge>
          <Dropdown overlay={userMenu} placement="bottomRight">
            <div className="flex items-center space-x-2 cursor-pointer px-2 py-1 rounded-full hover:bg-gray-50 transition-colors">
              <Avatar src="https://picsum.photos/id/1005/200/200" alt="用户头像" />
              <span className="text-sm font-medium hidden md:inline">张明</span>
              <DownOutlined style={{ fontSize: '12px' }} />
            </div>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;