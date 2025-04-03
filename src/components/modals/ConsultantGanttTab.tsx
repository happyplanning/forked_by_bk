import React from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScheduleBar } from './ScheduleBar';
import { PaginationControls } from './PaginationControls';
import { ConsultantSchedule } from '../../data/scheduleData';

interface ConsultantGanttTabProps {
  consultants: ConsultantSchedule[];
  currentConsultants: ConsultantSchedule[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  calculateWorkingHours: (start: string, end: string) => string;
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
  goToPreviousDay: () => void;
  goToNextDay: () => void;
}

export function ConsultantGanttTab({
  consultants,
  currentConsultants,
  searchQuery,
  onSearchChange,
  calculateWorkingHours,
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  onPageChange,
  goToPreviousDay,
  goToNextDay
}: ConsultantGanttTabProps) {
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
              onChange={(e) => onSearchChange(e.target.value)}
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
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={consultants.length}
        onPageChange={onPageChange}
      />
      
      {/* Navigation buttons - Next button on right */}
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
}