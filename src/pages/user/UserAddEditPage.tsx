/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import Input from "@/components/ui/Input";
import SelectWithSearch from "@/components/ui/SelectWithSearch";
import { createAgentAction } from "@/service/apiAgent";
import { getStationsAction } from "@/service/apiStation";
import { AgentSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
//import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import type z from "zod";

function UserAddEditPage() {
     //const[error,setError]=useState(null);
    const params=useParams();
    const agentId=params.id;
    const {data:stations}=useQuery({
        queryKey:["stations"],
        queryFn:getStationsAction,

    })
  const form=useForm({
        resolver:zodResolver(AgentSchema),defaultValues: {name:"",station:"",email:"",role:"agent",password:"",rePassword:"",activeStatus:true}
    });
    const handleSubmit=async(data:z.infer<typeof AgentSchema>)=>{
        //console.log(data)
        // ;
        const stationId=stations?.filter(s=>s.name===data.station).at(0)?.id||"--";
        const res=await createAgentAction({...data,station:stationId})
        console.log(res);
    }
    return (
         <Card className='flex item-center bg-background-base border-none shadow-2xl w-full p-5 min-h-screen max-h-screen justify-start overflow-y-auto'>
          <h3>{agentId==="new"?"Ajouter un utilisateur":"Modifier un utilisateur"}</h3>
          <Form  {...form}>
            <form  className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-8 max-w-[900px]" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField name="name" render={()=>
                <Input  type="text" value={form.watch("name")} placeHolder="Entrer le nom de l'agent" label="Nom d'agent :" onChange={(e)=>form.setValue("name",e.target.value)} />
              
                } />
                 <FormField name="email" render={()=>
                <Input  type="text" value={form.watch("email")} placeHolder="Entrer l'email de l'agent" label="Email :" onChange={(e)=>form.setValue("email",e.target.value)} />
              
                } />
                 <FormField name="station" render={()=>
                // <Input  type="text" value={form.watch("station")} placeHolder="Entrer la station de l'agent" label="Station :" onChange={(e)=>form.setValue("station",e.target.value)} />
                <SelectWithSearch label="Station" name="station" value={form.watch("station")} onValueChange={(station)=>form.setValue("station",station)} possibleValues={stations?.map(s=>s.name)} />  
                } 
                />
                 <FormField name="role" render={()=>
                // <Input  type="text" value={form.watch("role")} placeHolder="Entrer la role de l'agent" label="role :" onChange={(e)=>form.setValue("role",e.target.value)} />
                <SelectWithSearch label="role" name="role" value={form.watch("role")||""} onValueChange={(role:any)=>form.setValue("role",role)} possibleValues={["agent","admin","driver"]} />  
                } 
                />
                <FormField name="password" render={()=>
                <Input  type="password" value={form.watch("password")} placeHolder="Entrer le mot de passe" label="Mot de passe :" onChange={(e)=>form.setValue("password",e.target.value)} />
              
                } />
                <FormField name="rePassword" render={()=>
                <Input  type="password" value={form.watch("rePassword")} placeHolder="Re-Entrer le mot de passe" label="Confirme Mot de passe :" onChange={(e)=>form.setValue("rePassword",e.target.value)} />
              
                } />
                <Button className="lg:col-span-2 mx-auto">
                    {agentId==="new"?"Ajouter un utilisateur":"Modifier l'utilisateur"}
                </Button>
            </form>
          </Form>
            </Card>
          
            
        
    )
}

export default UserAddEditPage
