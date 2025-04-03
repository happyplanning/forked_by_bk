import React from 'react';
import { DashboardSidebar } from './sidebars/DashboardSidebar';
import { SettingsSidebar } from './sidebars/SettingsSidebar';

interface SidebarProps {
  activeMenu: string;
  onSubmenuChange?: (submenu: string) => void;
}

export function Sidebar({ activeMenu, onSubmenuChange }: SidebarProps) {
  switch (activeMenu) {
    case 'dashboard':
      return <DashboardSidebar />;
    case 'settings':
      return <SettingsSidebar onSubmenuChange={onSubmenuChange} />;
    default:
      return null;
  }
}