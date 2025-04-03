export const consultationProgress = {
  ko: {
    title: '상담 진행 설정',
    outOfHours: {
      title: '근무 시간외 상담 접수',
      description: '근무 시간 외에도 상담을 접수받을 수 있습니다.',
      accept: '접수 안함',
      reject: '접수 중'
    },
    progress: {
      title: '상담 진행 설정',
      description: '전체 상담을 진행을 하거나 중지 시킵니다. 중지 시 채팅방이 생성 되지 않습니다.',
      inProgress: '진행 중',
      stopped: '중지',
      autoUpdateNote: '상담 진행 상태가 자동으로 업데이트됩니다.'
    },
    lunchConsultation: {
      title: '식사 시간 동안 상담 접수',
      description: '상담사 식사 시간 동안 상담 접수 방식을 설정합니다.',
      enabled: '접수 안함',
      disabled: '접수 중',
      connectionNote: 'Y로 설정될 경우, 식사시간에 유입되는 상담에 식사시간 안내 메시지가 발송되며 \'상담대기\' 상태로 유입됩니다.',
      emptyNote: '(빈칸)을 사용하는 경우, 상담고객이 \'상담원 연결\' 버튼을 누를 때 \'빛봇응답\' 상태로 유입됩니다.'
    }
  },
  en: {
    title: 'Consultation Progress',
    outOfHours: {
      title: 'Out of Hours Reception',
      description: 'Allow consultation requests outside working hours',
      accept: 'Not Accepting',
      reject: 'Accepting'
    },
    progress: {
      title: 'Consultation Progress',
      description: 'Manage overall consultation progress. When stopped, chat rooms will not be created.',
      inProgress: 'In Progress',
      stopped: 'Stopped',
      autoUpdateNote: 'Consultation progress status updates automatically'
    },
    lunchConsultation: {
      title: 'Consultation Reception During Lunch Break',
      description: 'Configure how consultation requests are handled during consultant lunch breaks.',
      enabled: 'Not Accepting',
      disabled: 'Accepting',
      connectionNote: 'Y: Send auto-message before lunch break starts and set status to "Waiting for Consultant"',
      emptyNote: 'Empty: Send auto-message when customer clicks "Connect to Consultant" and set status to "Bot Response"'
    }
  }
};