import type { Route} from "@/types";
import supabase from "./supabase";

export async function addItinerary(route:Route) {
  
if(!route.name || typeof route.name !== 'string') {
    
throw new Error('Invalid name');
  }
  
if(!Array.isArray(route.steps)) {
    
throw new Error('list must be an array');
  }
  

  
const{ data, error } = await supabase.from('itinerary').insert([route]).select().single();
  
if(error) {   
throw error;
  }
  
return data;
}

export const EditItinirary=async(id:string,route:Route)=>{
    if(!route.name || typeof route.name !== 'string') {
    
throw new Error('Invalid name');
  }
  
if(!Array.isArray(route.steps)) {
    
throw new Error('list must be an array');
  }
  

  
const{ data, error } = await supabase.from('itinerary').update([route]).eq("id",id).select().single();
  
if(error) {   
throw error;
  }
  
return data;
}

export const getItiniraryById=async(id:string)=>{
    if(id==="new")return null;
    const {data,error}=await supabase.from("itinerary").select("*").eq("id",id).single();
    if(error)throw error;
    return data;
}

export const getRoutes=async()=>{
    const {data:routes,error}=await supabase.from("itinerary").select("*");
    if(error)throw error;
    return routes;
}