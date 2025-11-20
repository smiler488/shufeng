// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Home, Grid3x3, User, Package } from 'lucide-react';

export function TabBar({
  currentPage,
  onPageChange
}) {
  const tabs = [{
    id: 'home',
    label: '首页',
    icon: Home
  }, {
    id: 'products',
    label: '产品',
    icon: Package
  }, {
    id: 'hub',
    label: 'HUB',
    icon: Grid3x3
  }, {
    id: 'profile',
    label: '我的',
    icon: User
  }];
  return <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700 z-50">
          <div className="flex justify-around items-center h-16">
            {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = currentPage === tab.id;
        return <button key={tab.id} onClick={() => onPageChange(tab.id)} className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}>
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-xs">{tab.label}</span>
                </button>;
      })}
          </div>
        </div>;
}