// src/services/authService.ts
import { supabase } from '../supabase/supabaseClient';

export async function signUp(email: string, password: string, username: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username.trim(),
      }
    }
  });

  if (data.user) {
    const { error: profileError } = await supabase.from('profiles').insert([
      {
        id: data.user.id,
        username: username,
      },
    ]);

    if (profileError) {
      throw profileError;
    }
  }

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  localStorage.removeItem('furia-username')
  if (error) {
    throw new Error(error.message);
  }
}
