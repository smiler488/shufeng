// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { ChevronRight, Calendar, Package, Newspaper, Award, Target, Lightbulb } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

import { LogoHeader } from '@/components/LogoHeader';
import { TabBar } from '@/components/TabBar';
export default function Home(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('home');
  const handleTabChange = tabId => {
    if (tabId === 'home') {
      setActiveTab(tabId);
    } else {
      $w.utils.navigateTo({
        pageId: tabId,
        params: {}
      });
    }
  };
  const companyInfo = {
    name: '黍峰生物Agent',
    title: '光合&表型解决方案',
    description: '黍峰生物是国家高新技术企业，专注于植物光合表型研究领域，自主研发领域前沿的植物光合表型科研仪器，致力于为基础科学研究和作物栽培及育种研究提供先进的仪器装备和定制化服务。',
    mission: '通过科研仪器的自主创新，为科学家和育种家提供新技术和新方法。',
    features: ['国家高新技术企业认证', '植物光合表型研究专家', '自主研发前沿科研仪器', '基础科学研究解决方案', '作物栽培及育种服务', '定制化技术支持'],
    researchAreas: ['植物冠层光合测量', '叶绿素荧光成像', '温室气体通量测量', '植物三维表型及冠层模型计算', '田间高通量作物光合表型检测', '群体光合相关表型检测']
  };
  const productCategories = [{
    id: 1,
    name: '光合-气体交换',
    description: '植物光合气体交换测量系统',
    count: '3个产品',
    color: 'bg-green-500',
    categoryId: 'photosynthesis-gas'
  }, {
    id: 2,
    name: '光合-叶绿素荧光',
    description: '叶绿素荧光成像分析系统',
    count: '4个产品',
    color: 'bg-blue-500',
    categoryId: 'photosynthesis-fluorescence'
  }, {
    id: 3,
    name: '植物表型',
    description: '高通量植物表型分析平台',
    count: '5个产品',
    color: 'bg-purple-500',
    categoryId: 'phenotype'
  }, {
    id: 4,
    name: '环境监测',
    description: '冠层微气候监测系统',
    count: '2个产品',
    color: 'bg-orange-500',
    categoryId: 'environment'
  }];
  const news = [{
    id: 1,
    title: '黍峰生物荣获国家高新技术企业认证',
    date: '2024-01-15',
    summary: '正式通过国家高新技术企业认定，标志着公司在植物光合表型研究领域的技术实力获得国家级认可'
  }, {
    id: 2,
    title: '新一代植物三维表型系统发布',
    date: '2024-01-10',
    summary: '自主研发的植物三维表型分析系统正式发布，检测精度提升40%，处理速度提高60%'
  }, {
    id: 3,
    title: '与中科院所达成战略合作',
    date: '2024-01-05',
    summary: '共同推进植物光合表型研究标准化进程，建立行业技术标准'
  }];
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
    <LogoHeader />

    <div className="px-4 py-6 space-y-6">
      {/* 公司介绍 */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex items-center mb-4">
          <Award className="w-6 h-6 text-green-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            关于我们
          </h2>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">
            {companyInfo.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
            {companyInfo.description}
          </p>
          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-3 rounded">
            <p className="text-sm text-gray-700 dark:text-gray-300 italic">
              <Target className="inline w-4 h-4 mr-1 text-green-600" />
              {companyInfo.mission}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
            <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
            核心优势
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {companyInfo.features.map((feature, index) => <div key={index} className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>{feature}</span>
            </div>)}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">研究领域</h4>
          <div className="space-y-2">
            {companyInfo.researchAreas.map((area, index) => <div key={index} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-2 rounded">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
              <span>{area}</span>
            </div>)}
          </div>
        </div>
      </section>

      {/* 产品中心 */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <Package className="w-5 h-5 mr-2 text-green-600" />
            产品中心
          </h2>
          <button onClick={() => {
            $w.utils.navigateTo({
              pageId: 'products',
              params: {}
            });
          }} className="flex items-center text-green-600 hover:text-green-700 transition-colors">
            <span className="text-sm mr-1">查看全部</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {productCategories.map(category => <div key={category.id} onClick={() => {
            console.log('点击分类:', category.categoryId);
            $w.utils.navigateTo({
              pageId: 'products',
              params: {
                category: category.categoryId
              }
            });
          }} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
            <div className={`${category.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
              <span className="text-xl"></span>
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
              {category.name}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
              {category.description}
            </p>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {category.count}
            </span>
          </div>)}
        </div>
      </section>

      {/* 新闻动态 */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <Newspaper className="w-5 h-5 mr-2 text-green-600" />
            新闻动态
          </h2>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-3">
          {news.map(item => <div key={item.id} className="border-l-4 border-green-500 pl-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer" onClick={() => {
            toast({
              title: '新闻详情',
              description: item.title
            });
          }}>
            <h3 className="font-medium text-gray-900 dark:text-white text-sm">
              {item.title}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <Calendar className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {item.date}
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
              {item.summary}
            </p>
          </div>)}
        </div>
      </section>
    </div>

    <TabBar currentPage={activeTab} onPageChange={handleTabChange} />
  </div>;
}