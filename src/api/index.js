import axios from 'axios';

// 模拟API基地址
const API_BASE_URL = 'https://api.example.com';

// 模拟延迟，以显示加载状态
const simulateDelay = (ms = 800) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// 项目数据
export const mockProjects = [
  {
    id: 'webapp-frontend',
    name: 'WebApp 前端',
    type: '前端',
    status: '活跃',
    branches: 12,
    favorite: false,
    icon: 'fa-code'
  },
  {
    id: 'api-service',
    name: 'API 服务',
    type: '后端',
    status: '活跃',
    branches: 8,
    favorite: true,
    icon: 'fa-server',
    selected: true
  },
  {
    id: 'automation-test',
    name: '自动化测试工具',
    type: '测试',
    status: '测试',
    branches: 5,
    favorite: false,
    icon: 'fa-flask'
  },
  {
    id: 'performance-test',
    name: '性能测试套件',
    type: '测试',
    status: '测试',
    branches: 3,
    favorite: false,
    icon: 'fa-tachometer'
  },
  {
    id: 'data-visualization',
    name: '数据可视化平台',
    type: '前端',
    status: '计划中',
    branches: 0,
    favorite: true,
    icon: 'fa-bar-chart'
  },
  // 其他项目...
];

// 项目分支数据
export const mockBranches = {
  'api-service': [
    { name: 'main', status: '活跃', versions: 12, favorite: true },
    { name: 'develop', status: '活跃', versions: 8, favorite: true },
    { name: 'feature/auth', status: '开发中', versions: 5, favorite: true },
    { name: 'bugfix/501', status: '待审核', versions: 3, favorite: false },
    // 其他分支...
  ],
  'automation-test': [
    { name: 'main', status: '活跃', versions: 8, favorite: true },
    { name: 'develop', status: '测试', versions: 5, favorite: false },
    { name: 'feature/new-test', status: '开发中', versions: 3, favorite: true },
    { name: 'bugfix/test-issue', status: '待审核', versions: 2, favorite: false }
  ],
  'performance-test': [
    { name: 'main', status: '活跃', versions: 6, favorite: true },
    { name: 'benchmark', status: '测试', versions: 4, favorite: false },
    { name: 'optimize/load-time', status: '开发中', versions: 3, favorite: true }
  ],
  'data-visualization': [
    { name: 'main', status: '计划中', versions: 0, favorite: false },
    { name: 'prototype', status: '开发中', versions: 2, favorite: true }
  ],
  // 其他项目分支...
};

// 分支版本数据
export const mockVersions = {
  'api-service': {
    'main': [
      {
        id: 'v1.0.0',
        commit: '1a2b3c4d',
        type: '发布',
        message: '初始版本发布',
        date: '2023-06-25 14:30',
        author: {
          name: '张明',
          avatar: 'https://picsum.photos/id/1005/200/200'
        }
      },
      {
        id: 'v0.9.0',
        commit: '5e6f7g8h',
        type: '功能',
        message: '添加用户认证模块',
        date: '2023-06-22 10:15',
        author: {
          name: '李华',
          avatar: 'https://picsum.photos/id/1012/200/200'
        }
      },
      // 其他版本...
    ],
    // 其他分支版本...
  }
};

// 项目状态样式映射
export const statusStyles = {
  '活跃': { bg: 'bg-green-100', text: 'text-green-800' },
  '待处理': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  '已归档': { bg: 'bg-gray-100', text: 'text-gray-800' },
  '已暂停': { bg: 'bg-red-100', text: 'text-red-800' },
  '计划中': { bg: 'bg-blue-100', text: 'text-blue-800' },
  '开发中': { bg: 'bg-blue-100', text: 'text-blue-800' },
  '待审核': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  '已发布': { bg: 'bg-purple-100', text: 'text-purple-800' },
  '紧急修复': { bg: 'bg-red-100', text: 'text-red-800' },
  '测试': { bg: 'bg-indigo-100', text: 'text-indigo-800' }
};

// 项目分类
export const projectCategories = {
  '活跃': ['webapp-frontend', 'api-service', 'database-design', 'mobile-app', 'cicd-pipeline'],
  '待处理': ['security-audit', 'performance-optimization', 'user-authentication'],
  '已归档': ['legacy-api', 'deprecated-module'],
  '已暂停': ['microservice-refactor', 'data-analysis-platform'],
  '计划中': ['data-visualization'],
  '测试': ['automation-test', 'performance-test']
};

// 创建API实例
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// 拦截请求，添加认证等
api.interceptors.request.use(
  (config) => {
    // 可以在这里添加认证头
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 拦截响应，处理错误等
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// 获取项目列表
export const fetchProjects = async () => {
  try {
    // 模拟网络请求
    await simulateDelay();
    
    // 在实际应用中，这里会调用真实的API
    // const response = await api.get('/projects');
    // return response;
    
    // 返回模拟数据
    return { data: mockProjects };
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

// 获取项目分支
export const fetchProjectBranches = async (projectId) => {
  try {
    await simulateDelay();
    
    // 在实际应用中，这里会调用真实的API
    // const response = await api.get(`/projects/${projectId}/branches`);
    // return response;
    
    // 返回模拟数据
    return { data: mockBranches[projectId] || [] };
  } catch (error) {
    console.error('Error fetching branches:', error);
    throw error;
  }
};

// 获取分支版本历史
export const fetchBranchVersions = async (projectId, branchName) => {
  try {
    await simulateDelay();
    
    // 在实际应用中，这里会调用真实的API
    // const response = await api.get(`/projects/${projectId}/branches/${branchName}/versions`);
    // return response;
    
    // 返回模拟数据
    return { data: mockVersions[projectId]?.[branchName] || [] };
  } catch (error) {
    console.error('Error fetching versions:', error);
    throw error;
  }
};    