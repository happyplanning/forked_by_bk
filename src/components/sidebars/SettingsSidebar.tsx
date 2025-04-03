import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface MenuItem {
  id: string;
  translationKey: string;
  children?: MenuItem[];
}

interface SettingsSidebarProps {
  onSubmenuChange?: (submenu: string) => void;
}

export function SettingsSidebar({ onSubmenuChange }: SettingsSidebarProps) {
  const { t } = useTranslation();
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    'channel': true,
    'operation': true,
    'channelConnection': true,
    'advanced': true
  });

  const menuItems: MenuItem[] = [
    {
      id: 'channel',
      translationKey: 'settings.sidebar.menu.channel.title',
      children: [
        { id: 'working-hours', translationKey: 'settings.sidebar.menu.channel.workingHours' },
        { id: 'working-hours2', translationKey: 'settings.sidebar.menu.channel.workingHours2' },
        { id: 'consultation-settings', translationKey: 'settings.sidebar.menu.channel.consultationSettings' },
        { id: 'channel-button', translationKey: 'settings.sidebar.menu.channel.classification' },
        { id: 'channel-button-v2', translationKey: 'settings.sidebar.menu.channel.chatButton' }
      ]
    },
    {
      id: 'operation',
      translationKey: 'settings.sidebar.menu.operation.title',
      children: [
        { id: 'monthly-schedule', translationKey: 'settings.sidebar.menu.operation.monthlySchedule' },
        { id: 'notice', translationKey: 'settings.sidebar.menu.operation.notice' },
        { id: 'templates', translationKey: 'settings.sidebar.menu.operation.templates' }
      ]
    },
    {
      id: 'channelConnection',
      translationKey: 'settings.sidebar.menu.channelConnection.title',
      children: [
        { id: 'chat-button-settings', translationKey: 'settings.sidebar.menu.channelConnection.chatButton' },
        { id: 'service-integration', translationKey: 'settings.sidebar.menu.channelConnection.serviceIntegration' }
      ]
    },
    {
      id: 'advanced',
      translationKey: 'settings.sidebar.menu.advanced.title',
      children: [
        { id: 'chat-badge', translationKey: 'settings.sidebar.menu.advanced.chatBadge' },
        { id: 'rating', translationKey: 'settings.sidebar.menu.advanced.rating' },
        { id: 'auto-message', translationKey: 'settings.sidebar.menu.advanced.autoMessage' },
        { id: 'chat-info', translationKey: 'settings.sidebar.menu.advanced.chatInfo' },
        { id: 'auto-complete', translationKey: 'settings.sidebar.menu.advanced.autoComplete' },
        { id: 'parameter', translationKey: 'settings.sidebar.menu.advanced.parameter' },
        { id: 'forbidden', translationKey: 'settings.sidebar.menu.advanced.forbidden' },
        { id: 'tags', translationKey: 'settings.sidebar.menu.advanced.tags' },
        { id: 'auth', translationKey: 'settings.sidebar.menu.advanced.auth' }
      ]
    }
  ];

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const handleSubmenuClick = (submenuId: string) => {
    if (onSubmenuChange) {
      onSubmenuChange(submenuId);
    }
  };

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedMenus[item.id];
    const paddingLeft = `${depth * 1.5}rem`;

    return (
      <div key={item.id}>
        <button
          className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 ${
            hasChildren ? 'font-medium text-gray-800' : 'text-gray-600'
          }`}
          style={{ paddingLeft }}
          onClick={() => {
            if (hasChildren) {
              toggleMenu(item.id);
            } else {
              handleSubmenuClick(item.id);
            }
          }}
        >
          {hasChildren && (
            isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )
          )}
          <span className="flex-1 text-left truncate">{t(item.translationKey)}</span>
        </button>
        {hasChildren && isExpanded && (
          <div className="transition-all duration-200 ease-in-out border-l border-gray-200 ml-4">
            {item.children.map((child) => renderMenuItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-52 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="h-12 p-3 border-b border-gray-200">
        <h1 className="text-lg font-semibold truncate">{t('settings.sidebar.title')}</h1>
      </div>
      <nav className="mt-2">
        {menuItems.map((item) => renderMenuItem(item))}
      </nav>
    </div>
  );
}