// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Search, TrendingUp, BarChart3, Calculator, Image, Activity, Star, ChevronRight, Grid, List } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

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

  // 工具数据 - 移除了estimatedTime和users字段
  const tools = [{
    id: 'leafAngle',
    name: '叶倾角测量',
    description: '通过图像处理技术自动测量叶片倾角，支持批量处理和数据分析',
    category: 'measurement',
    icon: TrendingUp,
    difficulty: '中级',
    rating: 4.8,
    tags: ['图像处理', '植物学', '测量'],
    color: 'from-green-400 to-green-600'
  }, {
    id: 'landArea',
    name: '土地面积计算',
    description: '基于GPS或地图数据计算土地面积，支持多种形状和不规则地块',
    category: 'measurement',
    icon: Calculator,
    difficulty: '初级',
    rating: 4.6,
    tags: ['GPS', '地图', '面积计算'],
    color: 'from-blue-400 to-blue-600'
  }, {
    id: 'agriWeather',
    name: '农业气象分析',
    description: '获取和分析农业气象数据，提供作物生长环境评估',
    category: 'data',
    icon: Activity,
    difficulty: '中级',
    rating: 4.7,
    tags: ['气象', '农业', '数据分析'],
    color: 'from-orange-400 to-orange-600'
  }, {
    id: 'imageQuantitativeAnalysis',
    name: '图像量化分析',
    description: '分析生物样本图像，自动测量长度、面积、颜色等指标',
    category: 'measurement',
    icon: Image,
    difficulty: '高级',
    rating: 4.9,
    tags: ['图像分析', '生物样本', '量化'],
    color: 'from-purple-400 to-purple-600'
  }];

  // 分类数据
  const categories = [{
    id: 'all',
    name: '全部工具',
    icon: Grid,
    count: tools.length,
    color: 'from-gray-400 to-gray-600'
  }, {
    id: 'measurement',
    name: '测量分析',
    icon: Calculator,
    count: tools.filter(tool => tool.category === 'measurement').length,
    color: 'from-blue-400 to-blue-600'
  }, {
    id: 'data',
    name: '数据处理',
    icon: BarChart3,
    count: tools.filter(tool => tool.category === 'data').length,
    color: 'from-green-400 to-green-600'
  }];

  // 过滤工具
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || tool.description.toLowerCase().includes(searchQuery.toLowerCase()) || tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 处理工具点击
  const handleToolClick = toolId => {
    $w.utils.navigateTo({
      pageId: toolId,
      params: {}
    });
  };

  // 渲染工具卡片 - 移除了时间和用户信息显示
  const renderToolCard = tool => {
    const Icon = tool.icon;
    return <div key={tool.id} onClick={() => handleToolClick(tool.id)} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden group">
        <div className={`h-2 bg-gradient-to-r ${tool.color}`} />
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${tool.color} text-white`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex items-center space-x-1 text-yellow-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">{tool.rating}</span>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {tool.name}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {tool.description}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {tool.tags.slice(0, 3).map((tag, index) => <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                {tag}
              </span>)}
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-3">
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                {tool.difficulty}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>;
  };

  // 渲染列表视图 - 移除了时间和用户信息显示
  const renderListView = tool => {
    const Icon = tool.icon;
    return <div key={tool.id} onClick={() => handleToolClick(tool.id)} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer p-4 group">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-lg bg-gradient-to-r ${tool.color} text-white flex-shrink-0`}>
            <Icon className="w-6 h-6" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                {tool.name}
              </h3>
              <div className="flex items-center space-x-1 text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">{tool.rating}</span>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-1">
              {tool.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {tool.tags.slice(0, 2).map((tag, index) => <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                    {tag}
                  </span>)}
              </div>
              
              <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                  {tool.difficulty}
                </span>
              </div>
            </div>
          </div>
          
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>;
  };
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      <LogoHeader />
      
      <div className="px-4 py-6">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            科研工具箱
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            专业的科研工具集合，提升您的研究效率
          </p>
        </div>

        {/* 搜索栏 */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="搜索工具名称、描述或标签..." className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white" />
          </div>
        </div>

        {/* 分类过滤 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">工具分类</h2>
            <div className="flex items-center space-x-2">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}>
                <Grid className="w-5 h-5" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}>
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map(category => {
            const Icon = category.icon;
            return <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`p-4 rounded-lg border-2 transition-all duration-200 ${selectedCategory === category.id ? `border-blue-500 bg-gradient-to-r ${category.color} text-white` : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'}`}>
                <div className="flex flex-col items-center space-y-2">
                  <Icon className="w-6 h-6" />
                  <span className="font-medium">{category.name}</span>
                  <span className={`text-sm ${selectedCategory === category.id ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                    {category.count} 个工具
                  </span>
                </div>
              </button>;
          })}
          </div>
        </div>

        {/* 工具列表 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {selectedCategory === 'all' ? '全部工具' : categories.find(cat => cat.id === selectedCategory)?.name}
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              共 {filteredTools.length} 个工具
            </div>
          </div>

          {filteredTools.length === 0 ? <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                未找到相关工具
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                尝试调整搜索关键词或选择其他分类
              </p>
            </div> : <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {viewMode === 'grid' ? filteredTools.map(tool => renderToolCard(tool)) : filteredTools.map(tool => renderListView(tool))}
            </div>}
        </div>
      </div>

      <TabBar currentPage={activeTab} onPageChange={handleTabChange} />
    </div>;
}