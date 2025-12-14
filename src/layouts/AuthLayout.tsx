import { ThemeProvider } from "next-themes";
import type { ReactElement } from "react";


const AuthLayout = ({ children }: { children: ReactElement }) => {
  
  const name=import.meta.env.VITE_APP_NAME ||"Navette Admin"; 
  return (
      <ThemeProvider>

    <div className="flex items-center justify-center  h-full w-full ">
      <div className="xl:min-w-6/12  xl:min-h-9/12 flex flex-col p-10 bg-background-base rounded-2xl shadow-lg items-center">
        <h4 className="text-5xl my-8 italic text-amber-300">{name}</h4>
        {children}
      </div>
     
    </div>
          </ThemeProvider>
  );
};

export default AuthLayout;
