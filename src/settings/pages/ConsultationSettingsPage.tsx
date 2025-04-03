import React from 'react';
import { Settings } from '../../data/settings';
import { MessageSquare, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ConsultationSettingsPageProps {
  settings: Settings;
  setSettings: (settings: Settings) => void;
}

export function ConsultationSettingsPage({ settings, setSettings }: ConsultationSettingsPageProps) {
  const { t } = useTranslation();

  return (
    <div className="h-full p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">상담 진행 설정</h1>
      </div>

      <div className="space-y-6">
        {/* 근무 시간외 상담 접수 카드 */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#2E3744] border-opacity-20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium mb-1">근무 시간외 상담 접수</h3>
              <p className="text-sm text-gray-600">근무 시간 외에도 상담을 접수받을 수 있습니다.</p>
            </div>
            <div className="w-12 h-6 bg-[#2E3744] bg-opacity-10 rounded-full p-1 duration-300 ease-in-out cursor-pointer"
                 onClick={() => setSettings({
                   ...settings,
                   useWorkHoursConnection: !settings.useWorkHoursConnection
                 })}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                settings.useWorkHoursConnection ? 'translate-x-6 bg-blue-600' : ''
              }`} />
            </div>
          </div>
        </div>

        {/* 상담 진행 설정 카드 */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#2E3744] border-opacity-20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium mb-1">상담 진행 설정</h3>
              <p className="text-sm text-gray-600">전체 상담을 진행을 하거나 중지 시킵니다. 중지 시 채팅방이 생성 되지 않습니다.</p>
            </div>
            <div className="w-24 h-8 bg-[#2E3744] bg-opacity-10 rounded-full p-1 duration-300 ease-in-out cursor-pointer relative"
                 onClick={() => setSettings({
                   ...settings,
                   autoConsultationProgress: !settings.autoConsultationProgress
                 })}
            >
              <div className={`absolute inset-0 flex items-center ${
                settings.autoConsultationProgress ? 'justify-start' : 'justify-end'
              }`}>
                <div className={`w-14 text-center text-xs font-medium ${
                  settings.autoConsultationProgress ? 'ml-2' : 'mr-2'
                } ${
                  settings.autoConsultationProgress ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  {settings.autoConsultationProgress ? '중지 중' : '진행 중'}
                </div>
              </div>
              <div className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${
                settings.autoConsultationProgress ? 'translate-x-14 bg-blue-600' : ''
              }`} />
            </div>
          </div>

          <div className="mt-4 bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-1 text-amber-600">
              <AlertCircle className="w-4 h-4" />
              <p className="text-sm">상담 진행 상태가 자동으로 업데이트됩니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}