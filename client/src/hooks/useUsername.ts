import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';

export function useUsername() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsername = async () => {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles') 
        .select('username')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Erro buscando username:', error.message);
        return;
      }

      if (data) {
        setUsername(data.username);
      }
    };

    fetchUsername();
  }, []);

  return username;
}
