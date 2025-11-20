// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Calculator, Beaker, Microscope, Database, BarChart3, Settings, Zap, Leaf } from 'lucide-react';
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
  const tools = [{
    id: 1,
    name: '表型数据计算器',
    description: '植物生长指标快速计算',
    icon: Calculator,
    color: 'bg-blue-500',
    category: '数据分析'
  }, {
    id: 2,
    name: '实验配方助手',
    description: '培养基配方智能推荐',
    icon: Beaker,
    color: 'bg-purple-500',
    category: '实验工具'
  }, {
    id: 3,
    name: '显微镜图像分析',
    description: '细胞结构智能识别',
    icon: Microscope,
    color: 'bg-green-500',
    category: '图像处理'
  }, {
    id: 4,
    name: '基因数据库',
    description: '植物基因信息查询',
    icon: Database,
    color: 'bg-orange-500',
    category: '数据查询'
  }, {
    id: 5,
    name: '生长曲线分析',
    description: '植物生长趋势可视化',
    icon: BarChart3,
    color: 'bg-red-500',
    category: '数据可视化'
  }, {
    id: 6,
    name: '环境参数设置',
    description: '实验环境智能配置',
    icon: Settings,
    color: 'bg-gray-500',
    category: '实验配置'
  }, {
    id: 7,
    name: '快速检测工具',
    description: '植物病害快速识别',
    icon: Zap,
    color: 'bg-yellow-500',
    category: '检测工具'
  }, {
    id: 8,
    name: '叶片面积测量',
    description: '叶片表面积精确计算',
    icon: Leaf,
    color: 'bg-teal-500',
    category: '测量工具'
  }];
  const categories = ['全部', '数据分析', '实验工具', '图像处理', '数据查询', '数据可视化', '实验配置', '检测工具', '测量工具'];
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const filteredTools = selectedCategory === '全部' ? tools : tools.filter(tool => tool.category === selectedCategory);
  const handleToolClick = tool => {
    toast({
      title: '工具启动',
      description: `正在打开${tool.name}...`
    });
  };
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
          <LogoHeader />
          
          <div className="px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              科研工具箱
            </h1>

            {/* 分类筛选 */}
            <div className="mb-6">
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {categories.map(category => <button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category ? 'bg-green-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'}`}>
                    {category}
                  </button>)}
              </div>
            </div>

            {/* 工具网格 */}
            <div className="grid grid-cols-2 gap-4">
              {filteredTools.map(tool => {
          const Icon = tool.icon;
          return <div key={tool.id} onClick={() => handleToolClick(tool)} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className={`${tool.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                      {tool.description}
                    </p>
                    <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 rounded">
                      {tool.category}
                    </span>
                  </div>;
        })}
            </div>
          </div>

          <TabBar currentPage={activeTab} onPageChange={handleTabChange} />
        </div>;
}