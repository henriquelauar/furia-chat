import { useParams } from "react-router-dom";
import { usePrivateChat } from "../hooks/usePrivateChat";
import { useUsername } from "../hooks/useUsername";
import AppLayout from "../components/AppLayout";
import Chat from "../components/Chat";

export default function PrivateChatPage() {
  const { chatId } = useParams<{ chatId: string }>();
  const { messages, sendMessage, removeMessage, endRef } = usePrivateChat(chatId!);
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
