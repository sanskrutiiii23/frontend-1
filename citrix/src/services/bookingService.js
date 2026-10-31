// src/services/bookingService.js
import {
  mockGetBookings, mockSubmitBooking, mockApproveBooking,
  mockRejectBooking, mockParseNLRequest,
} from './mockAdapter';

const USE_MOCK = true;

export const bookingService = {
  getBookings: (filters) => USE_MOCK
    ? mockGetBookings(filters)
    : fetch(`/api/bookings?${new URLSearchParams(filters)}`).then(r => r.json()),

  submitBooking: (booking) => USE_MOCK
    ? mockSubmitBooking(booking)
    : fetch('/api/bookings', { method: 'POST', body: JSON.stringify(booking), headers: { 'Content-Type': 'application/json' } }).then(r => r.json()),

  approveBooking: (id) => USE_MOCK
    ? mockApproveBooking(id)
    : fetch(`/api/bookings/${id}/approve`, { method: 'POST' }).then(r => r.json()),

  rejectBooking: (id, reason, alternative) => USE_MOCK
    ? mockRejectBooking(id, reason, alternative)
    : fetch(`/api/bookings/${id}/reject`, { method: 'POST', body: JSON.stringify({ reason, alternative }), headers: { 'Content-Type': 'application/json' } }).then(r => r.json()),

  parseNLRequest: (text) => USE_MOCK
    ? mockParseNLRequest(text)
    : fetch('/api/bookings/parse-nl', { method: 'POST', body: JSON.stringify({ text }), headers: { 'Content-Type': 'application/json' } }).then(r => r.json()),
};
