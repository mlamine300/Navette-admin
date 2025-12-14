import  { type ReactElement } from "react";
import UserProvider from "../context/user/userProvider";

const Layout = ({ children }: { children: ReactElement }) => {
  return (
   
      <UserProvider>{children}</UserProvider>
   
  );
};

export default Layout;
