// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { Microscope, Calculator, Cloud, Map, Thermometer, Image, Beaker, Dna, Activity, ChevronRight, Star, TrendingUp } from 'lucide-react';

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

  // 工具分类
  const toolCategories = [{
    id: 'measurement',
    name: '测量分析',
    icon: Calculator,
    color: 'blue',
    tools: [{
      id: 'leafAngle',
      name: '叶倾角测量',
      description: '测量植物叶片的倾斜角度，分析植物形态结构',
      icon: Activity,
      difficulty: '初级',
      time: '5分钟',
      rating: 4.5,
      users: 1280
    }, {
      id: 'landArea',
      name: '土地面积计算',
      description: '通过地图标记计算不规则地块的面积',
      icon: Map,
      difficulty: '中级',
      time: '10分钟',
      rating: 4.8,
      users: 890
    }, {
      id: 'imageQuantitativeAnalysis',
      name: '图像量化分析',
      description: '分析生物样本图像，自动测量长度、面积、颜色等指标',
      icon: Image,
      difficulty: '高级',
      time: '15分钟',
      rating: 4.9,
      users: 650
    }]
  }, {
    id: 'environmental',
    name: '环境监测',
    icon: Cloud,
    color: 'green',
    tools: [{
      id: 'agriWeather',
      name: '农业气象分析',
      description: '获取和分析农业气象数据，支持作物生长研究',
      icon: Thermometer,
      difficulty: '中级',
      time: '8分钟',
      rating: 4.6,
      users: 1100
    }]
  }, {
    id: 'laboratory',
    name: '实验室工具',
    icon: Beaker,
    color: 'purple',
    tools: [{
      id: 'coming-soon-lab',
      name: '溶液配制计算',
      description: '计算化学溶液配制所需的溶质和溶剂用量',
      icon: Calculator,
      difficulty: '初级',
      time: '3分钟',
      rating: 0,
      users: 0,
      comingSoon: true
    }, {
      id: 'coming-soon-dna',
      name: 'DNA浓度计算',
      description: '计算DNA样本浓度和纯度，支持实验数据分析',
      icon: Dna,
      difficulty: '中级',
      time: '5分钟',
      rating: 0,
      users: 0,
      comingSoon: true
    }]
  }];

  // 处理工具点击
  const handleToolClick = toolId => {
    if (toolId.startsWith('coming-soon')) {
      toast({
        title: '功能开发中',
        description: '该工具正在开发中，敬请期待！',
        duration: 3000
      });
      return;
    }

    // 导航到对应工具页面
    $w.utils.navigateTo({
      pageId: toolId,
      params: {}
    });
  };

  // 处理标签页切换
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

  // 渲染星级评分
  const renderRating = rating => {
    if (rating === 0) return null;
    return <div className="flex items-center">
        {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : i < rating ? 'text-yellow-400 fill-current opacity-50' : 'text-gray-300'}`} />)}
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      </div>;
  };
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      <LogoHeader />
      
      <div className="px-4 py-6">
        {/* 页面标题 */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6 shadow-sm mb-6">
          <div className="flex items-center space-x-3">
            <Microscope className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">科研工具箱</h1>
              <p className="text-blue-100">专业的科研数据分析工具集合</p>
            </div>
          </div>
        </div>

        {/* 统计信息 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">总工具数</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                <Calculator className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">活跃用户</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">3.2K</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">分析次数</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">15.8K</p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">准确率</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">98.5%</p>
              </div>
              <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg">
                <Star className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        {/* 工具分类列表 */}
        <div className="space-y-6">
          {toolCategories.map(category => <div key={category.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className={`bg-${category.color}-50 dark:bg-${category.color}-900/20 px-6 py-4 border-b border-${category.color}-100 dark:border-${category.color}-800`}>
                <div className="flex items-center space-x-3">
                  <category.icon className={`w-6 h-6 text-${category.color}-600 dark:text-${category.color}-400`} />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{category.name}</h2>
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                    {category.tools.length} 个工具
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {category.tools.map(tool => <div key={tool.id} onClick={() => handleToolClick(tool.id)} className={`border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer group ${tool.comingSoon ? 'opacity-75' : 'hover:border-blue-300 dark:hover:border-blue-600'}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className={`bg-${category.color}-100 dark:bg-${category.color}-900 p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                          <tool.icon className={`w-6 h-6 text-${category.color}-600 dark:text-${category.color}-400`} />
                        </div>
                        {tool.comingSoon && <span className="bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-full text-xs font-medium">
                            开发中
                          </span>}
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tool.name}
                      </h3>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {tool.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                        <span className="flex items-center">
                          <span className={`w-2 h-2 rounded-full bg-${tool.difficulty === '初级' ? 'green' : tool.difficulty === '中级' ? 'yellow' : 'red'}-400 mr-1`}></span>
                          {tool.difficulty}
                        </span>
                        <span>{tool.time}</span>
                      </div>
                      
                      {!tool.comingSoon && <div className="flex items-center justify-between">
                          {renderRating(tool.rating)}
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <span>{tool.users}人使用</span>
                          </div>
                        </div>}
                      
                      <div className="mt-3 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300">
                        {tool.comingSoon ? '敬请期待' : '立即使用'}
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>)}
                </div>
              </div>
            </div>)}
        </div>

        {/* 使用提示 */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
              <Microscope className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">使用提示</h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• 选择适合您研究需求的工具，按照提示操作即可完成分析</li>
                <li>• 所有工具均支持数据导出，方便后续处理和报告生成</li>
                <li>• 如有问题，可以查看工具内的帮助文档或联系技术支持</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <TabBar currentPage={activeTab} onPageChange={handleTabChange} />
    </div>;
}