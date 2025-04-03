import React, { useState } from 'react';
import { MonthlyCalendar } from '../../components/MonthlyCalendar';
import { ConsultantScheduleModal } from '../../components/modals/ConsultantScheduleModal';
import { Calendar, Users, BarChart } from 'lucide-react';

export function MonthlySchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };
  
  const closeModal = () => {
    setSelectedDate(null);
  };
  
  return (
    <div className="h-full p-8">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">이번 달 근무일</div>
            <div className="text-xl font-semibold">22일</div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
            <Users className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">상담사 출근율</div>
            <div className="text-xl font-semibold">95.5%</div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
            <BarChart className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">스케줄 준수율</div>
            <div className="text-xl font-semibold">92.3%</div>
          </div>
        </div>
      </div>
      
      <MonthlyCalendar onDateClick={handleDateClick} />
      
      {selectedDate && (
        <ConsultantScheduleModal 
          date={selectedDate} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
}