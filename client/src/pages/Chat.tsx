import Chat from '../components/Chat';
import AppLayout from '../components/AppLayout';
import { useChat } from "../hooks/useChat";
import { useUsername } from "../hooks/useUsername";

export default function ChatPage() {
  const { messages, sendMessage, removeMessage, endRef } = useChat();
  const username = useUsername();

  if (!username) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <AppLayout>
      <Chat
        messages={messages}
        sendMessage={sendMessage}
        removeMessage={removeMessage}
        endRef={endRef}
        username={username}
      />
    </AppLayout>
  );
}
