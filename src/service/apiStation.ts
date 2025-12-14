import type { Station } from "@/types";
import supabase from "./supabase";

export const getStations:()=>Promise<Station[]> = async()=> {
    const { data, error } = await supabase.from("station").select("*");
    console.log(data);
    
  if (error) {
    console.log("station could not be loaded");
    
    return [];
  }
  return data as Station[];
}

export const updateStation=async(id:number,values:{name:string,wilaya:string})=>{
    const { data, error } = await supabase.from("station").update(values).eq("id",id);
    if (error) {
      throw new Error("station could not be updated");
    }
    return data;
}
export const createStation=async(values:{name:string,wilaya:string})=>{
    const { data, error } = await supabase.from("station").insert([values]);
    if (error) {
      throw new Error("station could not be created");
    }   
    return data;
}

export const deleteStation=async(id:number)=>{
    const { data, error } = await supabase.from("station").delete().eq("id",id);
    if (error) {
      throw new Error("station could not be deleted");
    }   
    return data;
}