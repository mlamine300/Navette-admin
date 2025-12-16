/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Agent, Station } from "@/types";
import supabase from "./supabase";

export const getAgentsAction:()=>Promise<Agent[]> = async()=> {
    const { data, error } = await supabase.from("agent").select("id,station, user(name,email,role)");
    
    
  if (error) {
    console.log("agent could not be loaded");
    
    return [];
  }
  const users=data.map(d=>{
    return {id:d.id,station:d.station,
    name:d.user.at(0)?.name,
    email:d.user.at(0)?.email,
    role:d.user.at(0)?.role

  }
  })
  return users as Agent[];
}

export const getAgentActionWithFilter:(search:string,station?:string,role?:string)=>Promise<Agent[]> = async(search,station,role)=> {
    let query = supabase.from("agent").select("id,station, user(name,email,role)");
    if (search) {
     
      query = query.or(`user.name.cs.{${search}} , user.email.cs.{${search}}`) ;
    } 
    if(station){
        query=query.eq("station",station)
    }
    if(role){
       query=query.eq("user.role",role) 
    }
    const { data, error } = await query;
    
    
  if (error) {
    console.log("agent could not be loaded");

    return [];
  }
  const users=data.map(d=>{
    return {id:d.id,station:d.station,
    name:d.user.at(0)?.name,
    email:d.user.at(0)?.email,
    role:d.user.at(0)?.role

  }
  })
  return users as Agent[];
}

export const updateAgentAction=async(id:number,values:any)=>{
    const { data, error } = await supabase.from("agent").update(values).eq("id",id);
    if (error) {
      throw new Error("agent could not be updated");
    }
    return data;
}
export const createAgentAction:(data:Agent)=>Promise<Agent|null>=async(values:Agent)=>{
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