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
  {
    id: 'database-design',
    name: '数据库设计',
    type: '后端',
    status: '活跃',
    branches: 5,
    favorite: false,
    icon: 'fa-database'
  },
  {
    id: 'mobile-app',
    name: '移动应用',
    type: '前端',
    status: '活跃',
    branches: 8,
    favorite: false,
    icon: 'fa-mobile'
  },
  {
    id: 'cicd-pipeline',
    name: 'CI/CD 流水线',
    type: '运维',
    status: '活跃',
    branches: 6,
    favorite: false,
    icon: 'fa-cogs'
  },
  {
    id: 'security-audit',
    name: '安全审计',
    type: '安全',
    status: '待处理',
    branches: 3,
    favorite: false,
    icon: 'fa-lock'
  },
  {
    id: 'performance-optimization',
    name: '性能优化',
    type: '后端',
    status: '待处理',
    branches: 4,
    favorite: false,
    icon: 'fa-tachometer-alt'
  },
  {
    id: 'user-authentication',
    name: '用户认证',
    type: '后端',
    status: '待处理',
    branches: 3,
    favorite: false,
    icon: 'fa-user-lock'
  },
  {
    id: 'legacy-api',
    name: '遗留 API',
    type: '后端',
    status: '已归档',
    branches: 2,
    favorite: false,
    icon: 'fa-archive'
  },
  {
    id: 'deprecated-module',
    name: '已弃用模块',
    type: '后端',
    status: '已归档',
    branches: 1,
    favorite: false,
    icon: 'fa-trash-alt'
  },
  {
    id: 'microservice-refactor',
    name: '微服务重构',
    type: '后端',
    status: '已暂停',
    branches: 7,
    favorite: false,
    icon: 'fa-sync-alt'
  },
  {
    id: 'data-analysis-platform',
    name: '数据分析平台',
    type: '后端',
    status: '已暂停',
    branches: 5,
    favorite: false,
    icon: 'fa-chart-line'
  }
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
    { name: 'prototype', status: '开发中', versions: 2, favorite: true },
    { name: 'feature/dashboard', status: '开发中', versions: 1, favorite: false },
    { name: 'bugfix/layout', status: '待审核', versions: 1, favorite: false }
  ],
  'webapp-frontend': [
    { name: 'main', status: '活跃', versions: 15, favorite: true },
    { name: 'develop', status: '活跃', versions: 10, favorite: true },
    { name: 'feature/theme', status: '开发中', versions: 4, favorite: true },
    { name: 'bugfix/responsive', status: '待审核', versions: 2, favorite: false }
  ]
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

// 补充分支版本数据
Object.assign(mockVersions, {
  'api-service': {
    'develop': [
      {
        id: 'v0.8.0',
        commit: 'c3d4e5f6',
        type: '功能',
        message: '添加API文档生成功能',
        date: '2023-06-20 11:30',
        author: { name: '王强', avatar: 'https://picsum.photos/id/1019/200/200' }
      },
      {
        id: 'v0.7.0',
        commit: 'd4e5f6g7',
        type: '优化',
        message: '优化API响应速度',
        date: '2023-06-18 14:45',
        author: { name: '刘芳', avatar: 'https://picsum.photos/id/1020/200/200' }
      }
    ],
    'feature/auth': [
      {
        id: 'v0.5.0',
        commit: 'e5f6g7h8',
        type: '功能',
        message: '实现JWT认证',
        date: '2023-06-15 09:20',
        author: { name: '陈杰', avatar: 'https://picsum.photos/id/1021/200/200' }
      }
    ]
  },
  'automation-test': {
    'feature/new-test': [
      {
        id: 'v0.3.0',
        commit: 'f6g7h8i9',
        type: '功能',
        message: '添加接口测试用例',
        date: '2023-06-12 16:10',
        author: { name: '周婷', avatar: 'https://picsum.photos/id/1022/200/200' }
      }
    ]
  },
  'performance-test': {
    'optimize/load-time': [
      {
        id: 'v0.2.0',
        commit: 'g7h8i9j0',
        type: '优化',
        message: '优化加载时间测试',
        date: '2023-06-09 13:55',
        author: { name: '吴刚', avatar: 'https://picsum.photos/id/1023/200/200' }
      }
    ]
  },
  'data-visualization': {
    'feature/dashboard': [
      {
        id: 'v0.1.0',
        commit: 'h8i9j0k1',
        type: '原型',
        message: '创建仪表盘原型',
        date: '2023-06-07 15:30',
        author: { name: '郑晓', avatar: 'https://picsum.photos/id/1024/200/200' }
      }
    ],
    'bugfix/layout': [
      {
        id: 'v0.0.1',
        commit: 'i9j0k1l2',
        type: '修复',
        message: '修复布局问题',
        date: '2023-06-06 10:45',
        author: { name: '王敏', avatar: 'https://picsum.photos/id/1025/200/200' }
      }
    ]
  },
  'webapp-frontend': {
    'main': [
      {
        id: 'v2.0.0',
        commit: 'j0k1l2m3',
        type: '发布',
        message: 'WebApp前端2.0版本发布',
        date: '2023-06-28 14:00',
        author: { name: '李阳', avatar: 'https://picsum.photos/id/1026/200/200' }
      },
      {
        id: 'v1.9.0',
        commit: 'k1l2m3n4',
        type: '功能',
        message: '添加主题切换功能',
        date: '2023-06-26 11:20',
        author: { name: '张悦', avatar: 'https://picsum.photos/id/1027/200/200' }
      }
    ],
    'develop': [
      {
        id: 'v1.8.0',
        commit: 'l2m3n4o5',
        type: '功能',
        message: '实现响应式布局',
        date: '2023-06-24 15:10',
        author: { name: '刘鹏', avatar: 'https://picsum.photos/id/1028/200/200' }
      }
    ],
    'feature/theme': [
      {
        id: 'v1.5.0',
        commit: 'm3n4o5p6',
        type: '功能',
        message: '开发新主题样式',
        date: '2023-06-21 09:30',
        author: { name: '陈晨', avatar: 'https://picsum.photos/id/1029/200/200' }
      }
    ],
    'bugfix/responsive': [
      {
        id: 'v1.0.1',
        commit: 'n4o5p6q7',
        type: '修复',
        message: '修复响应式布局问题',
        date: '2023-06-19 14:20',
        author: { name: '周伟', avatar: 'https://picsum.photos/id/1030/200/200' }
      }
    ]
  }
});

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