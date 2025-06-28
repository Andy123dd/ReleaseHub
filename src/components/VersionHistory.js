export default function VersionHistory() {
  return (
    <>
    <div class="flex-1 flex flex-col overflow-hidden">
                    <div class="p-3 border-b border-gray-200 flex items-center justify-between bg-white">
                        <h3 class="text-sm font-medium text-gray-700">main 分支版本历史</h3>
                        <div class="flex items-center space-x-2">
                            <div class="relative">
                                <button class="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500">
                                    <i class="fa fa-search text-xs"></i>
                                </button>
                            </div>
                            <div class="relative">
                                <button class="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500">
                                    <i class="fa fa-filter text-xs"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="overflow-y-auto scrollbar-hide flex-1 p-4">
                        {/* <!-- 版本时间线 --> */}
                        <div class="relative pl-8">
                            {/* <!-- 最新版本 --> */}
                            <div class="mb-6 relative">
                                <div class="absolute left-[-28px] top-0 w-6 h-6 rounded-full bg-green-500 border-2 border-white flex items-center justify-center shadow-md">
                                    <i class="fa fa-check text-white text-xs"></i>
                                </div>
                                <div class="absolute left-[-15px] top-6 w-0.5 h-full bg-gray-200"></div>
                                
                                <div class="bg-white rounded-lg p-4 shadow-sm card-shadow hover-scale">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <h4 class="font-medium text-gray-800">v1.2.0</h4>
                                            <p class="text-sm text-gray-500 mt-0.5">2023-06-25 14:30 · 张明</p>
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <button class="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500">
                                                <i class="fa fa-eye text-xs"></i>
                                            </button>
                                            <button class="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500">
                                                <i class="fa fa-code-fork text-xs"></i>
                                            </button>
                                            <button class="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500">
                                                <i class="fa fa-download text-xs"></i>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div class="mt-3">
                                        <p class="text-sm text-gray-700">添加用户认证和授权模块，优化API响应格式</p>
                                    </div>
                                    
                                    <div class="mt-3 flex flex-wrap gap-2">
                                        <span class="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">已部署</span>
                                        <span class="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">生产环境</span>
                                        <span class="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">API</span>
                                        <span class="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">安全</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* <!-- 其他版本 --> */}
                            <div class="mb-6 relative">
                                <div class="absolute left-[-28px] top-0 w-6 h-6 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center shadow-md">
                                    <i class="fa fa-code text-white text-xs"></i>
                                </div>
                                
                                <div class="bg-white rounded-lg p-4 shadow-sm card-shadow hover-scale">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <h4 class="font-medium text-gray-800">v1.1.0</h4>
                                            <p class="text-sm text-gray-500 mt-0.5">2023-06-18 09:45 · 李华</p>
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <button class="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500">
                                                <i class="fa fa-eye text-xs"></i>
                                            </button>
                                            <button class="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500">
                                                <i class="fa fa-code-fork text-xs"></i>
                                            </button>
                                            <button class="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500">
                                                <i class="fa fa-download text-xs"></i>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div class="mt-3">
                                        <p class="text-sm text-gray-700">实现订单管理API，优化数据库查询性能</p>
                                    </div>
                                    
                                    <div class="mt-3 flex flex-wrap gap-2">
                                        <span class="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">已测试</span>
                                        <span class="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">预发布环境</span>
                                        <span class="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">API</span>
                                        <span class="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">性能</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="mb-6 relative">
                                <div class="absolute left-[-28px] top-0 w-6 h-6 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center shadow-md">
                                    <i class="fa fa-code text-white text-xs"></i>
                                </div>
                                
                                <div class="bg-white rounded-lg p-4 shadow-sm card-shadow hover-scale">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <h4 class="font-medium text-gray-800">v1.0.1</h4>
                                            <p class="text-sm text-gray-500 mt-0.5">2023-06-10 16:20 · 王强</p>
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <button class="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500">
                                                <i class="fa fa-eye text-xs"></i>
                                            </button>
                                            <button class="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500">
                                                <i class="fa fa-code-fork text-xs"></i>
                                            </button>
                                            <button class="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500">
                                                <i class="fa fa-download text-xs"></i>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div class="mt-3">
                                        <p class="text-sm text-gray-700">修复用户注册和登录API的bug，增强输入验证</p>
                                    </div>
                                    
                                    <div class="mt-3 flex flex-wrap gap-2">
                                        <span class="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">已测试</span>
                                        <span class="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">API</span>
                                        <span class="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">修复</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="mb-6 relative">
                                <div class="absolute left-[-28px] top-0 w-6 h-6 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center shadow-md">
                                    <i class="fa fa-code text-white text-xs"></i>
                                </div>
                                
                                <div class="bg-white rounded-lg p-4 shadow-sm card-shadow hover-scale">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <h4 class="font-medium text-gray-800">v1.0.0</h4>
                                            <p class="text-sm text-gray-500 mt-0.5">2023-06-01 11:15 · 赵静</p>
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <button class="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500">
                                                <i class="fa fa-eye text-xs"></i>
                                            </button>
                                            <button class="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500">
                                                <i class="fa fa-code-fork text-xs"></i>
                                            </button>
                                            <button class="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500">
                                                <i class="fa fa-download text-xs"></i>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div class="mt-3">
                                        <p class="text-sm text-gray-700">初始版本，实现基本API功能和用户管理</p>
                                    </div>
                                    
                                    <div class="mt-3 flex flex-wrap gap-2">
                                        <span class="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">已测试</span>
                                        <span class="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">API&lt;/</span></div></div></div></div></div></div>
    </>
  )
}