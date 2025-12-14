/* eslint-disable @typescript-eslint/no-explicit-any */


import SideBar from "../components/main/SideBar";
import UserProvider from "@/context/user/userProvider";

const DashboardLayout = ({ children }: { children: any }) => {
  return (
    
<UserProvider>

    <section className=" h-full min-h-svh flex flex-row ">
      <SideBar />

      <main className=" my-16 w-full px-5 bg-background  flex  h-full mt-20">{children}</main>
    </section>
</UserProvider>
    
  );
};

export default DashboardLayout;
