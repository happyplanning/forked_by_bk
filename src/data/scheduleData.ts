export interface DailySchedule {
  date: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  scheduledCount: number;
  actualCount: number;
  adherenceRate: number;
  hasSchedule: boolean;
  scheduleTime?: string;
}

export interface ConsultantSchedule {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  workHours: {
    start: string;
    end: string;
  };
  breakTime: {
    enabled: boolean;
    times: Array<{
      start: string;
      end: string;
    }>;
  };
  lunchTime: {
    enabled: boolean;
    start: string;
    end: string;
  };
  isPresent: boolean;
}

export function generateMonthlyData(year: number, month: number): DailySchedule[] {
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  
  // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
  const firstDayOfWeek = firstDayOfMonth.getDay();
  
  // Calculate days from previous month to display
  const daysFromPrevMonth = firstDayOfWeek;
  const prevMonth = month === 1 ? 12 : month - 1;
  const prevMonthYear = month === 1 ? year - 1 : year;
  const lastDayOfPrevMonth = new Date(prevMonthYear, prevMonth, 0).getDate();
  
  // Calculate days from next month to display
  const remainingCells = (6 * 7) - (daysFromPrevMonth + daysInMonth);
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextMonthYear = month === 12 ? year + 1 : year;
  
  const calendarDays: DailySchedule[] = [];
  
  // Add days from previous month
  for (let i = 0; i < daysFromPrevMonth; i++) {
    const day = lastDayOfPrevMonth - daysFromPrevMonth + i + 1;
    calendarDays.push({
      date: day,
      month: prevMonth,
      year: prevMonthYear,
      isCurrentMonth: false,
      scheduledCount: 3,
      actualCount: 0,
      adherenceRate: 0,
      hasSchedule: false
    });
  }
  
  // Add days from current month
  for (let day = 1; day <= daysInMonth; day++) {
    const isWeekday = new Date(year, month - 1, day).getDay() !== 0 && new Date(year, month - 1, day).getDay() !== 6;
    calendarDays.push({
      date: day,
      month,
      year,
      isCurrentMonth: true,
      scheduledCount: 3,
      actualCount: isWeekday ? 3 : 0,
      adherenceRate: isWeekday ? 100 : 0,
      hasSchedule: isWeekday,
      scheduleTime: isWeekday ? '10:00-18:00 근무' : undefined
    });
  }
  
  // Add days from next month
  for (let i = 1; i <= remainingCells; i++) {
    calendarDays.push({
      date: i,
      month: nextMonth,
      year: nextMonthYear,
      isCurrentMonth: false,
      scheduledCount: 3,
      actualCount: 0,
      adherenceRate: 0,
      hasSchedule: false
    });
  }
  
  return calendarDays;
}

export function getConsultantSchedules(date: Date): ConsultantSchedule[] {
  // This is mock data - in a real app, you would fetch this from an API
  return [
    {
      id: 'c001',
      name: '김상담',
      email: 'kim@happytalk.io',
      department: '고객지원팀',
      position: '주임 상담사',
      workHours: {
        start: '09:00',
        end: '18:00',
      },
      breakTime: {
        enabled: true,
        times: [
          { start: '10:30', end: '10:45' },
          { start: '15:30', end: '15:45' },
        ],
      },
      lunchTime: {
        enabled: true,
        start: '12:00',
        end: '13:00',
      },
      isPresent: true,
    },
    {
      id: 'c002',
      name: '이해피',
      email: 'lee@happytalk.io',
      department: '고객지원팀',
      position: '선임 상담사',
      workHours: {
        start: '10:00',
        end: '19:00',
      },
      breakTime: {
        enabled: true,
        times: [
          { start: '11:30', end: '11:45' },
          { start: '16:30', end: '16:45' },
        ],
      },
      lunchTime: {
        enabled: true,
        start: '13:00',
        end: '14:00',
      },
      isPresent: true,
    },
    {
      id: 'c003',
      name: '박토크',
      email: 'park@happytalk.io',
      department: '마케팅팀',
      position: '상담사',
      workHours: {
        start: '09:00',
        end: '18:00',
      },
      breakTime: {
        enabled: true,
        times: [
          { start: '10:30', end: '10:45' },
          { start: '15:30', end: '15:45' },
        ],
      },
      lunchTime: {
        enabled: true,
        start: '12:30',
        end: '13:30',
      },
      isPresent: false,
    },
    {
      id: 'c004',
      name: '정소통',
      email: 'jung@happytalk.io',
      department: '마케팅팀',
      position: '상담사',
      workHours: {
        start: '08:30',
        end: '17:30',
      },
      breakTime: {
        enabled: true,
        times: [
          { start: '10:00', end: '10:15' },
          { start: '15:00', end: '15:15' },
        ],
      },
      lunchTime: {
        enabled: true,
        start: '11:30',
        end: '12:30',
      },
      isPresent: true,
    },
    {
      id: 'c005',
      name: '최서비스',
      email: 'choi@happytalk.io',
      department: '기술지원팀',
      position: '상담사',
      workHours: {
        start: '09:00',
        end: '18:00',
      },
      breakTime: {
        enabled: true,
        times: [
          { start: '10:30', end: '10:45' },
          { start: '15:30', end: '15:45' },
        ],
      },
      lunchTime: {
        enabled: true,
        start: '12:00',
        end: '13:00',
      },
      isPresent: true,
    },
    // Additional 10 consultants
    {
      id: 'c006',
      name: '강진행',
      email: 'kang@happytalk.io',
      department: '기술지원팀',
      position: '선임 상담사',
      workHours: {
        start: '09:30',
        end: '18:30',
      },
      breakTime: {
        enabled: true,
        times: [
          { start: '11:00', end: '11:15' },
          { start: '16:00', end: '16:15' },
        ],
      },
      lunchTime: {
        enabled: true,
        start: '12:30',
        end: '13:30',
      },
      isPresent: true,
    },
    {
      id: 'c007',
      name: '윤채팅',
      email: 'yoon@happytalk.io',
      department: '고객지원팀',
      position: '상담사',
      workHours: {
        start: '08:00',
        end: '17:00',
      },
      breakTime: {
        enabled: true,
        times: [
          { start: '09:30', end: '09:45' },
          { start: '14:30', end: '14:45' },
        ],
      },
      lunchTime: {
        enabled: true,
        start: '11:30',
        end: '12:30',
      },
      isPresent: true,
    },
    {
      id: 'c008',
      name: '조상담',
      email: 'jo@happytalk.io',
      department: '마케팅팀',
      position: '책임 상담사',
      workHours: {
        start: '09:00',
        end: '18:00',
      },
      breakTime: {
        enabled: false,
        times: [],
      },
      lunchTime: {
        enabled: true,
        start: '12:00',
        end: '13:00',
      },
      isPresent: false,
    },
    {
      id: 'c009',
      name: '한지원',
      email: 'han@happytalk.io',
      department: '고객지원팀',
      position: '상담사',
      workHours: {
        start: '10:30',
        end: '19:30',
      },
      breakTime: {
        enabled: true,
        times: [
          { start: '12:00', end: '12:15' },
          { start: '17:00', end: '17:15' },
        ],
      },
      lunchTime: {
        enabled: true,
        start: '14:00',
        end: '15:00',
      },
      isPresent: true,
    },
    {
      id: 'c010',
      name: '배도움',
      email: 'bae@happytalk.io',
      department: '기술지원팀',
      position: '상담사',
      workHours: {
        start: '09:00',
        end: '18:00',
      },
      breakTime: {
        enabled: true,
        times: [
          { start: '10:30', end: '10:45' },
        ],
      },
      lunchTime: {
        enabled: true,
        start: '12:30',
        end: '13:30',
      },
      isPresent: true,
    },
    {
      id: 'c011',
      name: '홍고객',
      email: 'hong@happytalk.io',
      department: '마케팅팀',
      position: '상담사',
      workHours: {
        start: '08:30',
        end: '17:30',
      },
      breakTime: {
        enabled: true,
        times: [
          { start: '10:00', end: '10:15' },
          { start: '15:00', end: '15:15' },
        ],
      },
      lunchTime: {
        enabled: false,
        start: '',
        end: '',
      },
      isPresent: true,
    },
    {
      id: 'c012',
      name: '이메일',
      email: 'email@happytalk.io',
      department: '고객지원팀',
      position: '책임 상담사',
      workHours: {
        start: '09:00',
        end: '18:00',
      },
      breakTime: {
        enabled: true,
        times: [
          { start: '11:00', end: '11:15' },
          { start: '15:30', end: '15:45' },
        ],
      },
      lunchTime: {
        enabled: true,
        start: '13:00',
        end: '14:00',
      },
      isPresent: false,
    },
    {
      id: 'c013',
      name: '신연결',
      email: 'shin@happytalk.io',
      department: '기술지원팀',
      position: '선임 상담사',
      workHours: {
        start: '10:00',
        end: '19:00',
      },
      breakTime: {
        enabled: true,
        times: [
          { start: '12:30', end: '12:45' },
          { start: '16:30', end: '16:45' },
        ],
      },
      lunchTime: {
        enabled: true,
        start: '14:00',
        end: '15:00',
      },
      isPresent: true,
    },
    {
      id: 'c014',
      name: '주응대',
      email: 'joo@happytalk.io',
      department: '고객지원팀',
      position: '상담사',
      workHours: {
        start: '08:00',
        end: '17:00',
      },
      breakTime: {
        enabled: false,
        times: [],
      },
      lunchTime: {
        enabled: true,
        start: '12:00',
        end: '13:00',
      },
      isPresent: true,
    },
    {
      id: 'c015',
      name: '김서포트',
      email: 'support@happytalk.io',
      department: '마케팅팀',
      position: '상담사',
      workHours: {
        start: '09:00',
        end: '18:00',
      },
      breakTime: {
        enabled: true,
        times: [
          { start: '10:30', end: '10:45' },
          { start: '15:30', end: '15:45' },
        ],
      },
      lunchTime: {
        enabled: true,
        start: '12:30',
        end: '13:30',
      },
      isPresent: true,
    },
  ];
}