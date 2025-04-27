/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import { privateChatService } from "../services/privateChatService";
import { useNavigate } from "react-router";
import { supabase } from "../supabase/supabaseClient";
import { Profile } from "../types/index"

export const NewPrivateChatButton: FC = () => {
  const [users, setUsers] = useState<Profile[]>([]);
  const [showList, setShowList] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
  
    const { data, error } = await supabase
      .from('profiles')
      .select('id, username');
  
    if (error) {
      console.error(error);
      return;
    }
  
    // Filtra para remover o usuário atual
    const filteredUsers = (data || []).filter(u => u.id !== user.id);
  
    setUsers(filteredUsers);
  };

  const handleNewChat = async (user2Id: string) => {
    try {
      const chat = await privateChatService.createPrivateChat(user2Id);
      navigate(`private-chat/${chat.id}`);
    } catch (err: any) {
      alert("Erro ao criar chat privado: " + err.message);
    }
  };

  const toggleUserList = async () => {
    if (!showList) {
      await fetchUsers();
    }
    setShowList(!showList);
  };

  return (
    <div className="mb-3">
      <button
        className="btn btn-dark w-100 mb-2"
        onClick={toggleUserList}
      >
        Nova Conversa
      </button>

      {showList && (
        <div className="list-group">
          {users.map((user) => (
            <button
              key={user.id}
              className="list-group-item list-group-item-action"
              onClick={() => handleNewChat(user.id)}
            >
              {user.username}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
