import React, { useState, useEffect } from 'react';
import { X, ListChecks, BarChart3 } from 'lucide-react';
import { ConsultantSchedule, getConsultantSchedules } from '../../data/scheduleData';
import { ConsultantStatusTab } from './ConsultantStatusTab';
import { ConsultantGanttTab } from './ConsultantGanttTab';

interface ConsultantScheduleModalProps {
  date: Date;
  onClose: () => void;
}

export function ConsultantScheduleModal({ date, onClose }: ConsultantScheduleModalProps) {
  const [activeTab, setActiveTab] = useState<'status' | 'gantt'>('status');
  const [currentDate, setCurrentDate] = useState<Date>(date);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [consultants, setConsultants] = useState<ConsultantSchedule[]>([]);
  const itemsPerPage = 10;
  
  // Get and filter consultants
  useEffect(() => {
    const allConsultants = getConsultantSchedules(currentDate);
    
    if (searchQuery.trim() === '') {
      setConsultants(allConsultants);
    } else {
      const filtered = allConsultants.filter(
        consultant => 
          consultant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          consultant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          consultant.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
          consultant.position.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setConsultants(filtered);
    }
    
    // Reset to first page when search changes
    setCurrentPage(1);
  }, [currentDate, searchQuery]);
  
  const formattedDate = currentDate.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });
  
  // Calculate total break time in minutes
  const calculateTotalBreakTime = (consultant: ConsultantSchedule): number => {
    if (!consultant.breakTime.enabled) return 0;
    
    return consultant.breakTime.times.reduce((total, breakPeriod) => {
      const [startHour, startMinute] = breakPeriod.start.split(':').map(Number);
      const [endHour, endMinute] = breakPeriod.end.split(':').map(Number);
      
      const startTimeInMinutes = startHour * 60 + startMinute;
      const endTimeInMinutes = endHour * 60 + endMinute;
      
      return total + (endTimeInMinutes - startTimeInMinutes);
    }, 0);
  };
  
  // Calculate total working hours
  const calculateWorkingHours = (start: string, end: string): string => {
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);
    
    let totalMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
    if (totalMinutes < 0) totalMinutes += 24 * 60; // Handle next day
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return `${hours}시간${minutes > 0 ? ` ${minutes}분` : ''}`;
  };
  
  // Format minutes to hours and minutes
  const formatMinutes = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}시간 ${mins > 0 ? `${mins}분` : ''}`;
    }
    return `${mins}분`;
  };

  // Navigate to previous day
  const goToPreviousDay = () => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    setCurrentDate(prevDate);
  };

  // Navigate to next day
  const goToNextDay = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setCurrentDate(nextDate);
  };
  
  // Pagination calculations
  const totalPages = Math.ceil(consultants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, consultants.length);
  const currentConsultants = consultants.slice(startIndex, endIndex);
  
  // Handle search query change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-[1228.8px] max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">{formattedDate} 상담사 근무 일정</h2>
          <button 
            className="p-1 hover:bg-gray-100 rounded-full"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex px-6" aria-label="Tabs">
            <button
              className={`py-4 px-6 flex items-center gap-2 border-b-2 font-medium text-sm ${
                activeTab === 'status'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('status')}
            >
              <ListChecks className="w-5 h-5" />
              근무 현황
            </button>
            <button
              className={`py-4 px-6 flex items-center gap-2 border-b-2 font-medium text-sm ${
                activeTab === 'gantt'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('gantt')}
            >
              <BarChart3 className="w-5 h-5" />
              간트 차트
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'status' ? (
            <ConsultantStatusTab
              consultants={consultants}
              currentConsultants={currentConsultants}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              calculateTotalBreakTime={calculateTotalBreakTime}
              formatMinutes={formatMinutes}
              currentPage={currentPage}
              totalPages={totalPages}
              startIndex={startIndex}
              endIndex={endIndex}
              onPageChange={setCurrentPage}
            />
          ) : (
            <ConsultantGanttTab
              consultants={consultants}
              currentConsultants={currentConsultants}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              calculateWorkingHours={calculateWorkingHours}
              currentPage={currentPage}
              totalPages={totalPages}
              startIndex={startIndex}
              endIndex={endIndex}
              onPageChange={setCurrentPage}
              goToPreviousDay={goToPreviousDay}
              goToNextDay={goToNextDay}
            />
          )}
        </div>
      </div>
    </div>
  );
}