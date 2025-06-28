export default function VersionHistory() {
  const versions = [
    {
      id: 1,
      version: "v1.2.0",
      date: "2023-06-25 14:30",
      author: "张明",
      description: "添加用户认证和授权模块，优化API响应格式",
      status: "已部署",
      statusColor: "bg-green-500",
      statusIcon: "fa-check",
      tags: [
        { label: "已部署", color: "bg-green-100 text-green-800" },
        { label: "生产环境", color: "bg-primary/10 text-primary" },
        { label: "API", color: "bg-gray-100 text-gray-700" },
        { label: "安全", color: "bg-gray-100 text-gray-700" },
      ],
    },
    {
      id: 2,
      version: "v1.1.0",
      date: "2023-06-18 09:45",
      author: "李华",
      description: "实现订单管理API，优化数据库查询性能",
      status: "已测试",
      statusColor: "bg-blue-500",
      statusIcon: "fa-code",
      tags: [
        { label: "已测试", color: "bg-blue-100 text-blue-800" },
        { label: "预发布环境", color: "bg-primary/10 text-primary" },
        { label: "API", color: "bg-gray-100 text-gray-700" },
        { label: "性能", color: "bg-gray-100 text-gray-700" },
      ],
    },
    {
      id: 3,
      version: "v1.0.1",
      date: "2023-06-10 16:20",
      author: "王强",
      description: "修复用户注册和登录API的bug，增强输入验证",
      status: "已测试",
      statusColor: "bg-blue-500",
      statusIcon: "fa-code",
      tags: [
        { label: "已测试", color: "bg-blue-100 text-blue-800" },
        { label: "API", color: "bg-gray-100 text-gray-700" },
        { label: "修复", color: "bg-gray-100 text-gray-700" },
      ],
    },
    {
      id: 4,
      version: "v1.0.0",
      date: "2023-06-01 11:15",
      author: "赵静",
      description: "初始版本，实现基本API功能和用户管理",
      status: "已测试",
      statusColor: "bg-blue-500",
      statusIcon: "fa-code",
      tags: [
        { label: "已测试", color: "bg-blue-100 text-blue-800" },
        { label: "API", color: "bg-gray-100 text-gray-700" },
      ],
    },
  ];
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
            {versions.map((version, index) => (
              <div key={version.id} className="mb-6 relative">
                <div
                  className={`absolute left-[-28px] top-0 w-6 h-6 rounded-full ${version.statusColor} border-2 border-white flex items-center justify-center shadow-md`}
                >
                  <i
                    className={`fa ${version.statusIcon} text-white text-xs`}
                  ></i>
                </div>
                {index === 0 && (
                  <div className="absolute left-[-15px] top-6 w-0.5 h-full bg-gray-200"></div>
                )}
                <div className="bg-white rounded-lg p-4 shadow-sm card-shadow hover-scale">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {version.version}
                      </h4>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {version.date} · {version.author}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500">
                        <i className="fa fa-eye text-xs"></i>
                      </button>
                      <button className="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500">
                        <i className="fa fa-code-fork text-xs"></i>
                      </button>
                      <button className="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500">
                        <i className="fa fa-download text-xs"></i>
                      </button>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-gray-700">
                      {version.description}
                    </p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {version.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`px-2 py-0.5 ${tag.color} text-xs rounded-full`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
