// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { User, Settings, HelpCircle, Phone, Mail, MapPin, Navigation, Globe, MessageCircle, ChevronRight, Shield, FileText, Star, LogOut, Award, Building } from 'lucide-react'; // @ts-ignore;
import { useToast } from '@/components/ui';import { LogoHeader } from '@/components/LogoHeader';import { TabBar } from '@/components/TabBar';export default function Profile(props) {const { $w } = props;
  const {
    toast } =
  useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const handleTabChange = (tabId) => {
    if (tabId === 'profile') {
      setActiveTab(tabId);
    } else {
      $w.utils.navigateTo({
        pageId: tabId,
        params: {} });

    }
  };
  const contactInfo = {
    phone: '400-1866090',
    email: 'info@shu-feng.com.cn',
    website: 'https://www.shu-feng.com.cn/',
    address: '上海市中国(上海)自由贸易试验区临港新片区云汉路979号2楼',
    workHours: '周一至周五 9:00-18:00',
    emergencySupport: '7×24小时技术支持' };

  const companyInfo = {
    name: '黍峰生物Agent',
    title: '光合&表型解决方案',
    description: '国家高新技术企业，专注于植物光合表型研究领域',
    established: '2020年',
    certification: '国家高新技术企业认证',
    employees: '50+人',
    researchFields: 6,
    products: 14 };

  const handlePhoneCall = () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `tel:${contactInfo.phone}`;
    } else {
      navigator.clipboard.writeText(contactInfo.phone).then(() => {
        toast({
          title: '电话号码已复制',
          description: `电话号码 ${contactInfo.phone} 已复制到剪贴板，请使用手机拨打`,
          duration: 3000 });

      }).catch(() => {
        toast({
          title: '联系电话',
          description: contactInfo.phone,
          duration: 5000 });

      });
    }
  };
  const handleEmailClick = () => {
    window.location.href = `mailto:${contactInfo.email}`;
  };
  const handleWebsiteClick = () => {
    window.open(contactInfo.website, '_blank');
  };
  const handleMapClick = () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      const gaodeUrl = `https://uri.amap.com/navigation?to=${encodeURIComponent(contactInfo.address)}&mode=car&coordinate=121.825,30.865&callnative=1`;
      const baiduUrl = `https://api.map.baidu.com/direction?destination=${encodeURIComponent(contactInfo.address)}&mode=driving&region=上海&output=html`;
      window.open(gaodeUrl, '_blank');
      setTimeout(() => {
        window.open(baiduUrl, '_blank');
      }, 500);
    } else {
      const baiduMapUrl = `https://map.baidu.com/search/${encodeURIComponent(contactInfo.address)}`;
      window.open(baiduMapUrl, '_blank');
    }
    toast({
      title: '地图导航',
      description: '正在为您打开地图导航',
      duration: 2000 });

  };
  const handleAddressCopy = () => {
    navigator.clipboard.writeText(contactInfo.address).then(() => {
      toast({
        title: '地址已复制',
        description: '公司地址已复制到剪贴板',
        duration: 3000 });

    }).catch(() => {
      toast({
        title: '公司地址',
        description: contactInfo.address,
        duration: 5000 });

    });
  };
  const handleWebsiteCopy = () => {
    navigator.clipboard.writeText(contactInfo.website).then(() => {
      toast({
        title: '官网地址已复制',
        description: '公司官网地址已复制到剪贴板',
        duration: 3000 });

    }).catch(() => {
      toast({
        title: '公司官网',
        description: contactInfo.website,
        duration: 5000 });

    });
  };
  const menuItems = [{
    icon: User,
    label: '个人资料',
    description: '管理您的个人信息',
    onClick: () => {
      toast({
        title: '个人资料',
        description: '个人资料功能正在开发中',
        duration: 2000 });

    } },
  {
    icon: Settings,
    label: '系统设置',
    description: '应用设置和偏好配置',
    onClick: () => {
      toast({
        title: '系统设置',
        description: '系统设置功能正在开发中',
        duration: 2000 });

    } },
  {
    icon: Shield,
    label: '隐私政策',
    description: '查看隐私保护政策',
    onClick: () => {
      toast({
        title: '隐私政策',
        description: '隐私政策功能正在开发中',
        duration: 2000 });

    } },
  {
    icon: FileText,
    label: '用户协议',
    description: '查看用户服务协议',
    onClick: () => {
      toast({
        title: '用户协议',
        description: '用户协议功能正在开发中',
        duration: 2000 });

    } },
  {
    icon: HelpCircle,
    label: '帮助中心',
    description: '获取使用帮助和支持',
    onClick: () => {
      toast({
        title: '帮助中心',
        description: '帮助中心功能正在开发中',
        duration: 2000 });

    } },
  {
    icon: Star,
    label: '给我们评分',
    description: '在应用商店为我们评分',
    onClick: () => {
      toast({
        title: '感谢支持',
        description: '感谢您的支持！',
        duration: 2000 });

    } }];

  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      <LogoHeader />
      
      <div className="px-4 py-6 space-y-6">
        {/* 用户信息卡片 */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-800 dark:to-green-900 rounded-lg p-6 shadow-sm text-white">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">
                {$w.auth.currentUser?.name || '访客用户'}
              </h2>
              <p className="text-green-100 text-sm">
                欢迎使用黍峰生物Agent
              </p>
            </div>
            <button onClick={() => {
            toast({
              title: '编辑资料',
              description: '个人资料编辑功能正在开发中',
              duration: 2000 });

          }} className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 公司信息卡片 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <Building className="w-6 h-6 text-green-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              公司信息
            </h2>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">
              {companyInfo.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
              {companyInfo.description}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {companyInfo.researchFields}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  研究领域
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {companyInfo.products}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  产品数量
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-300">成立时间</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{companyInfo.established}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-300">企业认证</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{companyInfo.certification}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">团队规模</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{companyInfo.employees}</span>
            </div>
          </div>
        </div>

        {/* 联系方式 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <Phone className="w-6 h-6 text-green-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              联系方式
            </h2>
          </div>
          
          <div className="space-y-3">
            {/* 服务热线 */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Phone className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">服务热线</span>
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {contactInfo.phone}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {contactInfo.workHours}
                  </div>
                </div>
                <button onClick={handlePhoneCall} className="bg-green-600 text-white hover:bg-green-700 px-3 py-2 rounded-lg font-medium transition-colors flex items-center space-x-1">
                  <Phone className="w-4 h-4" />
                  <span></span>
                </button>
              </div>
            </div>

            {/* 邮箱联系 */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">邮箱联系</span>
                  </div>
                  <div className="text-sm text-gray-900 dark:text-white mb-1">
                    {contactInfo.email}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button onClick={handleEmailClick} className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-lg font-medium transition-colors flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span></span>
                  </button>
                  










                </div>
              </div>
            </div>

            {/* 公司官网 */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Globe className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">公司官网</span>
                  </div>
                  <div className="text-sm text-gray-900 dark:text-white mb-1 truncate">
                    {contactInfo.website}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button onClick={handleWebsiteClick} className="bg-purple-600 text-white hover:bg-purple-700 px-3 py-2 rounded-lg font-medium transition-colors flex items-center space-x-1">
                    <Globe className="w-4 h-4" />
                    <span></span>
                  </button>
                  


                </div>
              </div>
            </div>

            {/* 公司地址 */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <MapPin className="w-4 h-4 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">公司地址</div>
                    <div className="text-sm text-gray-900 dark:text-white leading-relaxed">
                      {contactInfo.address}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 ml-2">
                  <button onClick={handleMapClick} className="bg-red-600 text-white hover:bg-red-700 px-3 py-2 rounded-lg font-medium transition-colors flex items-center space-x-1">
                    <Navigation className="w-4 h-4" />
                    <span></span>
                  </button>
                  <button onClick={handleAddressCopy} className="bg-gray-600 text-white hover:bg-gray-700 px-3 py-2 rounded-lg font-medium transition-colors">
                    <MapPin className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* 在线客服 */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-4 h-4 text-green-600" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">在线客服</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{contactInfo.emergencySupport}</div>
                  </div>
                </div>
                <button onClick={() => {
                toast({
                  title: '在线客服',
                  description: '客服功能正在开发中，请暂时使用电话联系',
                  duration: 3000 });

              }} className="bg-green-600 text-white hover:bg-green-700 px-3 py-2 rounded-lg font-medium transition-colors flex items-center space-x-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>咨询</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 功能菜单 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          {menuItems.map((item, index) => <div key={index} onClick={item.onClick} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {item.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {item.description}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>)}
        </div>

        {/* 退出登录 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <button onClick={() => {
          toast({
            title: '退出登录',
            description: '退出登录功能正在开发中',
            duration: 2000 });

        }} className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>退出登录</span>
          </button>
        </div>
      </div>

      <TabBar currentPage={activeTab} onPageChange={handleTabChange} />
    </div>;
}