/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Agent, AgentSchema, Station } from "@/types";
import supabase from "./supabase";
import type z from "zod";

// export const getAgentsAction:()=>Promise<Agent[]> = async()=> {
//     const { data, error } = await supabase.from("agent").select("id,station, user(name,email,role)");
    
    
//   if (error) {
//     console.log("agent could not be loaded");
    
//     return [];
//   }
//   const users=data.map(d=>{
//     return {id:d.id,station:d.station,
//     name:d.user.at(0)?.name,
//     email:d.user.at(0)?.email,
//     role:d.user.at(0)?.role

//   }
//   })
//   return users as Agent[];
// }

// export const getAgentActionWithFilter:(search:string,station?:string,role?:string)=>Promise<Agent[]> = async(search,station,role)=> {
//     let query = supabase.from("agent").select("id,station (name), user(name,email,role)");//
//     if (search.trim()) {
//         console.log(search)
//       query = query.or(`user.name.cs.{${search}} , user.email.cs.{${search}}`) ;
//     } 
//     if(station?.trim()){
//         console.log(station)
//         query=query.eq("station",station)
//     }
//     if(role?.trim()){
//         console.log(role)
//        query=query.eq("user.role",role) 
//     }
//     const { data, error } = await query;
    
    
//   if (error) {
//     console.log("agent could not be loaded");

//     return [];
//   }
//   const users=data.map(d=>{
//     return {id:d.id,station:d.station,
//     name:d.user.at(0)?.name,
//     email:d.user.at(0)?.email,
//     role:d.user.at(0)?.role

//   }
//   })
//   return users as Agent[];
// }
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

export const updateAgentAction=async(id:number,values:any)=>{
    const { data, error } = await supabase.from("agent").update(values).eq("id",id);
    if (error) {
      throw new Error("agent could not be updated");
    }
    return data;
}
export const createAgentAction:(data:z.infer<typeof AgentSchema>)=>Promise<Agent|null>=async(values)=>{
    const { data, error } = await supabase.from("agent").insert([values]);
    if (error) {
      throw new Error("agent could not be created");
    }   
    return data;
}

export const deleteStationAction=async(id:string)=>{
  // const {count,error}=await supabase.from("itinerary").select('*', { count: 'exact', head: true }).eq("id",id);
  // if(count&&count>0){
  //   throw new Error("Impossible de supprimer la station car elle est utiliser dans un itinéraire")
  // }
    const {  error } = await supabase.from("agent").delete().eq("id",id);
    
    
    if (error) {
      throw new Error("station could not be deleted");
    }   
   
}

export const getStationByIdAction=async(id:string)=>{
  const { data, error } = await supabase.from("agent").select("*").eq("id",id).single();
  if (error) {
    throw new Error("agent could not be loaded");
  }
  return data as Station;
}