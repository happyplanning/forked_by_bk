import React from 'react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  activeMenu?: string;
  activeSubmenu?: string;
}

export function Header({ activeMenu, activeSubmenu }: HeaderProps) {
  const { t, i18n } = useTranslation();
  
  // Get the title based on the active menu and submenu
  const getPageTitle = () => {
    if (!activeMenu) return '';
    
    // Return translated title according to current language setting
    if (activeMenu === 'settings') {
      if (activeSubmenu === 'working-hours') {
        return t('settings.workingHours.title');
      } else if (activeSubmenu === 'working-hours2') {
        return t('settings.workingHours.title') + ' 2';
      } else if (activeSubmenu === 'consultation-settings') {
        return t('settings.consultationProgress.title');
      } else if (activeSubmenu === 'monthly-schedule') {
        return t('settings.sidebar.menu.operation.monthlySchedule');
      } else {
        return t(`settings.sidebar.menu.channel.${activeSubmenu}`, { defaultValue: activeSubmenu });
      }
    } else {
      return t(`menu.${activeMenu}`, { defaultValue: activeMenu });
    }
  };

  return (
    <header className="h-12 bg-white border-b border-gray-200">
      <div className="h-full flex items-center justify-between px-6">
        <div className="text-lg font-semibold">{getPageTitle()}</div>
      </div>
    </header>
  );
}