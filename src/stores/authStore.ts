import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole } from '@/types';
import api from '@/lib/api';

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  sendOTP: (login: string) => Promise<boolean>;
  verifyOTP: (login: string, otp: string) => Promise<boolean>;
  customerSendOTP: (login: string) => Promise<boolean>;
  customerVerifyOTP: (login: string, otp: string) => Promise<boolean>;
  register: (data: { name: string; email: string; phone: string; password: string }) => Promise<boolean>;
  logout: () => void;
  hasRole: (roles: UserRole[]) => boolean;
}

function mapUserResponse(data: Record<string, unknown>, fallbackRole: UserRole): User {
  return {
    id: String(data.id),
    name: data.name as string,
    email: data.email as string,
    phone: data.phone as string,
    role: (data.role as UserRole) || fallbackRole,
    isVerified: true,
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'active',
  };
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      sendOTP: async (login: string) => {
        set({ isLoading: true });
        try {
          await api.post('/auth/send-otp', { login });
          set({ isLoading: false });
          return true;
        } catch {
          set({ isLoading: false });
          return false;
        }
      },

      verifyOTP: async (login: string, otp: string) => {
        set({ isLoading: true });
        try {
          const response = await api.post('/auth/verify-otp', { login, otp });
          const data = response.data;
          set({
            user: mapUserResponse(data, 'owner'),
            token: data.access_token,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } catch {
          set({ isLoading: false });
          return false;
        }
      },

      customerSendOTP: async (login: string) => {
        set({ isLoading: true });
        try {
          await api.post('/auth/customer/send-otp', { login });
          set({ isLoading: false });
          return true;
        } catch {
          set({ isLoading: false });
          return false;
        }
      },

      customerVerifyOTP: async (login: string, otp: string) => {
        set({ isLoading: true });
        try {
          const response = await api.post('/auth/customer/verify-otp', { login, otp });
          const data = response.data;
          set({
            user: mapUserResponse(data, 'customer'),
            token: data.access_token,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } catch {
          set({ isLoading: false });
          return false;
        }
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await api.post('/auth/login', { email, password });
          const data = response.data;
          set({
            user: mapUserResponse(data, 'customer'),
            token: data.access_token,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } catch {
          set({ isLoading: false });
          return false;
        }
      },

      register: async (data) => {
        set({ isLoading: true });
        try {
          await api.post('/auth/register', {
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: data.password,
          });
          set({ isLoading: false });
          return true;
        } catch {
          set({ isLoading: false });
          return false;
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      hasRole: (roles: UserRole[]) => {
        const user = get().user;
        if (!user) return false;
        return roles.includes(user.role);
      },
    }),
    {
      name: 'jayasree-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
