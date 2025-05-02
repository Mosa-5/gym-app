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
    if (
      res?.error &&
      res?.error?.status &&
      (res?.error?.status < 200 || res?.error?.status >= 300)
    ) {
      throw new Error("Auth");
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
  return supabase.auth
    .signInWithPassword({ email: "guest@example.com", password: "guest123" })
    .then((res) => {
      if (
        res?.error &&
        res?.error?.status &&
        (res?.error?.status < 200 || res?.error?.status >= 300)
      ) {
        throw new Error("Auth");
      }
    });
};
