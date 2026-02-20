import { supabase } from "../supabase";

export const register = ({
  fullNameEn,
  fullNameKa,
  email,
  password,
}: {
  fullNameEn: string;
  fullNameKa: string;
  email: string;
  password: string;
}): Promise<void> => {
  return supabase.auth
    .signUp({
      email,
      password,
      options: {
        data: {
          fullNameEn,
          fullNameKa,
        },
      },
    })
    .then((res) => {
      if (res.error) {
        throw new Error(`Registration failed: ${res.error.message}`);
      }
    });
};

export const login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return supabase.auth.signInWithPassword({ email, password }).then((res) => {
    if (res?.error) {
      throw new Error(`Sign in failed: ${res.error.message}`);
    }
  });
};

export const logout = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(`Logout failed: ${error.message}`);
  }
};

export const GuestSignIn = async (): Promise<void> => {
  const email = import.meta.env.VITE_GUEST_EMAIL;
  const password = import.meta.env.VITE_GUEST_PASSWORD;

  if (!email || !password) {
    throw new Error("Guest account is not configured.");
  }

  return supabase.auth
    .signInWithPassword({ email, password })
    .then((res) => {
      if (res?.error) {
        throw new Error(`Guest sign in failed: ${res.error.message}`);
      }
    });
};
