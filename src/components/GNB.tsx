import React from 'react';
import {
  LayoutDashboard,
  Send,
  FileText,
  Mail,
  Bot,
  Settings,
  Users,
  Megaphone,
  HelpCircle,
  BarChart3,
  Languages,
  User
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface GNBProps {
  activeMenu: string;
  onMenuChange: (menu: string) => void;
}

export function GNB({ activeMenu, onMenuChange }: GNBProps) {
  const { t, i18n } = useTranslation();

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: t('menu.dashboard') },
    { id: 'campaign', icon: Send, label: t('menu.campaign') },
    { id: 'board', icon: FileText, label: t('menu.board') },
    { id: 'mail', icon: Mail, label: t('menu.mail') },
    { id: 'bot', icon: Bot, label: t('menu.bot') },
    { id: 'settings', icon: Settings, label: t('menu.settings') },
    { id: 'members', icon: Users, label: t('menu.members') },
    { id: 'marketing', icon: Megaphone, label: t('menu.marketing') },
    { id: 'help', icon: HelpCircle, label: t('menu.help') },
    { id: 'stats', icon: BarChart3, label: t('menu.stats') }
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ko' ? 'en' : 'ko';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="w-16 bg-[#404B5A] flex flex-col items-center py-4 text-gray-400">
      <div className="flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`w-full p-4 hover:text-white flex justify-center ${
                activeMenu === item.id ? 'text-white bg-[#2E3744]' : ''
              }`}
              onClick={() => onMenuChange(item.id)}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </div>
      
      <button
        className="w-full p-4 hover:text-white flex justify-center"
        onClick={toggleLanguage}
        title={i18n.language === 'ko' ? 'Switch to English' : '한국어로 전환'}
      >
        <Languages className="w-5 h-5" />
      </button>
      
      <button
        className="w-full p-4 hover:text-white flex justify-center"
        onClick={() => console.log('Profile clicked')}
        title={t('header.profile')}
      >
        <User className="w-5 h-5" />
      </button>
    </div>
  );
}