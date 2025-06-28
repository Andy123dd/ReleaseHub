export default function BranchList()
{
  return (
    <>
    <div class="w-full md:w-64 lg:w-72 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
                    <div class="p-3 border-b border-gray-100 flex items-center justify-between">
                        <h3 class="text-sm font-medium text-gray-700">分支列表</h3>
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
                    
                    <div class="overflow-y-auto scrollbar-hide flex-1">
                        <div class="p-3 flex items-center justify-between bg-primary/5 border-l-2 border-primary cursor-pointer">
                            <div class="flex items-center">
                                <div class="w-5 h-5 rounded-full bg-primary flex items-center justify-center mr-2">
                                    <i class="fa fa-code-fork text-white text-xs"></i>
                                </div>
                                <span class="text-sm font-medium text-primary">main</span>
                                <span class="ml-2 px-1.5 py-0.5 bg-green-100 text-green-800 text-xs rounded-full badge-pulse">活跃</span>
                            </div>
                            <span class="text-xs text-gray-500">12 版本</span>
                        </div>
                        
                        <div class="p-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer hover-scale">
                            <div class="flex items-center">
                                <div class="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                                    <i class="fa fa-code-fork text-gray-600 text-xs"></i>
                                </div>
                                <span class="text-sm font-medium text-gray-700">develop</span>
                                <span class="ml-2 px-1.5 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">活跃</span>
                            </div>
                            <span class="text-xs text-gray-500">8 版本</span>
                        </div>
                        
                        <div class="p-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer hover-scale">
                            <div class="flex items-center">
                                <div class="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                                    <i class="fa fa-code-fork text-gray-600 text-xs"></i>
                                </div>
                                <span class="text-sm font-medium text-gray-700">feature/auth</span>
                                <span class="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">开发中</span>
                            </div>
                            <span class="text-xs text-gray-500">5 版本</span>
                        </div>
                        
                        <div class="p-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer hover-scale">
                            <div class="flex items-center">
                                <div class="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                                    <i class="fa fa-code-fork text-gray-600 text-xs"></i>
                                </div>
                                <span class="text-sm font-medium text-gray-700">bugfix/501</span>
                                <span class="ml-2 px-1.5 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">待审核</span>
                            </div>
                            <span class="text-xs text-gray-500">3 版本</span>
                        </div>
                        
                        <div class="p-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer hover-scale">
                            <div class="flex items-center">
                                <div class="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                                    <i class="fa fa-code-fork text-gray-600 text-xs"></i>
                                </div>
                                <span class="text-sm font-medium text-gray-700">release/v1.2</span>
                                <span class="ml-2 px-1.5 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-full">预发布</span>
                            </div>
                            <span class="text-xs text-gray-500">2 版本</span>
                        </div>
                        
                        <div class="p-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer hover-scale">
                            <div class="flex items-center">
                                <div class="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                                    <i class="fa fa-code-fork text-gray-600 text-xs"></i>
                                </div>
                                <span class="text-sm font-medium text-gray-700">feature/payment</span>
                                <span class="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">开发中</span>
                            </div>
                            <span class="text-xs text-gray-500">4 版本</span>
                        </div>
                        
                        <div class="p-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer hover-scale">
                            <div class="flex items-center">
                                <div class="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                                    <i class="fa fa-code-fork text-gray-600 text-xs"></i>
                                </div>
                                <span class="text-sm font-medium text-gray-700">hotfix/404</span>
                                <span class="ml-2 px-1.5 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">紧急修复</span>
                            </div>
                            <span class="text-xs text-gray-500">1 版本</span>
                        </div>
                        
                        <div class="p-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer hover-scale">
                            <div class="flex items-center">
                                <div class="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                                    <i class="fa fa-code-fork text-gray-600 text-xs"></i>
                                </div>
                                <span class="text-sm font-medium text-gray-700">feature/docs</span>
                                <span class="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">开发中</span>
                            </div>
                            <span class="text-xs text-gray-500">2 版本</span>
                        </div>
                    </div>
                </div>
    </>
  )
}