// src/services/examService.js
import { mockGetMidsemExams, mockGenerateMidsemSchedule } from './mockAdapter';

const USE_MOCK = true;

export const examService = {
  getExams: (filters) => USE_MOCK
    ? mockGetMidsemExams(filters)
    : fetch(`/api/exams?${new URLSearchParams(filters)}`).then(r => r.json()),

  generateSchedule: () => USE_MOCK
    ? mockGenerateMidsemSchedule()
    : fetch('/api/exams/generate', { method: 'POST' }).then(r => r.json()),
};
