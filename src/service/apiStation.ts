import type { Station } from "@/types";
import supabase from "./supabase";

export const getStationsAction:()=>Promise<Station[]> = async()=> {
    const { data, error } = await supabase.from("station").select("*");
    
    
  if (error) {
    console.log("station could not be loaded");
    
    return [];
  }
  return data as Station[];
}

export const getStationActionWithFilter:(search:string)=>Promise<Station[]> = async(search:string)=> {
    let query = supabase.from("station").select("*");
    if (search) {
     
      query = query.or(`name.cs.{${search}} , wilaya.cs.{${search}} , adresse.cs.{${search}}, phone.cs.{${search}}`) ;
    } 
    const { data, error } = await query;
    
    
  if (error) {
    console.log("station could not be loaded");

    return [];
  }
  return data as Station[];
}

export const updateStationAction=async(id:number,values:Station)=>{
    const { data, error } = await supabase.from("station").update(values).eq("id",id);
    if (error) {
      throw new Error("station could not be updated");
    }
    return data;
}
export const createStationAction:(data:Station)=>Promise<Station|null>=async(values:Station)=>{
    const { data, error } = await supabase.from("station").insert([values]);
    if (error) {
      throw new Error("station could not be created");
    }   
    return data;
}

export const deleteStationAction=async(id:string)=>{
  // const {count,error}=await supabase.from("itinerary").select('*', { count: 'exact', head: true }).eq("id",id);
  // if(count&&count>0){
  //   throw new Error("Impossible de supprimer la station car elle est utiliser dans un itinéraire")
  // }
    const {  error } = await supabase.from("station").delete().eq("id",id);
    
    
    if (error) {
      throw new Error("station could not be deleted");
    }   
   
}

export const getStationByIdAction=async(id:string)=>{
  const { data, error } = await supabase.from("station").select("*").eq("id",id).single();
  if (error) {
    throw new Error("station could not be loaded");
  }
  return data as Station;
}