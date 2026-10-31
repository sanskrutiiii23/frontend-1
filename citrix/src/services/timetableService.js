// src/services/timetableService.js
import { mockGetSessions, mockGenerateTimetable } from './mockAdapter';

const USE_MOCK = true;

export const timetableService = {
  getSessions: (filters) => USE_MOCK
    ? mockGetSessions(filters)
    : fetch(`/api/sessions?${new URLSearchParams(filters)}`).then(r => r.json()),

  generateTimetable: (config) => USE_MOCK
    ? mockGenerateTimetable(config)
    : fetch('/api/timetable/generate', { method: 'POST', body: JSON.stringify(config), headers: { 'Content-Type': 'application/json' } }).then(r => r.json()),

  exportTimetable: (format) => USE_MOCK
    ? Promise.resolve({ data: { url: '#', demo: true } })
    : fetch(`/api/timetable/export?format=${format}`).then(r => r.json()),
};
