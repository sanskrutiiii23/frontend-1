// src/store/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEMO_ACCOUNTS } from '../data/demoData';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: (accountId) => {
        const account = DEMO_ACCOUNTS.find(a => a.id === accountId);
        if (account) {
          set({ user: account, isAuthenticated: true });
        }
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      hasRole: (role) => get().user?.role === role,

      canApprove: (requesterId) => {
        const user = get().user;
        if (!user) return false;
        // Nobody can approve their own request
        if (user.id === requesterId) return false;
        return user.role === 'admin' || user.role === 'coordinator';
      },
    }),
    { name: 'citrix-auth' }
  )
);
