import React, { useState, useEffect } from "react";
import { Card, Button, Layout, Spin, Alert, Typography, Space, Row, Col } from 'antd';
import { PlusOutlined, BranchesOutlined, LoadingOutlined } from '@ant-design/icons';
import BranchList from "./BranchList";
import VersionHistory from "./VersionHistory";
import { fetchProjectBranches, fetchBranchVersions, toggleFavorite } from "../api";

const { Content, Sider } = Layout;
const { Title, Text } = Typography;

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

  if (!selectedProject) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor: '#f5f5f5' }}>
        <Text type="secondary">请选择一个项目</Text>
      </div>
    );
  }

  return (
    <Layout style={{ height: '100%' }}>
      <Content style={{ padding: '0', margin: 0, backgroundColor: '#f5f5f5' }}>
        <Card bordered={false} style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <div>
              <Title level={4} style={{ margin: 0 }}>{selectedProject.name}</Title>
              <Space size="middle" style={{ marginTop: 4 }}>
                <Text type="secondary">项目 ID:</Text>
                <Text strong>PRJ-{selectedProject.id?.toUpperCase() || "0000"}</Text>
                <Text type="secondary">最后更新:</Text>
                <Text>2023-06-25 14:30</Text>
              </Space>
            </div>
            <Space size="small" style={{ marginTop: 16 }}>
              <Button icon={<PlusOutlined />} size="middle">新建分支</Button>
              <Button type="primary" icon={<BranchesOutlined />} size="middle">检出代码</Button>
            </Space>
          </div>
        </Card>

        {loading && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} tip="加载中..." />
          </div>
        )}

        {error && (
          <Alert
            message="错误"
            description={error}
            type="error"
            showIcon
            style={{ margin: '16px' }}
          />
        )}

        <Layout style={{ height: 'calc(100% - 78px)' }}>
          <Sider width={300} theme="light" style={{ borderRight: '1px solid #e8e8e8' }}>
            <BranchList
              branches={branches}
              selectedBranch={selectedBranch}
              projectId={selectedProject?.id}
              onBranchSelect={onBranchSelect}
              onToggleFavorite={onToggleFavorite}
            />
          </Sider>
          <Content style={{ padding: '16px', overflow: 'auto' }}>
            <VersionHistory versions={versions} branchName={selectedBranch}/>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default BranchAndVersionPanel;
