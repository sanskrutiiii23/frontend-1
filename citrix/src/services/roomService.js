// src/services/roomService.js
import {
  mockGetRooms, mockGetRoom, mockGetRoomAvailability
} from './mockAdapter';

const USE_MOCK = true; // Set to false when connecting to real backend

export const roomService = {
  getRooms: (filters) => USE_MOCK
    ? mockGetRooms(filters)
    : fetch(`/api/rooms?${new URLSearchParams(filters)}`).then(r => r.json()),

  getRoom: (id) => USE_MOCK
    ? mockGetRoom(id)
    : fetch(`/api/rooms/${id}`).then(r => r.json()),

  getRoomAvailability: (roomId, date) => USE_MOCK
    ? mockGetRoomAvailability(roomId, date)
    : fetch(`/api/rooms/${roomId}/availability?date=${date}`).then(r => r.json()),
};
