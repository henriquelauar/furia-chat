import { useEffect, useState } from "react";

export function useUsername() {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem("furia-username");
    if (stored) {
      setUsername(stored);
    } else {
      const name = prompt("Escolha um nome para participar do chat:")?.trim();
      if (name) {
        localStorage.setItem("furia-username", name);
        setUsername(name);
      } else {
        const fallback = `Fã#${Math.floor(Math.random() * 10000)}`;
        localStorage.setItem("furia-username", fallback);
        setUsername(fallback);
      }
    }
  }, []);

  return username;
}
