import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DailySchedule, generateMonthlyData } from '../data/scheduleData';

interface MonthlyCalendarProps {
  onDateClick: (date: Date) => void;
}

export function MonthlyCalendar({ onDateClick }: MonthlyCalendarProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [calendarData, setCalendarData] = useState<DailySchedule[]>([]);
  
  useEffect(() => {
    setCalendarData(generateMonthlyData(currentYear, currentMonth));
  }, [currentYear, currentMonth]);
  
  const goToPreviousMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const goToNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  const goToToday = () => {
    setCurrentMonth(today.getMonth() + 1);
    setCurrentYear(today.getFullYear());
  };
  
  const handleDateClick = (day: DailySchedule) => {
    const clickedDate = new Date(day.year, day.month - 1, day.date);
    onDateClick(clickedDate);
  };
  
  const renderCalendarDay = (day: DailySchedule) => {
    const isToday = 
      day.date === today.getDate() && 
      day.month === today.getMonth() + 1 && 
      day.year === today.getFullYear();
      
    return (
      <div 
        key={`${day.year}-${day.month}-${day.date}`}
        className={`border p-2 min-h-[100px] ${
          !day.isCurrentMonth ? 'bg-gray-100' : ''
        } ${isToday ? 'bg-blue-50' : ''} hover:bg-gray-50 cursor-pointer`}
        onClick={() => handleDateClick(day)}
      >
        <div className="text-sm font-medium text-gray-700">
          {day.date}
        </div>
        {day.isCurrentMonth && (
          <div className="mt-2 text-xs">
            <div className="text-blue-600">상담가능: {day.scheduledCount}</div>
            <div className="text-green-600">상담원: {day.actualCount}</div>
            {day.adherenceRate > 0 ? (
              <div className={`${day.adherenceRate < 80 ? 'text-red-600' : 'text-gray-600'}`}>
                준수율({day.adherenceRate}%)
              </div>
            ) : (
              <div className="text-red-600">휴무()</div>
            )}
            {day.hasSchedule && (
              <div className="mt-1 text-gray-500">{day.scheduleTime}</div>
            )}
          </div>
        )}
      </div>
    );
  };
  
  // Group the calendar days into weeks
  const weeks: DailySchedule[][] = [];
  for (let i = 0; i < calendarData.length; i += 7) {
    weeks.push(calendarData.slice(i, i + 7));
  }
  
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  const formatMonthYear = (year: number, month: number) => {
    return `${year}년 ${month.toString().padStart(2, '0')}월`;
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{formatMonthYear(currentYear, currentMonth)}</h2>
        <div className="flex items-center gap-2">
          <button 
            className="p-1 rounded border hover:bg-gray-100"
            onClick={goToPreviousMonth}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            className="px-2 py-1 rounded border hover:bg-gray-100 text-sm"
            onClick={goToToday}
          >
            Today
          </button>
          <button 
            className="p-1 rounded border hover:bg-gray-100"
            onClick={goToNextMonth}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-7">
          {dayNames.map((day, index) => (
            <div 
              key={day} 
              className={`py-2 text-center font-medium text-sm border-b ${
                index === 0 ? 'text-red-500' : 
                index === 6 ? 'text-blue-500' : 'text-gray-700'
              }`}
            >
              {day}
            </div>
          ))}
          
          {weeks.map((week, weekIndex) => (
            <React.Fragment key={weekIndex}>
              {week.map((day, dayIndex) => (
                <React.Fragment key={`${day.year}-${day.month}-${day.date}`}>
                  {renderCalendarDay(day)}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}