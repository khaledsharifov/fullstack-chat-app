import { Api } from '@constants';
import { axiosInstance } from '@libs';
import { IMessage, IMessageBody, IUser } from '@types';
import toast from 'react-hot-toast';
import { create } from 'zustand';

import { useAuthStore } from './auth';

interface IUseChatStore {
  messages: IMessage[];
  users: IUser[];
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  selectedUser: IUser | null;
  setSelectedUser: (selectedUser: IUser | null) => void;
  getUsers: () => void;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
  getMessages: (userId: string) => void;
  sendMessage: (message: IMessageBody) => void;
}

export const useChatStore = create<IUseChatStore>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get(Api.Users);
      set({ users: res.data });
    } catch (error: any) {
      toast.error(error?.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(Api.Messages + userId);
      set({ messages: res.data });
    } catch (error: any) {
      toast.error(error?.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        Api.MessageSend + selectedUser?._id,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket?.on('newMessage', (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off('newMessage');
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
