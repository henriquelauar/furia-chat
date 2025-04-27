/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, useEffect } from "react";
import { privateChatService } from "../services/privateChatService";
import { useNavigate } from "react-router";
import { supabase } from "../supabase/supabaseClient";
import { Profile, PrivateChat } from "../types";

export const PrivateChatList: FC = () => {
  const [users, setUsers] = useState<Profile[]>([]);
  const [chats, setChats] = useState<PrivateChat[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Novo: controle de loading
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: authData } = await supabase.auth.getUser();
      const loggedUser = authData.user;
      if (!loggedUser) return;

      setCurrentUserId(loggedUser.id);

      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('id, username');
      
      if (userError) {
        console.error(userError);
        return;
      }

      const userChats = await privateChatService.getPrivateChats();
      const filteredUsers = (userData || []).filter(u => u.id !== loggedUser.id);

      setUsers(filteredUsers as Profile[]);
      setChats(userChats);
      setLoading(false);
    };

    fetchData();
  }, []);

  const findChatWithUser = (userId: string) => {
    return chats.find(chat =>
      (chat.user1_id === currentUserId && chat.user2_id === userId) ||
      (chat.user2_id === currentUserId && chat.user1_id === userId)
    );
  };

  const handleNewChat = async (user2Id: string) => {
    try {
      const chat = await privateChatService.createPrivateChat(user2Id);
      navigate(`/private-chat/${chat.id}`);
    } catch (err: any) {
      alert("Erro ao criar chat privado: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="list-group mb-4">
        <button className="p-2 rounded shadow-sm h-100 d-flex flex-column justify-content-center btn btn-dark w-100 mb-1" onClick={() => navigate('/chat')}>
          Chat Principal
        </button>
        {users.map((user) => {
        const existingChat = findChatWithUser(user.id);

        const isActive = existingChat && location.pathname === `/private-chat/${existingChat.id}`;

        return (
          <button
            key={user.id}
            className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center w-100 mb-1 rounded  ${isActive ? 'bg-dark-subtle text-dark' : 'bg-dark text-white'}`}
            onClick={() => existingChat ? navigate(`/private-chat/${existingChat.id}`) : handleNewChat(user.id)}
          >
            {user.username}
            {existingChat ? (
              <span className={'badge bg-light text-dark'}>
                Abrir Chat
              </span>
            ) : (
              <span className={'badge bg-dark text-white'}>
                Novo Chat
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
