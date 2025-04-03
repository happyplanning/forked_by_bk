import { common } from './resources/common';
import { gnb } from './resources/gnb';
import { settings } from './resources/settings';
import { workingHours } from './resources/workingHours';
import { consultantBreak } from './resources/consultantBreak';
import { lunchBreak } from './resources/lunchBreak';
import { consultationProgress } from './resources/consultationProgress';

export const resources = {
  ko: {
    translation: {
      ...common.ko,
      ...gnb.ko,
      settings: {
        ...settings.ko,
        workingHours: workingHours.ko,
        consultantBreak: consultantBreak.ko,
        lunchBreak: lunchBreak.ko,
        consultationProgress: consultationProgress.ko
      }
    }
  },
  en: {
    translation: {
      ...common.en,
      ...gnb.en,
      settings: {
        ...settings.en,
        workingHours: workingHours.en,
        consultantBreak: consultantBreak.en,
        lunchBreak: lunchBreak.en,
        consultationProgress: consultationProgress.en
      }
    }
  }
};