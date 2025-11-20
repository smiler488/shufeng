// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { User, Mail, Phone, MapPin, Calendar, Settings, LogOut, Edit, Camera, Bell, Shield, HelpCircle, ChevronRight, Star, Clock, Award, BookOpen } from 'lucide-react';
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
  const [userInfo, setUserInfo] = useState({
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '+86 138 0000 0000',
    location: '北京市海淀区',
    bio: '专注于农业科研和数据分析，致力于提高农业生产效率。',
    joinDate: '2023-01-15',
    avatar: 'https://picsum.photos/seed/user123/200/200.jpg'
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

  // 处理信息编辑
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: '保存成功',
      description: '个人信息已更新',
      duration: 2000
    });
  };
  const handleCancel = () => {
    setIsEditing(false);
  };
  const handleInputChange = (field, value) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 处理头像上传
  const handleAvatarUpload = () => {
    // 模拟头像上传
    const newAvatar = `https://picsum.photos/seed/user${Date.now()}/200/200.jpg`;
    setUserInfo(prev => ({
      ...prev,
      avatar: newAvatar
    }));
    toast({
      title: '头像更新成功',
      duration: 2000
    });
  };

  // 处理退出登录
  const handleLogout = () => {
    toast({
      title: '退出登录',
      description: '您已成功退出登录',
      duration: 2000
    });
    // 这里可以添加实际的退出登录逻辑
  };

  // 菜单项配置
  const menuItems = [{
    icon: Bell,
    label: '通知设置',
    description: '管理推送通知偏好',
    action: () => {
      toast({
        title: '通知设置',
        description: '功能开发中...',
        duration: 2000
      });
    }
  }, {
    icon: Shield,
    label: '隐私与安全',
    description: '账户安全和隐私设置',
    action: () => {
      toast({
        title: '隐私与安全',
        description: '功能开发中...',
        duration: 2000
      });
    }
  }, {
    icon: HelpCircle,
    label: '帮助与反馈',
    description: '获取帮助或提供反馈',
    action: () => {
      toast({
        title: '帮助与反馈',
        description: '功能开发中...',
        duration: 2000
      });
    }
  }, {
    icon: Settings,
    label: '通用设置',
    description: '应用偏好和通用设置',
    action: () => {
      toast({
        title: '通用设置',
        description: '功能开发中...',
        duration: 2000
      });
    }
  }];
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      <LogoHeader />
      
      <div className="px-4 py-6 space-y-6">
        {/* 用户基本信息卡片 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          {/* 背景装饰 */}
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
            <div className="absolute inset-0 bg-black/20" />
          </div>
          
          {/* 用户头像和基本信息 */}
          <div className="px-6 pb-6">
            <div className="flex items-end -mt-12 mb-4">
              <div className="relative">
                <img src={userInfo.avatar} alt="用户头像" className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 object-cover" />
                <button onClick={handleAvatarUpload} className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              <div className="ml-4 mb-2 flex-1">
                {isEditing ? <div className="space-y-2">
                    <input type="text" value={userInfo.name} onChange={e => handleInputChange('name', e.target.value)} className="text-xl font-bold text-gray-900 dark:text-white bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none" />
                    <input type="email" value={userInfo.email} onChange={e => handleInputChange('email', e.target.value)} className="text-sm text-gray-600 dark:text-gray-300 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none" />
                  </div> : <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">{userInfo.name}</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{userInfo.email}</p>
                  </div>}
              </div>
              
              <div className="mb-2">
                {isEditing ? <div className="flex space-x-2">
                    <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                      保存
                    </button>
                    <button onClick={handleCancel} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                      取消
                    </button>
                  </div> : <button onClick={handleEdit} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>}
              </div>
            </div>
            
            {/* 个人简介 */}
            {isEditing ? <textarea value={userInfo.bio} onChange={e => handleInputChange('bio', e.target.value)} rows={3} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none" placeholder="介绍一下自己..." /> : <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {userInfo.bio}
              </p>}
          </div>
        </div>

        {/* 详细信息 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">详细信息</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">手机号码</span>
              </div>
              {isEditing ? <input type="tel" value={userInfo.phone} onChange={e => handleInputChange('phone', e.target.value)} className="text-gray-900 dark:text-white bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none" /> : <span className="text-gray-900 dark:text-white">{userInfo.phone}</span>}
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">所在地区</span>
              </div>
              {isEditing ? <input type="text" value={userInfo.location} onChange={e => handleInputChange('location', e.target.value)} className="text-gray-900 dark:text-white bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none" /> : <span className="text-gray-900 dark:text-white">{userInfo.location}</span>}
            </div>
            
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">加入时间</span>
              </div>
              <span className="text-gray-900 dark:text-white">{userInfo.joinDate}</span>
            </div>
          </div>
        </div>

        {/* 成就统计 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">成就统计</h2>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mx-auto mb-2">
                <Star className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">4.8</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">平均评分</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg mx-auto mb-2">
                <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">156</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">使用时长(h)</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg mx-auto mb-2">
                <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">12</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">获得成就</div>
            </div>
          </div>
        </div>

        {/* 功能菜单 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          {menuItems.map((item, index) => {
          const Icon = item.icon;
          return <button key={index} onClick={item.action} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <Icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 dark:text-white">{item.label}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{item.description}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>;
        })}
        </div>

        {/* 退出登录 */}
        <button onClick={handleLogout} className="w-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-4 rounded-xl flex items-center justify-center space-x-2 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">退出登录</span>
        </button>
      </div>

      <TabBar currentPage={activeTab} onPageChange={handleTabChange} />
    </div>;
}