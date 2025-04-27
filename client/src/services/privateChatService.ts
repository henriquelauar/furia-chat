import { supabase } from "../supabase/supabaseClient";
import { generateChatId } from "../hooks/useOpenPrivateChat";

export async function getCurrentUserId() {
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id || null;
}

export const privateChatService = {
  createPrivateChat: async (user2Id: string) => {
    const user1Id = await getCurrentUserId(); // Pegamos o ID do usuário logado.

    if (!user1Id) throw new Error("Usuário não autenticado");

    const roomId = generateChatId(user1Id, user2Id);

    // Verifica se já existe
    const { data: existingChat, error } = await supabase
      .from('private_chats')
      .select('*')
      .eq('id', roomId)
      .single();

    if (error && error.code !== 'PGRST116') { // Código para "registro não encontrado"
      throw new Error(error.message);
    }

    if (!existingChat) {
      const { error: insertError } = await supabase
        .from('private_chats')
        .insert([{ id: roomId, user1_id: user1Id, user2_id: user2Id }]);

      if (insertError) throw new Error(insertError.message);
    }

    return { id: roomId };
  },

  async getPrivateChats() {
    const { data: authData } = await supabase.auth.getUser();
    const loggedUser = authData.user;

    if (!loggedUser) {
      throw new Error("Usuário não autenticado");
    }

    const { data, error } = await supabase
      .from('private_chats')
      .select('*')
      .or(`user1_id.eq.${loggedUser.id},user2_id.eq.${loggedUser.id}`);

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  },
  
  async sendPrivateMessage(chatId: string, content: string) {
    const userId = (await supabase.auth.getUser()).data?.user?.id;

    const { data, error } = await supabase
      .from('private_messages')
      .insert({
        chat_id: chatId,
        sender_id: userId,
        content: content
      });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  async getMessagesFromChat(chatId: string) {
    const { data, error } = await supabase
      .from('private_messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
};
