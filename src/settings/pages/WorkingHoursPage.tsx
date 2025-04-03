import React, { useState } from 'react';
import { Settings } from '../../data/settings';
import { useTranslation } from 'react-i18next';
import { WorkingHoursTab } from '../components/tabs/WorkingHoursTab';
import { ConsultantBreakTab } from '../components/tabs/ConsultantBreakTab';
import { LunchBreakTab } from '../components/tabs/LunchBreakTab';
import { HolidaysTab } from '../components/tabs/HolidaysTab';

interface WorkingHoursPageProps {
  settings: Settings;
  setSettings: (settings: Settings) => void;
}

export function WorkingHoursPage({ settings, setSettings }: WorkingHoursPageProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('working-hours');

  const tabs = [
    {
      id: 'working-hours',
      translationKey: 'settings.workingHours.title',
    },
    {
      id: 'consultant-break',
      translationKey: 'settings.consultantBreak.title',
    },
    {
      id: 'lunch-break',
      translationKey: 'settings.lunchBreak.title',
    },
    {
      id: 'holidays',
      translationKey: 'settings.workingHours.holidays.title',
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'working-hours':
        return <WorkingHoursTab settings={settings} setSettings={setSettings} />;
      case 'consultant-break':
        return <ConsultantBreakTab settings={settings} setSettings={setSettings} />;
      case 'lunch-break':
        return <LunchBreakTab settings={settings} setSettings={setSettings} />;
      case 'holidays':
        return <HolidaysTab settings={settings} setSettings={setSettings} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full p-8">
      <nav className="flex gap-2 border-b border-gray-200 pb-4 mb-6" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t(tab.translationKey)}
          </button>
        ))}
      </nav>
      
      <div className="space-y-6">
        {renderTabContent()}
      </div>
    </div>
  );
}