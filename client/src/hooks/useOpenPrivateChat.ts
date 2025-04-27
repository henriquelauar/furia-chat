import { useNavigate } from 'react-router-dom';

// Gera o id do chat privado a partir do id do usuario
export function generateChatId(user1: string, user2: string): string {
    const users = [user1, user2].sort(); // ordena alfabeticamente
    return `${users[0]}-${users[1]}`;
  }  

// Entra no caminho do chat privado
export function useOpenPrivateChat() {
  const navigate = useNavigate();

  function openPrivateChat(currentUsername: string, targetUsername: string) {
    const chatId = generateChatId(currentUsername, targetUsername);
    navigate(`private-chat/${chatId}`);
  }

  return { openPrivateChat };
}