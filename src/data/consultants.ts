// Mock data for consultants
export interface Consultant {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  lunchBreak: {
    enabled: boolean;
    startTime: string;
    endTime: string;
  };
}

export const consultants: Consultant[] = [
  {
    id: 'c001',
    name: '김상담',
    email: 'kim@happytalk.io',
    department: '고객지원팀',
    position: '주임 상담사',
    lunchBreak: {
      enabled: true,
      startTime: '12:00',
      endTime: '13:00',
    },
  },
  {
    id: 'c002',
    name: '이해피',
    email: 'lee@happytalk.io',
    department: '고객지원팀',
    position: '선임 상담사',
    lunchBreak: {
      enabled: true,
      startTime: '13:00',
      endTime: '14:00',
    },
  },
  {
    id: 'c003',
    name: '박토크',
    email: 'park@happytalk.io',
    department: '마케팅팀',
    position: '상담사',
    lunchBreak: {
      enabled: false,
      startTime: '12:30',
      endTime: '13:30',
    },
  },
  {
    id: 'c004',
    name: '정소통',
    email: 'jung@happytalk.io',
    department: '마케팅팀',
    position: '상담사',
    lunchBreak: {
      enabled: true,
      startTime: '11:30',
      endTime: '12:30',
    },
  },
  {
    id: 'c005',
    name: '최서비스',
    email: 'choi@happytalk.io',
    department: '기술지원팀',
    position: '상담사',
    lunchBreak: {
      enabled: true,
      startTime: '12:00',
      endTime: '13:00',
    },
  },
];