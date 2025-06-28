import React from 'react';
import PropTypes from 'prop-types';
import { List, Card, Button, Empty, Tag, Space, Typography } from 'antd';
import {
  StarOutlined,
  StarFilled,
  FilterOutlined,
  MoreOutlined,
  BranchesOutlined,
} from '@ant-design/icons';
import { statusStyles } from '../api';

const { Text } = Typography;

const BranchList = ({
  branches,
  selectedBranch,
  projectId,
  onBranchSelect,
  onToggleFavorite,
}) => {
  return (
    <Card bordered={false} className="h-full">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <Text strong>分支列表</Text>
        <Space size="small">
          <Button icon={<FilterOutlined />} size="small" type="text" />
          <Button icon={<MoreOutlined />} size="small" type="text" />
        </Space>
      </div>

      {branches.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="该项目暂无分支"
          icon={<BranchesOutlined style={{ fontSize: 24, color: '#1890ff' }} />}
        />
      ) : (
        <List
          dataSource={branches}
          bordered
          renderItem={(branch) => (
            <List.Item
              key={branch.name}
              onClick={() => onBranchSelect(branch.name)}
              selected={selectedBranch === branch.name}
              actions={[
                <Text type="secondary" key="version">
                  {branch.versions} 版本
                </Text>,
                <Button
                  key="favorite"
                  type="text"
                  icon={
                    branch.favorite ? (
                      <StarFilled style={{ color: '#faad14' }} />
                    ) : (
                      <StarOutlined />
                    )
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(projectId, branch.name);
                  }}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      backgroundColor:
                        selectedBranch === branch.name ? '#1890ff' : '#f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 12,
                    }}
                  >
                    <BranchesOutlined
                      style={{
                        fontSize: 12,
                        color:
                          selectedBranch === branch.name ? '#fff' : '#8c8c8c',
                      }}
                    />
                  </div>
                }
                title={
                  <Space>
                    <Text
                      strong={selectedBranch === branch.name}
                      style={{
                        color:
                          selectedBranch === branch.name
                            ? '#1890ff'
                            : 'inherit',
                      }}
                    >
                      {branch.name}
                    </Text>
                    {branch.status && (
                      <Tag color={statusStyles[branch.status].bg.replace('bg-','')} size="small">
                        {branch.status}
                      </Tag>
                    )}
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};

BranchList.propTypes = {
  branches: PropTypes.array.isRequired,
  selectedBranch: PropTypes.string,
  projectId: PropTypes.string,
  onBranchSelect: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};

export default BranchList;
