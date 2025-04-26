import { useEffect, useRef, useState } from "react";
import { supabase } from "../supabase/supabaseClient";

type Message = {
  id: number;
  content: string;
  sender: string;
  created_at: string;
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

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

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: true });

    if (!error && data) setMessages(data as Message[]);
  };

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

  return { messages, sendMessage, endRef };
}
