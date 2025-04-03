import React from 'react';
import { Save, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SaveCancelButtonsProps {
  hasChanges: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export function SaveCancelButtons({ hasChanges, onSave, onCancel }: SaveCancelButtonsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      {hasChanges && (
        <button
          onClick={onCancel}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
          취소
        </button>
      )}
      <button
        onClick={onSave}
        className={`flex items-center gap-2 px-4 py-2 ${
          hasChanges ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
        } text-white rounded-lg transition-colors`}
      >
        <Save className="w-4 h-4" />
        적용
      </button>
    </div>
  );
}