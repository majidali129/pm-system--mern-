import { supabase } from "@/lib/supabse";

export type Role = "project-manager" | "admin" | "user";

export type SignInType = {
  email: string;
  password: string;
};

export const signUpUser = async (
  email: string,
  password: string,
  userName: string,
  role: Role
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        userName,
        role,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const signInUser = async (credentials: SignInType) => {
  const { data, error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session) return null;
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data.user;
};
export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error?.message);
};
