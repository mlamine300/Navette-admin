/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Agent, AgentSchema } from "@/types";
import supabase, { supabaseAdmin } from "./supabase";
import type z from "zod";
import toast from "react-hot-toast";


const PAGE=1;
const MAX_PER_PAGE=10
export const getAgentsAction = async (): Promise<Agent[]> => {

  const query = supabase
    .from("agent")
    .select(`
      id,
      created_at,
      station ( name ),
      user( name, email, role ),
      activeStatus
    `);

  

  

 

  const { data, error } = await query;

  if (error || !data) {
    console.error("Agents could not be loaded", error);
    return [];
  }

  return data.map((d: any) => ({
    id: d.id,
    station: d.station,
    name: d.user?.[0]?.name,
    email: d.user?.[0]?.email,
    role: d.user?.[0]?.role,
    activeStatus:d.activeStatus,
    createdAt:d.created_at
  })) as Agent[];
};

export const getAgentActionWithFilter = async (
  {search,
  station,
  role,
  page,
  maxPerPage}:{search: string,
  station?: string,
  role?: string,
  page?:number,
  maxPerPage?:number}
): Promise<Agent[]> => {
    const Page=page||PAGE;
    const MaxPerPage=maxPerPage||MAX_PER_PAGE;
    const start=(Page-1)*MaxPerPage;
    const end=start+MaxPerPage;

  let query = supabase
    .from("agent")
    .select(`
      id,
      created_at,
      station ( name ),
      user( name, email, role ),
      activeStatus
    `).order("created_at",{ascending:false}).range(start,end);

  // 🔎 Search filter
  if (search?.trim()) {
    const s = `%${search.trim()}%`;
    query = query.or(
      `user.name.ilike.${s},user.email.ilike.${s}`
    );
  }

  // 🏢 Station filter (FK column)
  if (station) {
    query = query.eq("station", station);
  }

  // 👤 Role filter (related table)
  if (role?.trim()) {
    query = query.eq("user.role", role);
  }

  const { data, error } = await query;

  if (error || !data) {
    console.error("Agents could not be loaded", error);
    return [];
  }

  return data.map((d: any) => ({
    id: d.id,
    station: d.station,
    name: d.user.name,
    email: d.user.email,
    role: d.user.role,
    activeStatus:d.activeStatus,
    createdAt:d.created_at
  })) as Agent[];
};

export const updateAgentAction=async(id:string,values:any)=>{
    const keys=Object.keys(values);
    let finalValues:any={};
    keys.forEach(k=>{
      if(values[k]&&k!=="station"&&k!=="password"&&k!=="rePassword")finalValues[k]=values[k];
    })
    console.log(finalValues)
    const station=values.station;
    const {data:existingAgent,error}=await supabase.from("agent").select("*").eq("id",id).single();
    if(error)throw error;
    if(!existingAgent)throw new Error("there is no such id");
    if(station&&station!==existingAgent.station){
     console.log("updating station")
      await supabase.from("agent").update({station}).eq("id",id);
    }
    if(finalValues.name||finalValues.email||finalValues.role){
      const existingUser=await supabase.from("user").select("*").eq("id",existingAgent.user);
      if(!existingUser)throw new Error("there is no user with such id",existingAgent.user);
      if(finalValues.email){
const {data:foundUser}=await supabase.from("user").select("*").eq("email",finalValues.email);
if(foundUser&&Array.isArray(foundUser)&&(foundUser?.length>1||foundUser?.at(0).id!==existingAgent.user)){
  toast.error("ce email est déjautilisé  "+foundUser?.length)
  throw new Error("duplicate email")

}
      }
      
     
     const{error}= await supabase.from("user").update(finalValues).eq("id",existingAgent.user);

     if(values.password){
      const {data:foundUser}=await supabase.from("user").select("*").eq("email",finalValues.email).single();
      const { data: { users }, error:authError } = await supabaseAdmin.auth.admin.listUsers();
      console.log(users)
      if(authError)throw authError;
      const userId=users.filter(u=>u.email===foundUser.email).at(0)?.id;
      if(userId){
        
      const {  error:authError2 } = await supabaseAdmin.auth.admin.updateUserById(
        userId, // The user's UUID
      { password: values.password }      
);

console.log("auth updated")  
if(authError2)throw authError2;
      }
     }

     if(error)throw error;

    }
   
    toast.success(`l'agent :${existingAgent.id} a été modifier `)
    
}
export const createAgentAction:({name,email,password,rePassword,role,station}:z.infer<typeof AgentSchema>)=>Promise<any>=async({name,email,password,rePassword,role,station})=>{
    try {
      if(password!=rePassword){
        console.log("two password does not match")
        return;
      }
      if(!email||!password)return;

      const {data:users,error:userError}=await supabase.from("user").insert({name,email,role}).select();
      
      if(userError||!Array.isArray(users)||!users.length||!users.at(0)||!users.at(0).id){
       toast.error("erreur de créationde l'utilisateur"+userError)
        return null;
      }
     
      const {data:agents,error:agentError}=await supabase.from("agent").insert({user:users.at(0).id,station}).select();
      if(agentError||!agents||!Array.isArray(agents)||!agents.length){
       toast.error("erreur de créationde l'agent"+agentError)
      return null;
      }

        const { error:SUerror } = await supabase.auth.signUp({
      email,
      password,
    });
      if(SUerror){
        toast.error(SUerror+"")
        return null;
      }
      
      
    const agent=agents.at(0);
      if(agent){
        toast.success("Utilisateur créer avec succés!")
        return agent;
      }
      
    } catch (error) {
      console.log(error)
      toast.error("Impossible de créer l'utilisateur")
      return null;
    }
    
    
}

export const deleteAgentAction=async(id:string)=>{
  // const {count,error}=await supabase.from("itinerary").select('*', { count: 'exact', head: true }).eq("id",id);
  // if(count&&count>0){
  //   throw new Error("Impossible de supprimer la station car elle est utiliser dans un itinéraire")
  // }
    const {  error } = await supabase.from("agent").delete().eq("id",id);
    
    
    if (error) {
      throw new Error("station could not be deleted");
    }   
   
}

export const getAgentByIdAction=async(id:string)=>{
  const { data, error } = await supabase.from("agent").select("user(name,email,role), station").eq("id",id).single() as {data:any,error:any};
  if (error) {
    throw new Error("agent could not be loaded");
  }
  console.log(data);
  return {station:data.station,name:data.user.name,email:data.user.email,role:data.user.role};
}