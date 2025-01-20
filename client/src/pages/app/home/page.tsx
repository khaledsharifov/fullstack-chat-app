import { ChatContainer, NoChatSelected, Sidebar } from '@components';
import { useChatStore } from '@store';

export const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center px-4 pt-20">
        <div className="shadow-cl h-[calc(100vh-8rem)] w-full max-w-6xl rounded-lg bg-base-100">
          <div className="flex h-full overflow-hidden rounded-lg">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
