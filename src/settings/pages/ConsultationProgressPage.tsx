import React, { useState, useEffect } from 'react';
import { Settings } from '../../data/settings';
import { MessageSquare, AlertCircle, Save, Utensils } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ToggleSwitch } from '../../components/ui/ToggleSwitch';
import { SaveCancelButtons } from '../../components/ui/SaveCancelButtons';

interface ConsultationProgressPageProps {
  settings: Settings;
  setSettings: (settings: Settings) => void;
}

export function ConsultationProgressPage({ settings, setSettings }: ConsultationProgressPageProps) {
  const { t } = useTranslation();
  const [originalSettings, setOriginalSettings] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setHasChanges(JSON.stringify(settings) !== JSON.stringify(originalSettings));
  }, [settings, originalSettings]);

  const handleSave = () => {
    setOriginalSettings(settings);
    setHasChanges(false);
    console.log('Saving consultation progress settings:', settings);
  };

  const handleCancel = () => {
    setSettings(originalSettings);
    setHasChanges(false);
  };

  return (
    <div className="h-full p-8">
      <div className="flex items-center justify-between mb-6">
        <p className="text-base text-gray-600">근무 상황별 상담 진행 여부를 설정합니다.</p>
        <SaveCancelButtons
          hasChanges={hasChanges}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
      <div className="space-y-6">
        {/* 근무 시간외 상담 접수 카드 */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#2E3744] border-opacity-20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium mb-1">{t('settings.consultationProgress.outOfHours.title')}</h3>
              <p className="text-sm text-gray-600">{t('settings.consultationProgress.outOfHours.description')}</p>
            </div>
            <ToggleSwitch
              enabled={settings.useWorkHoursConnection}
              onChange={(enabled) => setSettings({
                ...settings,
                useWorkHoursConnection: enabled
              })}
              onLabel={t('settings.consultationProgress.outOfHours.accept')}
              offLabel={t('settings.consultationProgress.outOfHours.reject')}
            />
          </div>
        </div>

        {/* 식사 시간 동안 상담 접수 카드 */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#2E3744] border-opacity-20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium mb-1">{t('settings.consultationProgress.lunchConsultation.title')}</h3>
              <p className="text-sm text-gray-600">{t('settings.consultationProgress.lunchConsultation.description')}</p>
            </div>
            <ToggleSwitch
              enabled={settings.lunchBreak.autoMessageEnabled}
              onChange={(enabled) => setSettings({
                ...settings,
                lunchBreak: {
                  ...settings.lunchBreak,
                  autoMessageEnabled: enabled
                }
              })}
              onLabel={t('settings.consultationProgress.lunchConsultation.enabled')}
              offLabel={t('settings.consultationProgress.lunchConsultation.disabled')}
            />
          </div>

          <div className="mt-4 bg-white rounded-lg p-3 border border-[#2E3744] border-opacity-10">
            <div className="flex items-start gap-2 text-amber-600">
              <AlertCircle className="w-4 h-4 mt-0.5" />
              <div className="text-sm space-y-2">
                <p>{t('settings.consultationProgress.lunchConsultation.connectionNote')}</p>
                <p>{t('settings.consultationProgress.lunchConsultation.emptyNote')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 상담 진행 설정 카드 */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#2E3744] border-opacity-20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium mb-1">{t('settings.consultationProgress.progress.title')}</h3>
              <p className="text-sm text-gray-600">{t('settings.consultationProgress.progress.description')}</p>
            </div>
            <ToggleSwitch
              enabled={settings.autoConsultationProgress}
              onChange={(enabled) => setSettings({
                ...settings,
                autoConsultationProgress: enabled
              })}
              onLabel={t('settings.consultationProgress.progress.inProgress')}
              offLabel={t('settings.consultationProgress.progress.stopped')}
            />
          </div>

          <div className="mt-4 bg-white rounded-lg p-3 border border-[#2E3744] border-opacity-10">
            <div className="flex items-center gap-1 text-amber-600">
              <AlertCircle className="w-4 h-4" />
              <p className="text-sm">{t('settings.consultationProgress.progress.autoUpdateNote')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}