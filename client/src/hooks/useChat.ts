import { useEffect, useRef, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { Message } from "../types";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  // Atualiza as mensagens em tempo real
  useEffect(() => {
    fetchMessages();
    const subscription = supabase
      .channel("chat-room")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Carrega as mensagens
  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: true });

    if (!error && data) setMessages(data as Message[]);
  };

  // Envia a mensagem para a tabela de mensagens
  const sendMessage = async (content: string, sender = "Você") => {
    const { error } = await supabase.from("messages").insert([
      {
        content,
        sender,
      },
    ]);
  
    if (error) {
      console.error("Erro ao enviar mensagem:", error.message);
    }
  };

  // Remove a mensagem da tabela mensagens
  async function removeMessage(id: string) {
    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id);
  
      if (error) {
        throw new Error(error.message);
      }
  
      // Depois de apagar do banco, remove do estado local
      setMessages(prev => prev.filter(msg => msg.id !== id));
    } catch (error) {
      console.error('Erro ao deletar mensagem:', error);
      alert('Erro ao deletar mensagem. Tente novamente.');
  };

  };

return { messages, sendMessage, endRef, setMessages, removeMessage };
}