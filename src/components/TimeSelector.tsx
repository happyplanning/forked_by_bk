import React from 'react';
import { TimeRange } from '../data/settings';
import { Clock } from 'lucide-react';

interface TimeSelectorProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
  disabled?: boolean;
}

export function TimeSelector({ value, onChange, disabled = false }: TimeSelectorProps) {
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Clock className="w-4 h-4 text-gray-500" />
        </div>
        <select
          className={`pl-10 w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-[13px] ${
            disabled ? 'bg-gray-100 text-gray-500' : ''
          }`}
          value={value.hour}
          onChange={(e) => onChange({ ...value, hour: e.target.value })}
          disabled={disabled}
        >
          {hours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
      </div>
      <span>:</span>
      <select
        className={`rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-[13px] ${
          disabled ? 'bg-gray-100 text-gray-500' : ''
        }`}
        value={value.minute}
        onChange={(e) => onChange({ ...value, minute: e.target.value })}
        disabled={disabled}
      >
        {minutes.map((minute) => (
          <option key={minute} value={minute}>
            {minute}
          </option>
        ))}
      </select>
      <select
        className={`rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-[13px] ${
          disabled ? 'bg-gray-100 text-gray-500' : ''
        }`}
        value={value.period}
        onChange={(e) => onChange({ ...value, period: e.target.value as 'AM' | 'PM' })}
        disabled={disabled}
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
}