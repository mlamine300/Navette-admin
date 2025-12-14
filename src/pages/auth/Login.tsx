/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
 import Button from "../../components/ui/Button";


// import { validateEmail, validatePassword } from "@/utils/helper";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATH } from "../../data/apiPaths";
// import { useUserContext } from "../../context/user/userContext";
// import { AxiosError } from "axios";


// import { tokenService } from "@/utils/tokenService";
import Input from "@/components/ui/Input";
import { validateEmail, validatePassword } from "@/utils/helper";
import { supabaseLogin } from "@/service/apiLogin";
import toast from "react-hot-toast";
import { useUserContext } from "@/context/user/userContext";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate=useNavigate();
  

  const [email, setEmail] = useState<string>("test@gmail.com");
  const [password, setPassword] = useState<string>("test@gmail.com");
  const [error, setError] = useState<any>({});
   const [pending, setpending] = useState(false);
   const {updateUser}=useUserContext();
  // const { updateUser, user } = useUserContext();
 
  
  // const navigate = useNavigate();
  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError((err: any) => {
        return { ...err, email: "Please enter a valid email address." };
      });
      return;
    }
    if (!validatePassword(password)) {
      setError((err: any) => {
        return { ...err, password: "Please enter a valid password." };
      });
      return;
    }

    setpending(true);
    try {
      const {user,session}=await supabaseLogin({email,password})
      if(user){
        updateUser({...session,name:user.email!}!);
        
        toast.success(`Bonjour Mr ${user.email}`)
        navigate("/");

      }
      
    } catch (error: any) {
    
        console.log(error);
        setError((er:any)=>{
          return {...er,login:"Invalid email or password."}
        });

      //console.log(error);
    }
    setpending(false);
    // setError({});
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-3 justify-center items-center">
        <h3>Welcome Back</h3>
        <p className="text-secondary">Please enter your details to log in</p>
        <form className="flex flex-col gap-5 lg:max-w-[500px]">
          <Input
            parentClassName="gap-px"
            labelClassName="italic text-sm text-text-primary/50"
            inputClassName="w-full min-w-82 xl:min-w-96"
            key="email"
            placeHolder="name@xmail.com"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError((err: any) => {
                return { ...err, email: "" };
              });
            }}
            error={error?.email || ""}
          />
          <Input
            parentClassName="gap-px"
            labelClassName="italic text-sm text-text-primary/50"
            inputClassName="w-full min-w-82 xl:min-w-96"
            key="password"
            placeHolder="Min 8 Characters"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError((err: any) => {
                return { ...err, password: "" };
              });
            }}
            error={error?.password || ""}
          />

          <Button
            disabled={pending}
            
            
            onClick={handleLogin}
          >
            LOGIN
          </Button>
        
          {error?.login? (
            <p className="text-sm text-red-500 w-full justify-center">{error.login}</p>
          ):""}
        </form>
      
      </div>
    </AuthLayout>
  );
};

export default Login;