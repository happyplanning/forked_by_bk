import { common } from './common';
import { gnb } from './gnb';
import { settings } from './settings';
import { workingHours } from './workingHours';
import { consultantBreak } from './consultantBreak';
import { lunchBreak } from './lunchBreak';
import { consultationProgress } from './consultationProgress';

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