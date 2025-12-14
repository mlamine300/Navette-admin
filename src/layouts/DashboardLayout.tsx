/* eslint-disable @typescript-eslint/no-explicit-any */

import { ThemeProvider } from "next-themes";
import SideBar from "../components/main/SideBar";
import UserProvider from "@/context/user/userProvider";

const DashboardLayout = ({ children }: { children: any }) => {
  return (
    <ThemeProvider>
<UserProvider>

    <section className=" h-full min-h-svh flex flex-row ">
      <SideBar />

      <main className=" my-16 w-full px-5   flex  h-full">{children}</main>
    </section>
</UserProvider>
    </ThemeProvider>
  );
};

export default DashboardLayout;
