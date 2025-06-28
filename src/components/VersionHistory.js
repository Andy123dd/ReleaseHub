import React from 'react';
import PropTypes from 'prop-types';
import { Timeline, Card, Button, Empty, Tag, Typography, Space } from 'antd';
import { SearchOutlined, FilterOutlined, EyeOutlined, BranchesOutlined, DownloadOutlined, HistoryOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const VersionHistory = ({ versions, branchName = 'main' }) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Card bordered={false} className="border-b">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={5}>{branchName} 分支版本历史</Title>
          <Space size="small">
            <Button icon={<SearchOutlined />} size="small" type="text" />
            <Button icon={<FilterOutlined />} size="small" type="text" />
          </Space>
        </div>
      </Card>

      <div className="overflow-y-auto flex-1 p-4">
        {versions.length > 0 ? (
          <Timeline mode="left">
            {versions.map((version, index) => (
              <Timeline.Item
                key={version.id}
                dot={
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    backgroundColor: version.statusColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    border: '2px solid white'
                  }}>
                    {version.statusIcon === 'fa-check' ? (
                      <i className="fa fa-check text-white text-xs" />
                    ) : version.statusIcon === 'fa-exclamation-circle' ? (
                      <i className="fa fa-exclamation-circle text-white text-xs" />
                    ) : (
                      <i className="fa fa-clock-o text-white text-xs" />
                    )}
                  </div>
                }
              >
                <Card hoverable>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div>
                      <Title level={5} style={{ margin: 0 }}>{version.version}</Title>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {version.date} · {version.author}
                      </Text>
                    </div>
                    <Space size="small">
                      <Button icon={<EyeOutlined />} size="small" type="text" />
                      <Button icon={<BranchesOutlined />} size="small" type="text" />
                      <Button icon={<DownloadOutlined />} size="small" type="text" />
                    </Space>
                  </div>

                  <Paragraph style={{ marginBottom: 12, fontSize: 14 }}>
                    {version.description}
                  </Paragraph>

                  <Space size="small">
                    {version.tags.map((tag, tagIndex) => (
                      <Tag key={tagIndex} color={tag.color.replace('bg-', '')} size="small">
                        {tag.label}
                      </Tag>
                    ))}
                  </Space>
                </Card>
              </Timeline.Item>
            ))}
          </Timeline>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <div style={{ textAlign: 'center' }}>
                <Title level={5} style={{ marginBottom: 8 }}>暂无版本记录</Title>
                <Paragraph type="secondary" style={{ margin: 0 }}>
                  当前分支尚未创建任何版本记录，提交代码后将自动生成版本历史
                </Paragraph>
              </div>
            }
            icon={<HistoryOutlined style={{ fontSize: 48, color: '#f0f0f0' }} />
            }
          />
        )}
      </div>
    </div>
  );
};

VersionHistory.propTypes = {
  versions: PropTypes.array.isRequired,
  branchName: PropTypes.string
};

export default VersionHistory;
