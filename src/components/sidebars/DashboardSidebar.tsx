import React from 'react';
import { PieChart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface MenuItem {
  id: string;
  translationKey: string;
  icon?: React.ReactNode;
}

export function DashboardSidebar() {
  const { t } = useTranslation();
  
  const menuItems: MenuItem[] = [
    { 
      id: 'realtime-dashboard',
      translationKey: 'dashboard.realtime',
      icon: <PieChart className="w-4 h-4" />
    },
    { 
      id: 'ai-dashboard',
      translationKey: 'dashboard.ai',
      icon: <PieChart className="w-4 h-4" />
    }
  ];

  // 임시로 번역이 없는 경우를 위한 대체 텍스트
  const translations = {
    'dashboard.realtime': '실시간 대시보드',
    'dashboard.ai': 'AI 분석 대시보드'
  };

  return (
    <div className="w-52 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-3 border-b border-gray-200">
        <h1 className="text-lg font-semibold truncate">{t('menu.dashboard')}</h1>
      </div>
      <nav className="mt-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            {item.icon}
            <span className="flex-1 text-left truncate">
              {t(item.translationKey, { defaultValue: translations[item.translationKey as keyof typeof translations] })}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}