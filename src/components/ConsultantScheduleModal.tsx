import React, { useState, useEffect } from 'react';
import { X, User, Clock, ListChecks, BarChart3, ChevronLeft, ChevronRight, Search, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { ConsultantSchedule, getConsultantSchedules } from '../data/scheduleData';

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
  
  // Pagination controls component - reused in both tabs
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    return (
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6 mt-4">
        <div className="flex items-center">
          <p className="text-sm text-gray-700">
            <span className="font-medium">{startIndex + 1}</span>
            {" - "}
            <span className="font-medium">{endIndex}</span>
            {" / "}
            <span className="font-medium">{consultants.length}</span>
            {" 명"}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-2 py-2 rounded-md border ${
              currentPage === 1
                ? 'border-gray-300 bg-white text-gray-300 cursor-not-allowed'
                : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-2 py-2 rounded-md border ${
              currentPage === 1
                ? 'border-gray-300 bg-white text-gray-300 cursor-not-allowed'
                : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          {/* Page numbers */}
          <div className="flex space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              if (pageNum <= totalPages) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`relative inline-flex items-center px-3 py-1 border rounded-md ${
                      currentPage === pageNum
                        ? 'bg-blue-50 border-blue-500 text-blue-600 z-10'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              }
              return null;
            })}
          </div>
          
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`relative inline-flex items-center px-2 py-2 rounded-md border ${
              currentPage === totalPages
                ? 'border-gray-300 bg-white text-gray-300 cursor-not-allowed'
                : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className={`relative inline-flex items-center px-2 py-2 rounded-md border ${
              currentPage === totalPages
                ? 'border-gray-300 bg-white text-gray-300 cursor-not-allowed'
                : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            <ChevronsRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  };
  
  const renderStatusTab = () => (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-medium">근무 현황</h3>
            
            {/* Search bar - moved next to the title */}
            <div className="relative w-[300px]">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="상담사 검색 (이름, 이메일, 부서, 직책)"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            상담사 {consultants.filter(c => c.isPresent).length}/{consultants.length} 출근
          </div>
        </div>
      </div>
      
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
              출근여부
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              식사시간
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              휴식 횟수
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              휴식 시간 합계
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentConsultants.map((consultant) => {
            const breakCount = consultant.breakTime.enabled ? consultant.breakTime.times.length : 0;
            const totalBreakTimeMinutes = calculateTotalBreakTime(consultant);
            
            return (
              <tr key={consultant.id} className={!consultant.isPresent ? 'bg-gray-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{consultant.name}</div>
                      <div className="text-xs text-gray-500">{consultant.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{consultant.department}</div>
                  <div className="text-xs text-gray-500">{consultant.position}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    consultant.isPresent 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {consultant.isPresent ? '출근' : '미출근'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {consultant.lunchTime.enabled ? (
                    <span className="text-sm text-gray-700">
                      {consultant.lunchTime.start} ~ {consultant.lunchTime.end}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">식사시간 미설정</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-700">
                    {breakCount > 0 ? breakCount : '-'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-700">
                    {totalBreakTimeMinutes > 0 ? formatMinutes(totalBreakTimeMinutes) : '-'}
                  </span>
                </td>
              </tr>
            );
          })}
          
          {currentConsultants.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                {searchQuery.trim() !== '' 
                  ? "검색 결과가 없습니다."
                  : "등록된 상담사가 없습니다."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      {/* Pagination */}
      {renderPagination()}
    </div>
  );
  
  const renderGanttTab = () => {
    // Generate hour labels from 07:00 to 06:00 next day
    const hourLabels = [];
    for (let i = 0; i < 24; i++) {
      const hour = (i + 7) % 24;
      const isNextDay = i >= 17; // 0 + 7 = 7, 17 + 7 = 24 (0 next day)
      hourLabels.push({
        hour,
        label: `${hour}:00${isNextDay ? '+' : ''}`
      });
    }
    
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-medium">근무 스케줄 간트 차트</h3>
            
            {/* Search input in Gantt view too for consistency */}
            <div className="relative w-[300px]">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="상담사 검색 (이름, 이메일, 부서, 직책)"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
              <span className="text-sm">근무 시간</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
              <span className="text-sm">식사 시간</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
              <span className="text-sm">휴식 시간</span>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="flex bg-gray-50 border-b">
            <div className="w-40 p-2 border-r font-medium text-sm text-gray-700 shrink-0">상담사</div>
            {hourLabels.map((hourInfo, index) => (
              <div 
                key={index} 
                className="flex-1 text-center p-1 text-xs text-gray-500 border-r"
              >
                {hourInfo.label}
              </div>
            ))}
          </div>
          
          {/* Only showing current page consultants */}
          {currentConsultants.map((consultant) => (
            <div key={consultant.id} className="flex border-b">
              <div className="w-40 p-2 border-r shrink-0">
                <div className="font-medium text-sm">{consultant.name}</div>
                <div className="text-xs text-gray-500">{consultant.position}</div>
              </div>
              
              <div className="flex-1 relative h-16">
                {/* Work hours bar */}
                {consultant.isPresent && (
                  <>
                    <ScheduleBar
                      label={`근무시간: ${consultant.workHours.start} ~ ${consultant.workHours.end} (${calculateWorkingHours(consultant.workHours.start, consultant.workHours.end)})`}
                      startTime={consultant.workHours.start}
                      endTime={consultant.workHours.end}
                      color="bg-blue-500"
                      showLabel={true}
                      startHour={7} // Start time for the chart (7am)
                    />
                    
                    {/* Lunch time bar */}
                    {consultant.lunchTime.enabled && (
                      <ScheduleBar
                        label={`식사: ${consultant.lunchTime.start} - ${consultant.lunchTime.end}`}
                        startTime={consultant.lunchTime.start}
                        endTime={consultant.lunchTime.end}
                        color="bg-yellow-500"
                        offsetY={22}
                        showLabel={false}
                        startHour={7} // Start time for the chart (7am)
                      />
                    )}
                    
                    {/* Break times bars */}
                    {consultant.breakTime.enabled && consultant.breakTime.times.map((breakTime, index) => (
                      <ScheduleBar
                        key={index}
                        label={`휴식: ${breakTime.start} - ${breakTime.end}`}
                        startTime={breakTime.start}
                        endTime={breakTime.end}
                        color="bg-green-500"
                        offsetY={44}
                        showLabel={false}
                        startHour={7} // Start time for the chart (7am)
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          ))}
          
          {currentConsultants.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              {searchQuery.trim() !== '' 
                ? "검색 결과가 없습니다."
                : "등록된 상담사가 없습니다."}
            </div>
          )}
        </div>
        
        {/* Pagination controls for gantt view */}
        {renderPagination()}
        
        {/* Navigation buttons - Updated to place Next button on right */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={goToPreviousDay}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-gray-800 flex items-center text-xs"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            이전 날짜
          </button>
          
          <button
            onClick={goToNextDay}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-gray-800 flex items-center text-xs"
          >
            다음 날짜
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    );
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
          {activeTab === 'status' ? renderStatusTab() : renderGanttTab()}
        </div>
      </div>
    </div>
  );
}

interface ScheduleBarProps {
  label: string;
  startTime: string;
  endTime: string;
  color: string;
  offsetY?: number;
  showLabel?: boolean;
  startHour?: number; // The starting hour for the chart (e.g., 7 for 7am)
}

function ScheduleBar({ 
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