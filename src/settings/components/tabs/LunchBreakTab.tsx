import React, { useState, useEffect } from 'react';
import { Settings } from '../../../data/settings';
import { Utensils, AlertCircle, Clock, Search, Users, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ToggleSwitch } from '../../../components/ui/ToggleSwitch';
import { SaveCancelButtons } from '../../../components/ui/SaveCancelButtons';
import { consultants, Consultant } from '../../../data/consultants';

interface LunchBreakTabProps {
  settings: Settings;
  setSettings: (settings: Settings) => void;
}

export function LunchBreakTab({ settings, setSettings }: LunchBreakTabProps) {
  const { t } = useTranslation();
  const [originalSettings, setOriginalSettings] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);
  const [setupMethod, setSetupMethod] = useState<'none' | 'batch' | 'individual'>('batch');
  const [searchQuery, setSearchQuery] = useState('');
  const [localConsultants, setLocalConsultants] = useState<Consultant[]>(consultants);

  useEffect(() => {
    setHasChanges(JSON.stringify(settings) !== JSON.stringify(originalSettings));
  }, [settings, originalSettings]);

  const handleSave = () => {
    setOriginalSettings(settings);
    setHasChanges(false);
    console.log('Saving lunch break settings:', settings);
  };

  const handleCancel = () => {
    setSettings(originalSettings);
    setHasChanges(false);
  };

  const filteredConsultants = localConsultants.filter(
    consultant => 
      consultant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultant.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateConsultantLunchBreak = (consultantId: string, field: string, value: any) => {
    const updatedConsultants = localConsultants.map(consultant => {
      if (consultant.id === consultantId) {
        return {
          ...consultant,
          lunchBreak: {
            ...consultant.lunchBreak,
            [field]: value
          }
        };
      }
      return consultant;
    });
    setLocalConsultants(updatedConsultants);
    setHasChanges(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <p className="text-base text-gray-600">상담사의 식사 시간을 설정해주세요. 일괄 혹은 개인별 설정이 가능합니다.</p>
        <SaveCancelButtons
          hasChanges={hasChanges}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
      
      {/* 설정 방식 선택 */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-[#2E3744] border-opacity-20">
        <h3 className="font-medium text-gray-700 mb-4">{t('settings.lunchBreak.setupMethod')}</h3>
        <div className="flex gap-4">
          <button
            className={`flex-1 py-2 px-4 rounded-lg border ${
              setupMethod === 'none'
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setSetupMethod('none')}
          >
            {t('settings.lunchBreak.noSetup')}
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-lg border ${
              setupMethod === 'batch'
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setSetupMethod('batch')}
          >
            {t('settings.lunchBreak.batchSetup')}
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-lg border ${
              setupMethod === 'individual'
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setSetupMethod('individual')}
          >
            {t('settings.lunchBreak.individualSetup')}
          </button>
        </div>
      </div>

      {/* Show alert message when "설정 안함" is selected - Simplified structure */}
      {setupMethod === 'none' && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#2E3744] border-opacity-20">
          <div className="flex items-start gap-2 text-amber-600">
            <AlertCircle className="w-4 h-4 mt-0.5" />
            <p className="text-sm">{t('settings.lunchBreak.noSetupMessage')}</p>
          </div>
        </div>
      )}

      {/* 일괄 설정 내용 */}
      {setupMethod === 'batch' && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#2E3744] border-opacity-20">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('settings.lunchBreak.time')}
          </label>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Clock className="w-4 h-4 text-gray-500" />
              </div>
              <input
                type="time"
                value={settings.lunchBreak.startTime}
                onChange={(e) => setSettings({
                  ...settings,
                  lunchBreak: { ...settings.lunchBreak, startTime: e.target.value }
                })}
                className="pl-10 w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <span className="text-gray-500">~</span>
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Clock className="w-4 h-4 text-gray-500" />
              </div>
              <input
                type="time"
                value={settings.lunchBreak.endTime}
                onChange={(e) => setSettings({
                  ...settings,
                  lunchBreak: { ...settings.lunchBreak, endTime: e.target.value }
                })}
                className="pl-10 w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
          </div>
        </div>
      )}

      {/* 개인별 설정 내용 */}
      {setupMethod === 'individual' && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#2E3744] border-opacity-20">
          {/* 상담사 검색 */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
              placeholder="상담사 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* 상담사 목록 */}
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상담사
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    부서/직책
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    식사시간
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    접수여부
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredConsultants.length > 0 ? (
                  filteredConsultants.map((consultant) => (
                    <tr key={consultant.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{consultant.name}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Mail className="h-3 w-3 mr-1" /> {consultant.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{consultant.department}</div>
                        <div className="text-sm text-gray-500">{consultant.position}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <input
                            type="time"
                            value={consultant.lunchBreak.startTime}
                            onChange={(e) => updateConsultantLunchBreak(consultant.id, 'startTime', e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm"
                            disabled={!consultant.lunchBreak.enabled}
                          />
                          <span>~</span>
                          <input
                            type="time"
                            value={consultant.lunchBreak.endTime}
                            onChange={(e) => updateConsultantLunchBreak(consultant.id, 'endTime', e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm"
                            disabled={!consultant.lunchBreak.enabled}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <ToggleSwitch
                          enabled={consultant.lunchBreak.enabled}
                          onChange={(enabled) => updateConsultantLunchBreak(consultant.id, 'enabled', enabled)}
                          size="sm"
                          showLabels={false}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                      검색 결과가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}