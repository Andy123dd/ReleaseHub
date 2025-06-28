export default function VersionHistory({versions, branchName = 'main'}) {
  return (
    <>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-3 border-b border-gray-200 flex items-center justify-between bg-white">
          <h3 className="text-sm font-medium text-gray-700">{branchName} 分支版本历史</h3>
        </div>
        <div className="overflow-y-auto scrollbar-hide flex-1 p-4">
          {/* <!-- 版本时间线 --> */}
          <div className="relative pl-8">
            {versions.length > 0 ? (
              versions.map((version, index) => (
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
              ))
            ) : (
              <div className="text-center py-16 text-gray-500 space-y-3">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                  <i className="fa fa-history text-2xl"></i>
                </div>
                <h4 className="text-base font-medium">暂无版本记录</h4>
                <p className="text-sm max-w-md mx-auto">
                  当前分支尚未创建任何版本记录，提交代码后将自动生成版本历史
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
