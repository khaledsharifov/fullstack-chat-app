import { Api } from '@constants';
import { axiosInstance } from '@libs';
import { ILoginForm, IProfilePic, ISignUpForm, IUser } from '@types';
import toast from 'react-hot-toast';
import { create } from 'zustand';
import { io } from 'socket.io-client';

interface IUseAuthStore {
  authUser: IUser | null;
  isCheckingAuth: boolean;
  isUpdatingProfile: boolean;
  onlineUsers: string[];
  isLoading: boolean;
  checkAuth: () => void;
  logout: () => void;
  isSigningUp: boolean;
  signup: (body: ISignUpForm) => void;
  updateProfile: (body: IProfilePic) => void;
  login: (body: ILoginForm) => void;
  isLoggingIn: boolean;
  connectSocket: () => void;
  disconnectSocket: () => void;
  socket: ReturnType<typeof io> | null;
}

const BASE_URL =
  import.meta.env.MODE === 'development' ? 'http://localhost:5001' : '/';

export const useAuthStore = create<IUseAuthStore>((set, get) => ({
  authUser: null,
  onlineUsers: [],
  isCheckingAuth: true,
  isSigningUp: false,
  isLoading: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  socket: null,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get(Api.CheckAuth);
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error: any) {
      console.log(error?.response.data.message ?? 'Something went wrong');
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (body) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post(Api.SignUp, body);
      toast.success('Account created successfully');
      get().connectSocket();
      set({ authUser: res.data });
    } catch (error: any) {
      toast.error(error?.response.data.message ?? 'Something went wrong');
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (body) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post(Api.Login, body);
      set({ authUser: res.data });
      toast.success('Logged in successfully');
      get().connectSocket();
    } catch (error: any) {
      toast.error(error.response.data.message ?? 'Something went wrong');
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post(Api.Logout);
      toast.success('Logged out successfully');
      get().disconnectSocket();
      set({ authUser: null });
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  },
  updateProfile: async (body) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put(Api.UpdateProfile, body);
      set({ authUser: res.data });
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error?.response.data.message ?? 'Something went wrong');
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on('getOnlineUsers', (usersIds) => set({ onlineUsers: usersIds }));
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket?.disconnect();
  },
}));
