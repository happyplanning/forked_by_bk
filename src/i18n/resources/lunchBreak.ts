export const lunchBreak = {
  ko: {
    title: '상담사 식사시간',
    enable: '상담사 식사 시간 중에는 상담을 받지 않습니다.',
    enableDescription: '상담사 개인별로 별도 설정도 가능합니다.',
    schedule: '식사 설정',
    time: '일괄 식사 시간',
    autoMessage: '식사시간 시 상담 접수',
    connectionNote: 'Y로 설정될 경우, 식사시간에 유입되는 상담에 식사시간 안내 메시지가 발송되며 \'상담대기\' 상태로 유입됩니다.',
    emptyNote: '(빈칸)을 사용하는 경우, 상담고객이 \'상담원 연결\' 버튼을 누를 때 \'빛봇응답\' 상태로 유입됩니다.',
    setupMethod: '설정 방식',
    noSetup: '설정 안함',
    batchSetup: '일괄 설정',
    individualSetup: '상담사별 설정',
    scheduleOptions: {
      daily: '매일',
      weekdays: '평일',
      weekends: '주말'
    },
    individualSetupNotReady: '상담사별 설정 기능은 준비 중입니다.',
    accepting: '접수 중',
    notAccepting: '접수 안함',
    noSetupMessage: '매니저가 별도의 식사 시간을 설정하지 않습니다. 상담사는 각자의 업무 상태 설정 화면에서 비업무 시간을 선택할 수 있습니다.'
  },
  en: {
    title: 'Lunch Break Settings',
    enable: 'Do not accept consultations during lunch break',
    enableDescription: 'Individual settings are also available for each consultant',
    schedule: 'Schedule',
    time: 'Lunch break time',
    autoMessage: 'Set auto-message during lunch break',
    connectionNote: 'Y: Send auto-message before lunch break starts',
    emptyNote: 'Empty: Send auto-message when customer clicks "Connect to Consultant"',
    setupMethod: 'Setup Method',
    noSetup: 'No Setup',
    batchSetup: 'Batch Setup',
    individualSetup: 'Per Consultant Setup',
    scheduleOptions: {
      daily: 'Daily',
      weekdays: 'Weekdays',
      weekends: 'Weekends'
    },
    individualSetupNotReady: 'Per consultant setup feature is coming soon.',
    accepting: 'Accepting',
    notAccepting: 'Not Accepting',
    noSetupMessage: 'Manager does not set up separate lunch times. Consultants can select non-business hours in their own status setting screen.'
  }
};