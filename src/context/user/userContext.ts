import { createContext, useContext } from "react";
import type { Session } from "@supabase/supabase-js";

export interface UserContext {
  user: Session&{name:string} | null;
  loading: boolean;
  setLoading:(b:boolean)=>void;
  updateUser: (u: Session&{name:string}) => void;
  clearUser: () => void;
}

const initialState: UserContext = {
  user: null,
  loading: false,
  setLoading: () => {},
  updateUser: () => {},
  clearUser: () => {},
};

export const userContext = createContext<UserContext>(initialState);

export const useUserContext = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
