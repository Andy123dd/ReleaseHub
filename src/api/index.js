import axios from 'axios';

// 模拟API基地址
const API_BASE_URL = 'https://api.example.com';

// 模拟延迟，以显示加载状态
const simulateDelay = (ms = 100) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
    icon: 'fa-code',
  },
  {
    id: 'api-service',
    name: 'API 服务',
    type: '后端',
    status: '活跃',
    branches: 8,
    favorite: true,
    icon: 'fa-server',
    selected: true,
  },
  {
    id: 'automation-test',
    name: '自动化测试工具',
    type: '测试',
    status: '测试',
    branches: 5,
    favorite: false,
    icon: 'fa-flask',
  },
  {
    id: 'performance-test',
    name: '性能测试套件',
    type: '测试',
    status: '测试',
    branches: 3,
    favorite: false,
    icon: 'fa-tachometer',
  },
  {
    id: 'data-visualization',
    name: '数据可视化平台',
    type: '前端',
    status: '计划中',
    branches: 0,
    favorite: true,
    icon: 'fa-bar-chart',
  },
  {
    id: 'database-design',
    name: '数据库设计',
    type: '后端',
    status: '活跃',
    branches: 5,
    favorite: false,
    icon: 'fa-database',
  },
  {
    id: 'mobile-app',
    name: '移动应用',
    type: '前端',
    status: '活跃',
    branches: 8,
    favorite: false,
    icon: 'fa-mobile',
  },
  {
    id: 'cicd-pipeline',
    name: 'CI/CD 流水线',
    type: '运维',
    status: '活跃',
    branches: 6,
    favorite: false,
    icon: 'fa-cogs',
  },
  {
    id: 'security-audit',
    name: '安全审计',
    type: '安全',
    status: '待处理',
    branches: 3,
    favorite: false,
    icon: 'fa-lock',
  },
  {
    id: 'performance-optimization',
    name: '性能优化',
    type: '后端',
    status: '待处理',
    branches: 4,
    favorite: false,
    icon: 'fa-tachometer-alt',
  },
  {
    id: 'user-authentication',
    name: '用户认证',
    type: '后端',
    status: '待处理',
    branches: 3,
    favorite: false,
    icon: 'fa-user-lock',
  },
  {
    id: 'legacy-api',
    name: '遗留 API',
    type: '后端',
    status: '已归档',
    branches: 2,
    favorite: false,
    icon: 'fa-archive',
  },
  {
    id: 'deprecated-module',
    name: '已弃用模块',
    type: '后端',
    status: '已归档',
    branches: 1,
    favorite: false,
    icon: 'fa-trash-alt',
  },
  {
    id: 'microservice-refactor',
    name: '微服务重构',
    type: '后端',
    status: '已暂停',
    branches: 7,
    favorite: false,
    icon: 'fa-sync-alt',
  },
  {
    id: 'data-analysis-platform',
    name: '数据分析平台',
    type: '后端',
    status: '已暂停',
    branches: 5,
    favorite: false,
    icon: 'fa-chart-line',
  },
  {
    id: 'realtime-monitor',
    name: '实时监控系统',
    type: '后端',
    status: '开发中',
    branches: 4,
    favorite: false,
    icon: 'fa-eye',
  },
  {
    id: 'content-management',
    name: '内容管理平台',
    type: '前端',
    status: '活跃',
    branches: 10,
    favorite: true,
    icon: 'fa-file-alt',
  },
  {
    id: 'iot-gateway',
    name: '物联网网关',
    type: '后端',
    status: '测试',
    branches: 5,
    favorite: false,
    icon: 'fa-wifi',
  },
  {
    id: 'game-engine',
    name: '游戏引擎',
    type: '前端',
    status: '计划中',
    branches: 0,
    favorite: true,
    icon: 'fa-gamepad',
  },
  {
    id: 'blockchain-service',
    name: '区块链服务',
    type: '后端',
    status: '开发中',
    branches: 8,
    favorite: false,
    icon: 'fa-link',
  },
  {
    id: 'crm-system',
    name: '客户关系管理',
    type: '前端',
    status: '活跃',
    branches: 12,
    favorite: true,
    icon: 'fa-users',
  },
  {
    id: 'supply-chain',
    name: '供应链管理',
    type: '后端',
    status: '测试',
    branches: 6,
    favorite: false,
    icon: 'fa-truck',
  },
  {
    id: 'ai-model-api',
    name: 'AI模型API',
    type: '后端',
    status: '开发中',
    branches: 7,
    favorite: true,
    icon: 'fa-brain',
  },
  {
    id: 'ecommerce-frontend',
    name: '电商前端',
    type: '前端',
    status: '维护',
    branches: 9,
    favorite: false,
    icon: 'fa-shopping-cart',
  },
  {
    id: 'healthcare-system',
    name: '医疗系统',
    type: '后端',
    status: '计划中',
    branches: 0,
    favorite: false,
    icon: 'fa-heartbeat',
  },
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
    {
      name: 'bugfix/test-issue',
      status: '待审核',
      versions: 2,
      favorite: false,
    },
  ],
  'performance-test': [
    { name: 'main', status: '活跃', versions: 6, favorite: true },
    { name: 'benchmark', status: '测试', versions: 4, favorite: false },
    {
      name: 'optimize/load-time',
      status: '开发中',
      versions: 3,
      favorite: true,
    },
  ],
  'data-visualization': [
    { name: 'main', status: '计划中', versions: 0, favorite: false },
    { name: 'prototype', status: '开发中', versions: 2, favorite: true },
    {
      name: 'feature/dashboard',
      status: '开发中',
      versions: 1,
      favorite: false,
    },
    { name: 'bugfix/layout', status: '待审核', versions: 1, favorite: false },
  ],
  'webapp-frontend': [
    { name: 'main', status: '活跃', versions: 15, favorite: true },
    { name: 'develop', status: '活跃', versions: 10, favorite: true },
    { name: 'feature/theme', status: '开发中', versions: 4, favorite: true },
    {
      name: 'bugfix/responsive',
      status: '待审核',
      versions: 2,
      favorite: false,
    },
  ],
  'database-design': [
    { name: 'main', status: '活跃', versions: 8, favorite: true },
    { name: 'schema-v2', status: '开发中', versions: 4, favorite: true },
    {
      name: 'bugfix/query-optimize',
      status: '待审核',
      versions: 2,
      favorite: false,
    },
  ],
  'mobile-app': [
    { name: 'main', status: '活跃', versions: 12, favorite: true },
    {
      name: 'feature/push-notification',
      status: '开发中',
      versions: 5,
      favorite: true,
    },
    {
      name: 'hotfix/crash-issue',
      status: '已发布',
      versions: 3,
      favorite: true,
    },
    { name: 'develop', status: '测试', versions: 8, favorite: false },
  ],
  'cicd-pipeline': [
    { name: 'main', status: '活跃', versions: 6, favorite: true },
    {
      name: 'feature/docker-upgrade',
      status: '开发中',
      versions: 3,
      favorite: false,
    },
  ],
};

// 分支版本数据
export const mockVersions = {
  'api-service': {
    main: [
      {
        id: 1,
        version: 'v1.2.0',
        date: '2023-06-25 14:30',
        author: '张明',
        description: '添加用户认证和授权模块，优化API响应格式',
        status: '已部署',
        statusColor: 'bg-green-500',
        statusIcon: 'fa-check',
        tags: [
          { label: '已部署', color: 'bg-green-100 text-green-800' },
          { label: '生产环境', color: 'bg-primary/10 text-primary' },
          { label: 'API', color: 'bg-gray-100 text-gray-700' },
          { label: '安全', color: 'bg-gray-100 text-gray-700' },
        ],
      },
      {
        id: 2,
        version: 'v1.1.0',
        date: '2023-06-18 09:45',
        author: '李华',
        description: '实现订单管理API，优化数据库查询性能',
        status: '已测试',
        statusColor: 'bg-blue-500',
        statusIcon: 'fa-code',
        tags: [
          { label: '已测试', color: 'bg-blue-100 text-blue-800' },
          { label: '预发布环境', color: 'bg-primary/10 text-primary' },
          { label: 'API', color: 'bg-gray-100 text-gray-700' },
          { label: '性能', color: 'bg-gray-100 text-gray-700' },
        ],
      },
      {
        id: 3,
        version: 'v1.0.1',
        date: '2023-06-10 16:20',
        author: '王强',
        description: '修复用户注册和登录API的bug，增强输入验证',
        status: '已测试',
        statusColor: 'bg-blue-500',
        statusIcon: 'fa-code',
        tags: [
          { label: '已测试', color: 'bg-blue-100 text-blue-800' },
          { label: 'API', color: 'bg-gray-100 text-gray-700' },
          { label: '修复', color: 'bg-gray-100 text-gray-700' },
        ],
      },
      {
        id: 4,
        version: 'v1.0.0',
        date: '2023-06-01 11:15',
        author: '赵静',
        description: '初始版本，实现基本API功能和用户管理',
        status: '已测试',
        statusColor: 'bg-blue-500',
        statusIcon: 'fa-code',
        tags: [
          { label: '已测试', color: 'bg-blue-100 text-blue-800' },
          { label: 'API', color: 'bg-gray-100 text-gray-700' },
        ],
      },
    ],
    // 其他分支版本...
  },
};

// 项目状态样式映射
export const statusStyles = {
  活跃: { bg: 'bg-green-100', text: 'text-green-800' },
  待处理: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  已归档: { bg: 'bg-gray-100', text: 'text-gray-800' },
  已暂停: { bg: 'bg-red-100', text: 'text-red-800' },
  计划中: { bg: 'bg-blue-100', text: 'text-blue-800' },
  开发中: { bg: 'bg-blue-100', text: 'text-blue-800' },
  待审核: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  已发布: { bg: 'bg-purple-100', text: 'text-purple-800' },
  紧急修复: { bg: 'bg-red-100', text: 'text-red-800' },
  测试: { bg: 'bg-indigo-100', text: 'text-indigo-800' },
  维护: { bg: 'bg-gray-100', text: 'text-gray-800' },
};

// 项目分类
export const projectCategories = {
  活跃: [
    'webapp-frontend',
    'api-service',
    'database-design',
    'mobile-app',
    'cicd-pipeline',
    'content-management',
    'crm-system'
  ],
  待处理: ['security-audit', 'performance-optimization', 'user-authentication'],
  已归档: ['legacy-api', 'deprecated-module'],
  已暂停: ['microservice-refactor', 'data-analysis-platform'],
  计划中: ['data-visualization', 'game-engine', 'healthcare-system'],
  测试: ['automation-test', 'performance-test', 'iot-gateway', 'supply-chain'],
  开发中: ['realtime-monitor', 'blockchain-service', 'ai-model-api'],
  维护: ['ecommerce-frontend']
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

// 切换分支收藏状态
export const toggleFavorite = (projectId, branchName) => {
  if (mockBranches[projectId]) {
    const branch = mockBranches[projectId].find((b) => b.name === branchName);
    if (branch) {
      branch.favorite = !branch.favorite;
    }
  }
};
