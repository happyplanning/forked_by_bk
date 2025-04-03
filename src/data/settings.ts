export interface TimeRange {
  hour: string;
  minute: string;
  period: 'AM' | 'PM';
}

export interface DayTimeRange {
  enabled: boolean;
  isAllDay: boolean;
  start: TimeRange;
  end: TimeRange;
  isNextDay: boolean;
}

export interface Holiday {
  date: string;
  description: string;
  isAllDay: boolean;
  timeRange?: {
    start: TimeRange;
    end: TimeRange;
    isNextDay: boolean;
  };
}

export interface WorkingHours {
  monday: DayTimeRange;
  tuesday: DayTimeRange;
  wednesday: DayTimeRange;
  thursday: DayTimeRange;
  friday: DayTimeRange;
  saturday: DayTimeRange;
  sunday: DayTimeRange;
  holidays: Holiday[];
}

export interface ConsultantBreak {
  breakTime: number;
  maxBreakCount: number;
}

export interface LunchBreak {
  enabled: boolean;
  schedule: string;
  startTime: string;
  endTime: string;
  autoMessageEnabled: boolean;
}

export interface Settings {
  workingHours: WorkingHours;
  autoResponse: boolean;
  autoResponseDelay: boolean;
  welcomeMessage: boolean;
  welcomeMessageText: string;
  useWorkHoursConnection: boolean;
  workHoursConnectionType: 'Y' | 'N' | '';
  consultantBreak: ConsultantBreak;
  lunchBreak: LunchBreak;
  autoConsultationProgress: boolean;
}

const defaultTimeRange: TimeRange = { hour: '09', minute: '00', period: 'AM' };
const defaultDayTimeRange: DayTimeRange = {
  enabled: true,
  isAllDay: false,
  start: { ...defaultTimeRange },
  end: { hour: '06', minute: '00', period: 'PM' },
  isNextDay: false
};

export const defaultSettings: Settings = {
  workingHours: {
    monday: { ...defaultDayTimeRange },
    tuesday: { ...defaultDayTimeRange },
    wednesday: { ...defaultDayTimeRange },
    thursday: { ...defaultDayTimeRange },
    friday: { ...defaultDayTimeRange },
    saturday: { ...defaultDayTimeRange, enabled: false },
    sunday: { ...defaultDayTimeRange, enabled: false },
    holidays: []
  },
  autoResponse: true,
  autoResponseDelay: false,
  welcomeMessage: true,
  welcomeMessageText: '',
  useWorkHoursConnection: false,
  workHoursConnectionType: '',
  consultantBreak: {
    breakTime: 30,
    maxBreakCount: 1
  },
  lunchBreak: {
    enabled: false,
    schedule: '매일',
    startTime: '13:00',
    endTime: '14:00',
    autoMessageEnabled: false
  },
  autoConsultationProgress: false
};