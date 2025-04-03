import React from 'react';
import { User, Search } from 'lucide-react';
import { PaginationControls } from './PaginationControls';
import { ConsultantSchedule } from '../../data/scheduleData';

interface ConsultantStatusTabProps {
  consultants: ConsultantSchedule[];
  currentConsultants: ConsultantSchedule[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  calculateTotalBreakTime: (consultant: ConsultantSchedule) => number;
  formatMinutes: (minutes: number) => string;
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
}

export function ConsultantStatusTab({
  consultants,
  currentConsultants,
  searchQuery,
  onSearchChange,
  calculateTotalBreakTime,
  formatMinutes,
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  onPageChange
}: ConsultantStatusTabProps) {
  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-medium">근무 현황</h3>
            
            {/* Search bar - next to the title */}
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
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={consultants.length}
        onPageChange={onPageChange}
      />
    </div>
  );
}