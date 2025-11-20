// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Calculator, Beaker, Microscope, Database, BarChart3, Settings, Zap, Leaf, Ruler, Map, Cloud } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

import { LogoHeader } from '@/components/LogoHeader';
import { TabBar } from '@/components/TabBar';
export default function Hub(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('hub');
  const handleTabChange = tabId => {
    if (tabId === 'hub') {
      setActiveTab(tabId);
    } else {
      $w.utils.navigateTo({
        pageId: tabId,
        params: {}
      });
    }
  };

  // 更新工具列表，添加农业气象分析工具
  const tools = [{
    id: 1,
    name: '叶片角度测量',
    description: '植物叶片角度精确测量工具',
    icon: Ruler,
    color: 'bg-green-500',
    category: '测量工具',
    pageId: 'leafAngle'
  }, {
    id: 2,
    name: '土地面积测量',
    description: '农田土地面积快速计算',
    icon: Map,
    color: 'bg-blue-500',
    category: '测量工具',
    pageId: 'landArea'
  }, {
    id: 3,
    name: '农业气象分析',
    description: 'NASA POWER气象数据获取与分析',
    icon: Cloud,
    color: 'bg-sky-500',
    category: '数据分析',
    pageId: 'agriWeather'
  }];
  const handleToolClick = tool => {
    // 直接跳转到对应页面，而不是显示提示
    if (tool.pageId) {
      $w.utils.navigateTo({
        pageId: tool.pageId,
        params: {}
      });
    } else {
      toast({
        title: '工具启动',
        description: `正在打开${tool.name}...`
      });
    }
  };
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
          <LogoHeader />
          
          <div className="px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              科研工具箱
            </h1>

            {/* 工具列表 */}
            <div className="space-y-4">
              {tools.map(tool => {
          const Icon = tool.icon;
          return <div key={tool.id} onClick={() => handleToolClick(tool)} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className={`${tool.color} w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {tool.description}
                        </p>
                      </div>
                      <div className="text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>;
        })}
            </div>

            {/* 空状态提示 */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                更多科研工具正在开发中，敬请期待
              </p>
            </div>
          </div>

          <TabBar currentPage={activeTab} onPageChange={handleTabChange} />
        </div>;
}