import { useEffect, useRef, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { Message } from "../types";

export function usePrivateChat(chatId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
    const subscription = supabase
      .channel(`private-chat:${chatId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "private_messages", filter: `chat_id=eq.${chatId}` },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [chatId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("private_messages")
      .select("*")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true });

    if (!error && data) setMessages(data as Message[]);
  };

  const sendMessage = async (content: string, sender = "Você") => {
    const { error } = await supabase.from("private_messages").insert([
      {
        chat_id: chatId,
        content,
        sender,
      },
    ]);

    if (error) {
      console.error("Erro ao enviar mensagem:", error.message);
    }
  };

  const removeMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from("private_messages")
        .delete()
        .eq("id", id);

      if (error) {
        throw new Error(error.message);
      }

      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (error) {
      console.error("Erro ao deletar mensagem:", error);
      alert("Erro ao deletar mensagem. Tente novamente.");
    }
  };

  return { messages, sendMessage, removeMessage, endRef };
}
