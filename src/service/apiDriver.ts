/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Driver, DriverTypeSchema } from "@/types";
import supabase, { supabaseAdmin } from "./supabase";
import toast from "react-hot-toast";
const PAGE=1;
const MAX_PER_PAGE=10;
export const getDriversAction = async (): Promise<Driver[]> => {

  const query = supabase
    .from("driver")
    .select(`
      id,
      created_at,
      itinerary ( name ),
      user( name, email, role ),
      activeStatus
    `);

  

  

 

  const { data, error } = await query;

  if (error || !data) {
    console.error("druvers could not be loaded", error);
    return [];
  }

  return data.map(d=>{
    return {id:d.id,activeStatus:d.activeStatus,itinerary:d.itinerary.at(0)?.name,name:d.user.at(0)?.name,email:d.user.at(0)?.email}
  });
};

export const getDriverActionWithFilter = async (
  {search,
  itinerary,
  page,
  maxPerPage}:{search: string,
  itinerary?: string,
  
  page?:number,
  maxPerPage?:number}
): Promise<Driver[]> => {
    const Page=page||PAGE;
    const MaxPerPage=maxPerPage||MAX_PER_PAGE;
    const start=(Page-1)*MaxPerPage;
    const end=start+MaxPerPage;

  let query = supabase
    .from("driver")
    .select(`
      id,
      created_at,
      itinerary ( name ),
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
  if (itinerary) {
    query = query.eq("itinerary", itinerary);
  }

  

  const { data, error } = await query;

  if (error || !data) {
    console.error("Agents could not be loaded", error);
    return [];
  }

  return data.map((d: any) => ({
    id: d.id,
    itinerary: d.itinerary.name,
    name: d.user.name,
    email: d.user.email,
    activeStatus:d.activeStatus,
    createdAt:d.created_at
  })) as Driver[];
};

export const getDriverByIdAction=async(id:string)=>{
  const { data, error } = await supabase.from("driver").select("user(name,email,role), itinerary(id,name)").eq("id",id).single() as {data:any,error:any};
  if (error) {
    throw new Error("agent could not be loaded");
  }
  console.log(data);
  return {station:data.station,name:data.user.name,email:data.user.email,role:data.user.role};
}

export const createDriverAction=async(driver:DriverTypeSchema)=>{
try {
     if(!driver.password||driver.password!==driver.rePassword){
    throw new Error("passwords not matching");
  }
     const {data:itineraries}=await supabase.from("itinerary").select("*").eq("id",driver.itinerary);
  if(!itineraries||!Array.isArray(itineraries)||itineraries.length<1) {
throw new Error("route incorrect")
  }
  const itinerary=itineraries.at(0);
    const {data:existingUser,error:xuserError}=await supabase.from("user").select("*").eq("email",driver.email);
    if(existingUser&&Array.isArray(existingUser)&&existingUser.length>0&&existingUser.at(0).email){
        throw new Error("this email is used")
    }
    if(xuserError){
     console.log("--------------0",xuserError)
        throw xuserError;
    }

    const {data:users,error:userError}=await supabase.from("user").insert({name:driver.name,email:driver.email,role:driver.role,activeStatus:true}).select("*");
  if(userError)throw userError;
  if(!users||!Array.isArray(users)||users.length<1)throw new Error("impossible de créer l'utilisateur");
const user=users.at(0);
    const { error:SUerror } = await supabase.auth.signUp({
       email:driver.email,
       password:driver.password,
     });
if(SUerror){
    await supabase.from("user").delete().eq("id",user.id);
    throw new Error("impossible de créer l'utilisateur");
}


    const {data:newDriver,error:driverError}=await supabase.from("driver").insert({user:user.id,itinerary:itinerary.id}).select("id,user(name,email,role), itinerary(id,name)").single();
    if(driverError){
        console.log("error while creating new driver",driverError)
        throw driverError;
    }
    return newDriver ;

} catch (error) {
    console.log(error)
    throw error;
}
}
export const updateDriverAction=async(id:string,values:any)=>{
try {
     const keys=Object.keys(values);
    const finalValues:any={};
    keys.forEach(k=>{
      if(values[k]&&k!=="itinerary"&&k!=="password"&&k!=="rePassword")finalValues[k]=values[k];
    })
    const itinerary=values.itinerary;
const {data:existingDriver,error:driverError}=await supabase.from("driver").select("*").eq("id",id).single();
if(!existingDriver)throw new Error("there is no such driver");
     if(driverError)throw driverError;

    if(itinerary&&itinerary!==existingDriver.itinerary){
     console.log("updating itinerary")
      await supabase.from("agent").update({itinerary}).eq("id",id);
    }
if(finalValues.name||finalValues.email||finalValues.role){
      const existingUser=await supabase.from("user").select("*").eq("id",existingDriver.user);
      if(!existingUser)throw new Error("there is no user with such id",existingDriver.user);
      if(finalValues.email){
const {data:foundUser}=await supabase.from("user").select("*").eq("email",finalValues.email);
if(foundUser&&Array.isArray(foundUser)&&(foundUser?.length>1||foundUser?.at(0).id!==existingDriver.user)){
  toast.error("ce email est déja utilisé  "+foundUser?.length)
  throw new Error("duplicate email")
}     }
const{error:UserUpdateError}= await supabase.from("user").update(finalValues).eq("id",existingDriver.user);
if(UserUpdateError)throw UserUpdateError;

     if(values.password){
      const {data:foundUser}=await supabase.from("user").select("*").eq("email",finalValues.email).single();
      const { data: { users }, error:authError } = await supabaseAdmin.auth.admin.listUsers();
     // console.log(users)
      if(authError)throw authError;
      const userId=users.filter(u=>u.email===foundUser.email).at(0)?.id;
      if(userId){
        
      const {  error:authError2 } = await supabaseAdmin.auth.admin.updateUserById(
        userId, // The user's UUID
      { password: values.password }      
);
 if(authError2)throw authError2;
       }
      }


     }
   
     toast.success(`l'agent :${existingDriver.id} a été modifier `)


} catch (error) {
    console.log(error)
}
}
