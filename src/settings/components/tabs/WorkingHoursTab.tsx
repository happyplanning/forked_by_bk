import React, { useState, useEffect } from 'react';
import { Settings, DayTimeRange } from '../../../data/settings';
import { TimeSelector } from '../TimeSelector';
import { Clock, Save, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface WorkingHoursTabProps {
  settings: Settings;
  setSettings: (settings: Settings) => void;
}

const WEEKDAYS = [
  { id: 'monday', translationKey: 'settings.workingHours.days.monday' },
  { id: 'tuesday', translationKey: 'settings.workingHours.days.tuesday' },
  { id: 'wednesday', translationKey: 'settings.workingHours.days.wednesday' },
  { id: 'thursday', translationKey: 'settings.workingHours.days.thursday' },
  { id: 'friday', translationKey: 'settings.workingHours.days.friday' },
  { id: 'saturday', translationKey: 'settings.workingHours.days.saturday' },
  { id: 'sunday', translationKey: 'settings.workingHours.days.sunday' }
] as const;

export function WorkingHoursTab({ settings, setSettings }: WorkingHoursTabProps) {
  const { t } = useTranslation();
  const [originalSettings, setOriginalSettings] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setHasChanges(JSON.stringify(settings) !== JSON.stringify(originalSettings));
  }, [settings, originalSettings]);

  const handleSave = () => {
    setOriginalSettings(settings);
    setHasChanges(false);
    console.log('Saving working hours settings:', settings);
  };

  const handleCancel = () => {
    setSettings(originalSettings);
    setHasChanges(false);
  };

  const updateDaySettings = (
    day: keyof typeof settings.workingHours,
    field: keyof DayTimeRange,
    value: DayTimeRange[keyof DayTimeRange]
  ) => {
    setSettings({
      ...settings,
      workingHours: {
        ...settings.workingHours,
        [day]: {
          ...settings.workingHours[day],
          [field]: value
        }
      }
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-base text-gray-600">요일 별 근무 시간을 설정합니다.</p>
        <div className="flex items-center gap-2">
          {hasChanges && (
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4" />
              취소
            </button>
          )}
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-4 py-2 ${
              hasChanges ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
            } text-white rounded-lg transition-colors`}
          >
            <Save className="w-4 h-4" />
            {t('settings.save')}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {WEEKDAYS.map((day) => (
          <div key={day.id} className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-[#2E3744] border-opacity-20">
            <div className="w-24 flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.workingHours[day.id].enabled}
                onChange={(e) => updateDaySettings(day.id, 'enabled', e.target.checked)}
                className="rounded border-gray-300"
              />
              <label className="font-medium">{t(day.translationKey)}</label>
            </div>
            
            <div className="flex items-end gap-4">
              {/* All day checkbox - aligned with inputs */}
              <label className="flex items-center gap-1 mb-1 mr-2">
                <input
                  type="checkbox"
                  checked={settings.workingHours[day.id].isAllDay}
                  onChange={(e) => updateDaySettings(day.id, 'isAllDay', e.target.checked)}
                  disabled={!settings.workingHours[day.id].enabled}
                  className="rounded border-gray-300"
                />
                <span className="text-xs">{t('settings.workingHours.allDay')}</span>
              </label>
              
              {/* Start time */}
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 mb-1">{t('settings.workingHours.startTime')}</span>
                <TimeSelector
                  value={settings.workingHours[day.id].start}
                  onChange={(value) => updateDaySettings(day.id, 'start', value)}
                  disabled={!settings.workingHours[day.id].enabled || settings.workingHours[day.id].isAllDay}
                />
              </div>
              
              {/* Separator */}
              <span className="mb-1 mx-2">~</span>
              
              {/* Next day checkbox */}
              <label className="flex items-center gap-1 mb-1">
                <input
                  type="checkbox"
                  checked={settings.workingHours[day.id].isNextDay}
                  onChange={(e) => updateDaySettings(day.id, 'isNextDay', e.target.checked)}
                  disabled={!settings.workingHours[day.id].enabled || settings.workingHours[day.id].isAllDay}
                  className="rounded border-gray-300"
                />
                <span className="text-xs">{t('settings.workingHours.nextDay')}</span>
              </label>
              
              {/* End time */}
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 mb-1">{t('settings.workingHours.endTime')}</span>
                <TimeSelector
                  value={settings.workingHours[day.id].end}
                  onChange={(value) => updateDaySettings(day.id, 'end', value)}
                  disabled={!settings.workingHours[day.id].enabled || settings.workingHours[day.id].isAllDay}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}