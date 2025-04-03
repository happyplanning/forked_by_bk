import React from 'react';
import { TimeRange } from '../../data/settings';
import { Clock } from 'lucide-react';

interface TimeSelectorProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
  disabled?: boolean;
}

export function TimeSelector({ value, onChange, disabled = false }: TimeSelectorProps) {
  // Convert hour and minute to format needed for time input
  const formatTimeForInput = () => {
    // Convert from 12-hour to 24-hour format
    let hour = parseInt(value.hour);
    if (value.period === 'PM' && hour < 12) {
      hour += 12;
    } else if (value.period === 'AM' && hour === 12) {
      hour = 0;
    }
    
    // Format as HH:MM
    return `${hour.toString().padStart(2, '0')}:${value.minute.padStart(2, '0')}`;
  };

  // Handle time input changes
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hourStr, minuteStr] = e.target.value.split(':');
    let hour = parseInt(hourStr);
    const minute = minuteStr;
    
    // Convert 24-hour to 12-hour format
    let period: 'AM' | 'PM' = 'AM';
    if (hour >= 12) {
      period = 'PM';
      if (hour > 12) {
        hour -= 12;
      }
    } else if (hour === 0) {
      hour = 12;
    }
    
    onChange({
      hour: hour.toString().padStart(2, '0'),
      minute,
      period
    });
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Clock className="w-4 h-4 text-gray-500" />
      </div>
      <input
        type="time"
        value={formatTimeForInput()}
        onChange={handleTimeChange}
        disabled={disabled}
        className={`pl-10 w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 ${
          disabled ? 'bg-gray-100 text-gray-500' : ''
        }`}
      />
    </div>
  );
}