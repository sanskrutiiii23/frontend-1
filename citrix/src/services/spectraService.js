// src/services/spectraService.js
import { mockGetSpectra, mockApproveSpectra, mockRejectSpectra } from './mockAdapter';

const USE_MOCK = true;

export const spectraService = {
  getEvents: (filters) => USE_MOCK
    ? mockGetSpectra(filters)
    : fetch(`/api/spectra?${new URLSearchParams(filters)}`).then(r => r.json()),

  approveEvent: (id, reason) => USE_MOCK
    ? mockApproveSpectra(id, reason)
    : fetch(`/api/spectra/${id}/approve`, { method: 'POST', body: JSON.stringify({ reason }), headers: { 'Content-Type': 'application/json' } }).then(r => r.json()),

  rejectEvent: (id, reason, alternativeRoom) => USE_MOCK
    ? mockRejectSpectra(id, reason, alternativeRoom)
    : fetch(`/api/spectra/${id}/reject`, { method: 'POST', body: JSON.stringify({ reason, alternativeRoom }), headers: { 'Content-Type': 'application/json' } }).then(r => r.json()),
};
