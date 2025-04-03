import React, { useState, useEffect } from 'react';
import { Settings } from '../../../data/settings';
import { Clock, AlertCircle, Hourglass, Repeat } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SaveCancelButtons } from '../../../components/ui/SaveCancelButtons';

interface ConsultantBreakTabProps {
  settings: Settings;
  setSettings: (settings: Settings) => void;
}

export function ConsultantBreakTab({ settings, setSettings }: ConsultantBreakTabProps) {
  const { t } = useTranslation();
  const [isCustomTime, setIsCustomTime] = useState(false);
  const [tempCustomTime, setTempCustomTime] = useState('');
  const [originalSettings, setOriginalSettings] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);
  const [setupMethod, setSetupMethod] = useState<'none' | 'batch'>('batch');

  useEffect(() => {
    setHasChanges(JSON.stringify(settings) !== JSON.stringify(originalSettings));
  }, [settings, originalSettings]);

  const handleSave = () => {
    setOriginalSettings(settings);
    setHasChanges(false);
    console.log('Saving consultant break settings (WorkingHoursPage2):', settings);
  };

  const handleCancel = () => {
    setSettings(originalSettings);
    setHasChanges(false);
  };

  // Generate options for 5-minute intervals up to 60 minutes
  const timeOptions = Array.from({ length: 12 }, (_, i) => (i + 1) * 5);

  // Check if current break time is a custom value
  useEffect(() => {
    if (!timeOptions.includes(settings.consultantBreak.breakTime)) {
      setIsCustomTime(true);
      setTempCustomTime(settings.consultantBreak.breakTime.toString());
    }
  }, []);

  const handleBreakTimeChange = (value: string) => {
    if (value === 'custom') {
      setIsCustomTime(true);
      setTempCustomTime(settings.consultantBreak.breakTime.toString());
      return;
    }
    
    setIsCustomTime(false);
    setSettings({
      ...settings,
      consultantBreak: {
        ...settings.consultantBreak,
        breakTime: parseInt(value, 10)
      }
    });
  };

  const handleCustomTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && parseInt(value || '0') <= 60) {
      setTempCustomTime(value);
    }
  };

  const handleConfirmCustomTime = () => {
    if (tempCustomTime && parseInt(tempCustomTime) > 0 && parseInt(tempCustomTime) <= 60) {
      setSettings({
        ...settings,
        consultantBreak: {
          ...settings.consultantBreak,
          breakTime: parseInt(tempCustomTime, 10)
        }
      });
      setIsCustomTime(false);
    }
  };

  const handleCancelCustomTime = () => {
    setIsCustomTime(false);
    if (timeOptions.includes(settings.consultantBreak.breakTime)) {
      setTempCustomTime(settings.consultantBreak.breakTime.toString());
    }
  };

  const handleBreakCountChange = (value: string) => {
    setSettings({
      ...settings,
      consultantBreak: {
        ...settings.consultantBreak,
        maxBreakCount: parseInt(value, 10)
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <p className="text-base text-gray-600">{t('settings.consultantBreak.description')} (WorkingHoursPage2 버전)</p>
        <SaveCancelButtons
          hasChanges={hasChanges}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>

      {/* 설정 방식 선택 */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-[#2E3744] border-opacity-20">
        <h3 className="font-medium text-gray-700 mb-4">{t('settings.consultantBreak.setupMethod')}</h3>
        <div className="flex gap-4">
          <button
            className={`flex-1 py-2 px-4 rounded-lg border ${
              setupMethod === 'none'
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setSetupMethod('none')}
          >
            {t('settings.consultantBreak.noSetup')}
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-lg border ${
              setupMethod === 'batch'
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setSetupMethod('batch')}
          >
            {t('settings.consultantBreak.batchSetup')}
          </button>
        </div>
      </div>

      {/* Show alert message when "설정 안함" is selected */}
      {setupMethod === 'none' && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#2E3744] border-opacity-20">
          <div className="flex items-start gap-2 text-amber-600">
            <AlertCircle className="w-4 h-4 mt-0.5" />
            <p className="text-sm">{t('settings.consultantBreak.noSetupMessage')}</p>
          </div>
        </div>
      )}

      {/* 일괄 설정 내용 */}
      {setupMethod === 'batch' && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#2E3744] border-opacity-20">
          <div className="space-y-6">
            {/* 휴식 최대 허용 시간 설정 - 가로 정렬 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Hourglass className="w-4 h-4 text-gray-500" />
                <h3 className="font-medium text-gray-700">{t('settings.consultantBreak.breakTime')}</h3>
              </div>
              <div>
                {isCustomTime ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tempCustomTime}
                      onChange={handleCustomTimeChange}
                      className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm"
                      placeholder="1-60"
                    />
                    <span className="text-sm text-gray-600">{t('settings.consultantBreak.minutes')}</span>
                    <div className="flex items-center gap-2 ml-2">
                      <button
                        onClick={handleConfirmCustomTime}
                        disabled={!tempCustomTime || parseInt(tempCustomTime) <= 0 || parseInt(tempCustomTime) > 60}
                        className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        {t('common.actions.confirm')}
                      </button>
                      <button
                        onClick={handleCancelCustomTime}
                        className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
                      >
                        {t('common.actions.cancel')}
                      </button>
                    </div>
                  </div>
                ) : (
                  <select
                    value={timeOptions.includes(settings.consultantBreak.breakTime) ? settings.consultantBreak.breakTime : 'custom'}
                    onChange={(e) => handleBreakTimeChange(e.target.value)}
                    className="w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm"
                  >
                    {timeOptions.map((minutes) => (
                      <option key={minutes} value={minutes}>
                        {minutes} {t('settings.consultantBreak.minutes')}
                      </option>
                    ))}
                    <option value="custom">{t('settings.consultantBreak.customInput')}</option>
                  </select>
                )}
              </div>
            </div>

            {/* 휴식 최대 허용 횟수 설정 - 가로 정렬 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Repeat className="w-4 h-4 text-gray-500" />
                <h3 className="font-medium text-gray-700">{t('settings.consultantBreak.maxBreakCount')}</h3>
              </div>
              <div>
                <select
                  value={settings.consultantBreak.maxBreakCount}
                  onChange={(e) => handleBreakCountChange(e.target.value)}
                  className="w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm"
                >
                  {[1, 2, 3, 4, 5].map((count) => (
                    <option key={count} value={count}>
                      {count}{t('settings.consultantBreak.times')}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}