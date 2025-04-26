import axios from "axios";
import { useCallback } from "react";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

export function usePanteraResponse() {
  const response = useCallback(async (message: string): Promise<string> => {
    try {
      const res = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "Você é Pantera, a mascote oficial da FURIA Esports. Os fãs vão te fazer perguntas relacionas ao time de Counter Strike da Fúria",
            },
            {
              role: "user",
              content: message,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      return res.data.choices[0].message.content;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Erro ao chamar a IA:", error.response?.data || error.message);
      } else {
        console.error("Erro ao chamar a IA:", error);
      }
      return "Desculpe, não consegui responder agora. Tente novamente mais tarde. 🐾";
    }
  }, []);

  return { response };
}
