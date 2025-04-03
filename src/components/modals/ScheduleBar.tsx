import React from 'react';

interface ScheduleBarProps {
  label: string;
  startTime: string;
  endTime: string;
  color: string;
  offsetY?: number;
  showLabel?: boolean;
  startHour?: number; // The starting hour for the chart (e.g., 7 for 7am)
}

export function ScheduleBar({ 
  label, 
  startTime, 
  endTime, 
  color, 
  offsetY = 0, 
  showLabel = false, 
  startHour = 0 
}: ScheduleBarProps) {
  const [startHourTime, startMinute] = startTime.split(':').map(Number);
  const [endHourTime, endMinute] = endTime.split(':').map(Number);
  
  // Calculate position relative to the 24-hour period starting from startHour
  const normalizeHour = (hour: number): number => {
    // Adjust hour relative to startHour
    const adjustedHour = hour - startHour;
    // Handle wrap-around for 24-hour cycle
    return adjustedHour < 0 ? adjustedHour + 24 : adjustedHour;
  };
  
  const normalizedStartHour = normalizeHour(startHourTime);
  const normalizedEndHour = normalizeHour(endHourTime);
  
  // Convert to percentage of 24-hour period
  const startPercentage = ((normalizedStartHour + startMinute / 60) / 24) * 100;
  let endPercentage = ((normalizedEndHour + endMinute / 60) / 24) * 100;
  
  // If end time is before start time in the adjusted scale, it means it crosses midnight
  if (endPercentage < startPercentage) {
    endPercentage += 100; // Add a full cycle (100%)
  }
  
  const widthPercentage = endPercentage - startPercentage;
  
  return (
    <div 
      className={`absolute h-5 ${color} rounded-sm flex items-center px-2 overflow-hidden whitespace-nowrap text-xs text-white`}
      style={{ 
        left: `${startPercentage}%`, 
        width: `${widthPercentage}%`,
        top: offsetY ? `${offsetY}%` : '0'
      }}
      title={label}
    >
      {showLabel && label}
    </div>
  );
}