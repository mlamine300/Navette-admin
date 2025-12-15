/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/components/ui/card";
import { createStationAction, getStationByIdAction, updateStationAction } from "@/service/apiStation";

import { useForm } from "react-hook-form";
import { useParams } from "react-router"
import { zodResolver } from "@hookform/resolvers/zod";
import { StationSchema, type Station} from "@/types";
import type z from "zod";
import Input from "@/components/ui/Input";
import { Form, FormField } from "@/components/ui/form";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

function StationDetailsPage() {
   // const[station,setStation]=useState<Station>( {name:"",wilaya:"",address:"",phone:""})
   const[error,setError]=useState(null);
    const params=useParams();
    const stationId=params.id;
  const form=useForm({
        resolver:zodResolver(StationSchema),defaultValues: {name:"",wilaya:"",address:"",phone:""}
    });
   
    useEffect(()=>{
        const getInformation=async()=>{
           
           try {
              if(stationId==="new"){
                form.reset( {name:"",wilaya:"",address:"",phone:""})
            
        }else if(stationId){
         
          const data=await getStationByIdAction(stationId); 
          form.reset(data);
          
          
         
        }
           } catch (error:any) {
            console.log(error);
            
            setError(error);
           }
        }
        getInformation();
    },[stationId,form])
          
     if(error)console.log(error);

    
 
    
   
    
    
   
    
    const addStation=async(station: z.infer<typeof StationSchema>)=>{
        if(!station)return;
        try {
           if(stationId==="new"){
            await createStationAction(station as Station);
        }else if(stationId) {
            await updateStationAction(Number(stationId),station);
        } 
        } catch (error) {
            console.log(error);
            
        }
        
    }
    return (
       <div className="bg-background p-4 w-full h-full">
         <Card className="p-4 max-w-[700px] text-xs">
            <Form {...form}>
                <form  className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-8 " onSubmit={form.handleSubmit(addStation)}>
                <FormField name="name" render={()=>
                <Input  type="text" value={form.watch("name")} placeHolder="Entrer le nom de station" label="Nom de Station :" onChange={(e)=>form.setValue("name",e.target.value)} />
              
                } />

                <FormField name="wilaya" render={({field})=>
                 <Input type="text" placeHolder="Entrer la Wilaya de station" label="Wilaya de Station :" {...field} />
              } />
              <FormField name="address" render={({field})=>
                 <Input type="area" placeHolder="Entrer l'addresse de station" label="Addresse de Station :" {...field} />
              } />
              <FormField name="phone" render={({field})=>
                 <Input type="text" placeHolder="Entrer le N°téléphone de station" label="N°téléphone :" {...field} />
              } />
              <div className="lg:col-span-2 flex items-center justify-center">
                <Button type="submit" className="px-8">
                    {stationId==="new"?"Ajouter":"Modifier"}
                </Button>
              </div>
                </form>
                </Form>
        </Card>
       </div>
    )
}

export default StationDetailsPage
