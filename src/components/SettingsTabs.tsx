import React from 'react';
import { Settings } from '../data/settings';
import { WorkingHoursTab } from './tabs/WorkingHoursTab';
import { ConsultantBreakTab } from './tabs/ConsultantBreakTab';
import { LunchBreakTab } from './tabs/LunchBreakTab';

interface Tab {
  id: string;
  label: string;
  component: React.ComponentType<{ settings: Settings; setSettings: (settings: Settings) => void }>;
}

interface SettingsTabsProps {
  settings: Settings;
  setSettings: (settings: Settings) => void;
}

export function SettingsTabs({ settings, setSettings }: SettingsTabsProps) {
  const [activeTab, setActiveTab] = React.useState('working-hours');

  const tabs: Tab[] = [
    {
      id: 'working-hours',
      label: '근무시간 관리',
      component: WorkingHoursTab
    },
    {
      id: 'consultant-break',
      label: '상담사 휴식',
      component: ConsultantBreakTab
    },
    {
      id: 'lunch-break',
      label: '상담사 식사시간',
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
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
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