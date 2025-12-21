/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import Input from "@/components/ui/Input";
import SelectWithSearch from "@/components/ui/SelectWithSearch";
import { createAgentAction, getAgentByIdAction, updateAgentAction } from "@/service/apiAgent";
import { getStationsAction } from "@/service/apiStation";
import { AgentSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
//import { useState } from "react";
import {FieldError} from "@/components/ui/field"
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import type z from "zod";
import Spinner from "@/components/main/Spinner";

function UserAddEditPage() {
     //const[error,setError]=useState(null);
    const params=useParams();
    const agentId=params.id;
    const [pending, setPending] = useState(false);
    const {data:stations,isFetching:isStationFetching}=useQuery({
        queryKey:["stations"],
        queryFn:getStationsAction,

    })
    const {data:agent,isFetching}=useQuery({
      queryKey:["agent",agentId],
      queryFn:()=>
        {
        if(agentId&&agentId!=="new"){
         return  getAgentByIdAction(agentId) as any
        }
        
        return {name:"-----",station:"",email:"",role:"",activeStatus:true}
      }
    })
     const form=useForm({
        resolver:zodResolver(AgentSchema),defaultValues: {name:"",station:"",email:"",role:"driver",activeStatus:true}
    });
    useEffect(()=>{
      if(agent&&stations&&Array.isArray(stations)&&stations){
         const stationName=stations?.filter(s=>s.id===agent.station).at(0)?.name||"--";
         //alert(stations.length)
        form.reset({...agent,station:stationName})
      }
      
     
    },[agent,form,stations])
 
    const handleSubmit=async(data:z.infer<typeof AgentSchema>)=>{
      
      try {
        setPending(true);
      if(agentId==="new"){
   
        const stationId=stations?.filter(s=>s.name===data.station).at(0)?.id||"--";
       await createAgentAction({...data,station:stationId})
       }
       
       else if(agentId&&agentId!=="new"){
        const stationId=stations?.filter(s=>s.name===data.station).at(0)?.id||"--";
        await updateAgentAction(agentId,{...data,station:stationId});
       }
      form.reset({})
      } catch (error) {
        console.log(error)
      }finally{
 setPending(false);
      }
       
       
    }
    return (
         <Card className='flex item-center bg-background-base border-none shadow-2xl w-full p-5 min-h-screen max-h-screen justify-start overflow-y-auto'>
          <h3>{agentId==="new"?"Ajouter un utilisateur":"Modifier un utilisateur"}</h3>
          <Form  {...form}>
            <form  className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-8 max-w-[900px]" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField name="name" render={()=>
                <Input  type="text" value={form.watch("name")} placeHolder="Entrer le nom de l'agent" label="Nom d'agent :" onChange={(e)=>form.setValue("name",e.target.value)} />
              
                } />
                 <FormField name="email" render={(x)=>
                 <>
                <Input  type="text" value={form.watch("email")} placeHolder="Entrer l'email de l'agent" label="Email :" onChange={(e)=>form.setValue("email",e.target.value)} />
                <FieldError errors={x.fieldState.error as any}/>
                 </>
                } />
                 <FormField name="station" render={()=>
                // <Input  type="text" value={form.watch("station")} placeHolder="Entrer la station de l'agent" label="Station :" onChange={(e)=>form.setValue("station",e.target.value)} />
             {

               return (stations&&stations?.length)? (<SelectWithSearch label="Station" name="station" value={form.watch("station")} onValueChange={(station)=>form.setValue("station",station)} possibleValues={stations?.map(s=>s.name)} />):<Spinner/>
              }
              
             
            } 
                
                />
                 <FormField name="role" render={(x)=>
                // <Input  type="text" value={form.watch("role")} placeHolder="Entrer la role de l'agent" label="role :" onChange={(e)=>form.setValue("role",e.target.value)} />
                <>
                <SelectWithSearch label="role" name="role" value={form.watch("role")||"agent"} onValueChange={(role:any)=>form.setValue("role",role)} possibleValues={["agent","admin","driver"]} />  
                <FieldError errors={x.fieldState.error as any}/>
            
                </>
                } 
                />
                <FormField name="password" render={(x)=>
                <>
                <Input  type="password" value={form.watch("password")||""} placeHolder="Entrer le mot de passe" label="Mot de passe :" onChange={(e)=>form.setValue("password",e.target.value)} />
                    <FieldError errors={x.fieldState.error as any}/>
                </> 
                } />
                <FormField name="rePassword" render={(x)=>
              <>
              <Input  type="password" value={form.watch("rePassword")||""} placeHolder="Re-Entrer le mot de passe" label="Confirme Mot de passe :" onChange={(e)=>form.setValue("rePassword",e.target.value)} />
               <FieldError errors={x.fieldState.error as any}/>
                
              </>
              
                } />
                <Button disabled={isFetching||pending||isStationFetching} className="lg:col-span-2 mx-auto disabled:bg-gray-hot">
                    {agentId==="new"?"Ajouter un utilisateur":"Modifier l'utilisateur"}
                </Button>
            </form>
          </Form>
            </Card>
          
            
        
    )
}

export default UserAddEditPage
