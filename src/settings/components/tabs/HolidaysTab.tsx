import React, { useState, useEffect } from 'react';
import { Settings, Holiday, TimeRange } from '../../../data/settings';
import { Calendar, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TimeSelector } from '../TimeSelector';
import { SaveCancelButtons } from '../../../components/ui/SaveCancelButtons';

interface HolidaysTabProps {
  settings: Settings;
  setSettings: (settings: Settings) => void;
}

const defaultTimeRange: TimeRange = { hour: '09', minute: '00', period: 'AM' };

export function HolidaysTab({ settings, setSettings }: HolidaysTabProps) {
  const { t } = useTranslation();
  const [originalSettings, setOriginalSettings] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);
  const [newHoliday, setNewHoliday] = useState<Holiday>({
    date: '',
    description: '',
    isAllDay: true,
    timeRange: {
      start: { ...defaultTimeRange },
      end: { hour: '06', minute: '00', period: 'PM' },
      isNextDay: false
    }
  });

  useEffect(() => {
    setHasChanges(JSON.stringify(settings) !== JSON.stringify(originalSettings));
  }, [settings, originalSettings]);

  const handleSave = () => {
    setOriginalSettings(settings);
    setHasChanges(false);
    console.log('Saving holidays settings:', settings);
  };

  const handleCancel = () => {
    setSettings(originalSettings);
    setHasChanges(false);
  };

  const addHoliday = () => {
    if (newHoliday.date && newHoliday.description) {
      setSettings({
        ...settings,
        workingHours: {
          ...settings.workingHours,
          holidays: [...settings.workingHours.holidays, newHoliday]
        }
      });
      setNewHoliday({
        date: '',
        description: '',
        isAllDay: true,
        timeRange: {
          start: { ...defaultTimeRange },
          end: { hour: '06', minute: '00', period: 'PM' },
          isNextDay: false
        }
      });
    }
  };

  const removeHoliday = (index: number) => {
    const newHolidays = [...settings.workingHours.holidays];
    newHolidays.splice(index, 1);
    setSettings({
      ...settings,
      workingHours: {
        ...settings.workingHours,
        holidays: newHolidays
      }
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-base text-gray-600">등록된 휴무일은 근무 외 시간의 응대 규칙에 따라 대응됩니다.</p>
        <SaveCancelButtons
          hasChanges={hasChanges}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>

      <div className="space-y-6">
        {/* Add new holiday form */}
        <div className="bg-white p-6 rounded-lg border border-[#2E3744] border-opacity-20 shadow-sm">
          <div className="grid grid-cols-[1fr,1.5fr,auto] gap-4">
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('settings.workingHours.holidays.date')}
              </label>
              <input
                type="date"
                value={newHoliday.date}
                onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
                className="h-10 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 px-3"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('settings.workingHours.holidays.description')}
              </label>
              <div className="flex items-center gap-4 h-10">
                <input
                  type="text"
                  value={newHoliday.description}
                  onChange={(e) => setNewHoliday({ ...newHoliday, description: e.target.value })}
                  className="flex-1 h-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 px-3"
                  placeholder={t('settings.workingHours.holidays.holidayDescription')}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1 invisible">
                {t('settings.workingHours.holidays.actions')}
              </label>
              <div className="flex items-center h-10">
                <button
                  onClick={addHoliday}
                  disabled={!newHoliday.date || !newHoliday.description}
                  className="px-4 h-full bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {t('settings.workingHours.holidays.add')}
                </button>
              </div>
            </div>
          </div>

          {/* Time selection component with All day checkbox */}
          <div className="flex items-end gap-4 mt-4">
            {/* All day checkbox */}
            <label className="flex items-center gap-1 mb-1 mr-2">
              <input
                type="checkbox"
                checked={newHoliday.isAllDay}
                onChange={(e) => setNewHoliday({
                  ...newHoliday,
                  isAllDay: e.target.checked
                })}
                className="rounded border-gray-300"
              />
              <span className="text-xs">{t('settings.workingHours.allDay')}</span>
            </label>
            
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 mb-1">{t('settings.workingHours.startTime')}</span>
              <TimeSelector
                value={newHoliday.timeRange?.start || defaultTimeRange}
                onChange={(value) => setNewHoliday({
                  ...newHoliday,
                  timeRange: {
                    ...newHoliday.timeRange!,
                    start: value
                  }
                })}
                disabled={newHoliday.isAllDay}
              />
            </div>
            
            <span className="mb-1 mx-2">~</span>
            
            <label className="flex items-center gap-1 mb-1">
              <input
                type="checkbox"
                checked={newHoliday.timeRange?.isNextDay || false}
                onChange={(e) => setNewHoliday({
                  ...newHoliday,
                  timeRange: {
                    ...newHoliday.timeRange!,
                    isNextDay: e.target.checked
                  }
                })}
                className="rounded border-gray-300"
                disabled={newHoliday.isAllDay}
              />
              <span className="text-xs">{t('settings.workingHours.nextDay')}</span>
            </label>
            
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 mb-1">{t('settings.workingHours.endTime')}</span>
              <TimeSelector
                value={newHoliday.timeRange?.end || { hour: '06', minute: '00', period: 'PM' }}
                onChange={(value) => setNewHoliday({
                  ...newHoliday,
                  timeRange: {
                    ...newHoliday.timeRange!,
                    end: value
                  }
                })}
                disabled={newHoliday.isAllDay}
              />
            </div>
          </div>
        </div>

        {/* Holidays list - removed nested div structure */}
        <table className="min-w-full divide-y divide-gray-200 bg-white p-6 rounded-lg border border-[#2E3744] border-opacity-20 shadow-sm overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('settings.workingHours.holidays.date')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('settings.workingHours.holidays.description')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('settings.workingHours.holidays.time')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('settings.workingHours.holidays.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {settings.workingHours.holidays.map((holiday, index) => (
              <tr key={`${holiday.date}-${index}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {holiday.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {holiday.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {holiday.isAllDay ? (
                    t('settings.workingHours.holidays.allDay')
                  ) : (
                    `${holiday.timeRange?.start.hour}:${holiday.timeRange?.start.minute} ${holiday.timeRange?.start.period} - 
                     ${holiday.timeRange?.isNextDay ? t('settings.workingHours.nextDay') + ' ' : ''}${holiday.timeRange?.end.hour}:${holiday.timeRange?.end.minute} ${holiday.timeRange?.end.period}`
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => removeHoliday(index)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {settings.workingHours.holidays.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  {t('settings.workingHours.holidays.noHolidays')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}