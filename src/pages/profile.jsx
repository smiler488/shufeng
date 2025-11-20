// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { User, Mail, Phone, MapPin, Calendar, Settings, LogOut, Edit, Camera, ChevronRight, TrendingUp, Activity, Award, Clock, BookOpen, Users, Package } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

import { LogoHeader } from '@/components/LogoHeader';
import { TabBar } from '@/components/TabBar';
export default function Profile(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  // 获取用户信息，使用默认值防止空值
  const currentUser = $w.auth.currentUser || {};
  const userName = currentUser.nickName || currentUser.name || '科研工作者';
  const userAvatar = currentUser.avatarUrl || '';
  const userEmail = currentUser.email || 'user@example.com';

  // 模拟用户数据
  const [userData, setUserData] = useState({
    name: userName,
    email: userEmail,
    phone: '+86 138 0000 0000',
    location: '北京市海淀区',
    joinDate: '2023-01-15',
    bio: '专注于农业科研和数据分析，致力于提高农业生产效率。',
    stats: {
      totalTools: 12,
      activeUsers: 2456,
      analysisCount: 8934,
      accuracy: 98.5
    },
    recentActivity: [{
      id: 1,
      type: 'tool',
      title: '使用了叶倾角测量工具',
      time: '2小时前',
      icon: TrendingUp
    }, {
      id: 2,
      type: 'analysis',
      title: '完成了土地面积计算',
      time: '5小时前',
      icon: Activity
    }, {
      id: 3,
      type: 'achievement',
      title: '获得"数据分析专家"徽章',
      time: '1天前',
      icon: Award
    }, {
      id: 4,
      type: 'tool',
      title: '导出了农业气象报告',
      time: '2天前',
      icon: Clock
    }]
  });

  // 处理标签页切换
  const handleTabChange = tabId => {
    if (tabId === 'profile') {
      setActiveTab(tabId);
    } else {
      $w.utils.navigateTo({
        pageId: tabId,
        params: {}
      });
    }
  };

  // 处理编辑资料
  const handleEditProfile = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      toast({
        title: '保存成功',
        description: '个人资料已更新',
        duration: 2000
      });
    }
  };

  // 处理退出登录
  const handleLogout = () => {
    toast({
      title: '退出登录',
      description: '正在退出...',
      duration: 2000
    });
    // 这里可以添加实际的退出登录逻辑
  };

  // 处理设置点击
  const handleSettings = () => {
    toast({
      title: '设置',
      description: '设置功能开发中...',
      duration: 2000
    });
  };

  // 处理头像上传
  const handleAvatarUpload = () => {
    toast({
      title: '上传头像',
      description: '头像上传功能开发中...',
      duration: 2000
    });
  };

  // 处理输入变化
  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      <LogoHeader />
      
      <div className="px-4 py-6">
        {/* 用户头像和基本信息 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {userAvatar ? <img src={userAvatar} alt="头像" className="w-full h-full rounded-full object-cover" /> : userName.charAt(0).toUpperCase()}
              </div>
              <button onClick={handleAvatarUpload} className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                {isEditing ? <input type="text" value={userData.name} onChange={e => handleInputChange('name', e.target.value)} className="text-xl font-bold text-gray-900 dark:text-white bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none" /> : <h2 className="text-xl font-bold text-gray-900 dark:text-white">{userData.name}</h2>}
                <button onClick={handleEditProfile} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                <Mail className="w-4 h-4 mr-1" />
                {isEditing ? <input type="email" value={userData.email} onChange={e => handleInputChange('email', e.target.value)} className="bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none" /> : userData.email}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Phone className="w-4 h-4 mr-3 text-gray-400" />
              {isEditing ? <input type="tel" value={userData.phone} onChange={e => handleInputChange('phone', e.target.value)} className="flex-1 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none" /> : userData.phone}
            </div>
            
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <MapPin className="w-4 h-4 mr-3 text-gray-400" />
              {isEditing ? <input type="text" value={userData.location} onChange={e => handleInputChange('location', e.target.value)} className="flex-1 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none" /> : userData.location}
            </div>
            
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Calendar className="w-4 h-4 mr-3 text-gray-400" />
              加入时间：{userData.joinDate}
            </div>
            
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {isEditing ? <textarea value={userData.bio} onChange={e => handleInputChange('bio', e.target.value)} className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:border-blue-500 outline-none resize-none" rows={3} /> : userData.bio}
              </p>
            </div>
          </div>
        </div>

        {/* 统计数据 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">{userData.stats.totalTools}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">总工具数</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">{userData.stats.activeUsers.toLocaleString()}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">活跃用户</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">{userData.stats.analysisCount.toLocaleString()}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">分析次数</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">{userData.stats.accuracy}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">准确率</div>
          </div>
        </div>

        {/* 最近活动 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-gray-400" />
            最近活动
          </h3>
          
          <div className="space-y-4">
            {userData.recentActivity.map(activity => {
            const Icon = activity.icon;
            return <div key={activity.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <div className={`p-2 rounded-lg ${activity.type === 'tool' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' : activity.type === 'analysis' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' : 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>;
          })}
          </div>
        </div>

        {/* 设置选项 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Settings className="w-5 h-5 mr-2 text-gray-400" />
            设置
          </h3>
          
          <div className="space-y-2">
            <button onClick={handleSettings} className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <Settings className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">账户设置</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <BookOpen className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">使用帮助</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            
            <button onClick={handleLogout} className="w-full flex items-center justify-between p-3 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <LogOut className="w-4 h-4 text-red-500" />
                <span className="text-red-500">退出登录</span>
              </div>
              <ChevronRight className="w-4 h-4 text-red-400" />
            </button>
          </div>
        </div>
      </div>

      <TabBar currentPage={activeTab} onPageChange={handleTabChange} />
    </div>;
}