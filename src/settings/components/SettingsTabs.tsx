import React from 'react';
import { Settings } from '../../data/settings';
import { WorkingHoursTab } from './tabs/WorkingHoursTab';
import { ConsultantBreakTab } from './tabs/ConsultantBreakTab';
import { LunchBreakTab } from './tabs/LunchBreakTab';
import { useTranslation } from 'react-i18next';

interface Tab {
  id: string;
  translationKey: string;
  component: React.ComponentType<{ settings: Settings; setSettings: (settings: Settings) => void }>;
}

interface SettingsTabsProps {
  settings: Settings;
  setSettings: (settings: Settings) => void;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function SettingsTabs({ settings, setSettings, activeTab, onTabChange }: SettingsTabsProps) {
  const { t } = useTranslation();

  const tabs: Tab[] = [
    {
      id: 'working-hours',
      translationKey: 'settings.workingHours.title',
      component: WorkingHoursTab
    },
    {
      id: 'consultant-break',
      translationKey: 'settings.consultantBreak.title',
      component: ConsultantBreakTab
    },
    {
      id: 'lunch-break',
      translationKey: 'settings.lunchBreak.title',
      component: LunchBreakTab
    }
  ];

  return (
    <div>
      <div className="border-b border-gray-200 bg-white">
        <nav className="flex gap-2 px-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t(tab.translationKey)}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-6">
        {tabs.map((tab) => (
          <div key={tab.id} className={activeTab === tab.id ? 'block' : 'hidden'}>
            <tab.component settings={settings} setSettings={setSettings} />
          </div>
        ))}
      </div>
    </div>
  );
}