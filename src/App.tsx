import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Settings, defaultSettings } from './data/settings';
import { useTranslation } from 'react-i18next';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { GNB } from './components/GNB';
import { WorkingHoursPage } from './settings/pages/WorkingHoursPage';
import { WorkingHoursPage2 } from './settings/pages/WorkingHoursPage2';
import { ConsultationProgressPage } from './settings/pages/ConsultationProgressPage';
import { MonthlySchedulePage } from './settings/pages/MonthlySchedulePage';
import { DummyPage } from './settings/pages/DummyPage';

function App() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [activeMenu, setActiveMenu] = useState('settings');
  const [activeSubmenu, setActiveSubmenu] = useState('working-hours');

  return (
    <div className="flex h-screen bg-gray-50">
      <GNB activeMenu={activeMenu} onMenuChange={setActiveMenu} />
      <Sidebar activeMenu={activeMenu} onSubmenuChange={setActiveSubmenu} />
      <div className="flex-1 flex flex-col">
        <Header activeMenu={activeMenu} activeSubmenu={activeSubmenu} />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/settings/working-hours" replace />} />
            <Route path="/settings/working-hours" element={<WorkingHoursPage settings={settings} setSettings={setSettings} />} />
            <Route path="/settings/working-hours2" element={<WorkingHoursPage2 settings={settings} setSettings={setSettings} />} />
            <Route path="/settings/consultation-settings" element={<ConsultationProgressPage settings={settings} setSettings={setSettings} />} />
            <Route path="/settings/monthly-schedule" element={<MonthlySchedulePage />} />
            <Route path="/settings/*" element={<DummyPage title="설정 페이지" />} />
            <Route path="*" element={<Navigate to="/settings/working-hours" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;