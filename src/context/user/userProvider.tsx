import React, { useState } from "react";

import { userContext } from "./userContext";
import { tokenService } from "../../utils/tokenService";
import type { Session } from "@supabase/supabase-js";

const UserProvider = ({ children }: { children: React.ReactElement }) => {
  const [user, setUser] = useState<Session&{name:string} | null>(null);
  const [loading, setLoading] = useState(false);



  const updateUser = (userData: Session&{name:string}) => {
    setUser(userData);
    if (userData.access_token) {
       localStorage.setItem("role", userData.user.role||"standard");
      tokenService.setToken(userData.access_token);

    }
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <userContext.Provider value={{ user, loading,setLoading, updateUser, clearUser }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
