/* eslint-disable @typescript-eslint/no-explicit-any */
import Spinner from "@/components/main/Spinner"
import Button from "@/components/ui/Button"
import { Card } from "@/components/ui/card"
import { FieldError } from "@/components/ui/field"
import { Form, FormField } from "@/components/ui/form"
import Input from "@/components/ui/Input"
import SelectWithSearch from "@/components/ui/SelectWithSearch"
import { createDriverAction, getDriverByIdAction, updateDriverAction } from "@/service/apiDriver"
import { getRoutes } from "@/service/apiRoutes"
import { DriverSchema } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router"
import type z from "zod"

function DriverAddEdit() {
    const params=useParams();
    const DriverId=params.id||"new";
     const [pending, setPending] = useState(false);
        const {data:routes,isFetching:isRoutesFetching}=useQuery({
            queryKey:["routes"],
            queryFn:getRoutes,
    
        })
        const {data:driver,isFetching:isDriverFetching}=useQuery({
              queryKey:["driver",DriverId],
              queryFn:()=>
                {
                if(DriverId&&DriverId!=="new"){
                 return  getDriverByIdAction(DriverId) as any
                }
                
                return {name:"",station:"",email:"",role:"",activeStatus:true}
              }
            })

              const form=useForm({
                    resolver:zodResolver(DriverSchema),defaultValues: {name:"",itinerary:"",email:"",role:"driver",activeStatus:true}
                });
                useEffect(()=>{
                  if(driver&&routes&&Array.isArray(routes)&&routes){
                     const stationName=routes?.filter(r=>r.id===driver.itinerary).at(0)?.name||"--";
                     //alert(stations.length)
                    form.reset({...driver,station:stationName})
                  }
                  
                 
                },[driver,form,routes])
             
                const handleSubmit=async(data:z.infer<typeof DriverSchema>)=>{
                  
                  try {
                    setPending(true);
                  if(DriverId==="new"){
               
                    const itineraryId=routes?.filter(s=>s.name===data.itinerary).at(0)?.id||"--";
                   await createDriverAction({...data,itinerary:itineraryId})
                   }
                   
                   else if(DriverId&&DriverId!=="new"){
                   const itineraryId=routes?.filter(s=>s.name===data.itinerary).at(0)?.id||"--";
                    await updateDriverAction(DriverId,{...data,itinerary:itineraryId});
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
          <h3>{DriverId==="new"?"Ajouter un utilisateur":"Modifier un utilisateur"}</h3>
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
 
               return (routes&&routes?.length)? (<SelectWithSearch label="L'itinéraire" name="itinerary" value={form.watch("itinerary")} onValueChange={(route)=>form.setValue("itinerary",route)} possibleValues={routes?.map(s=>s.name)} />):<Spinner/>
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
                <Button disabled={isDriverFetching||pending||isRoutesFetching} className="lg:col-span-2 mx-auto disabled:bg-gray-hot">
                    {DriverId==="new"?"Ajouter un utilisateur":"Modifier l'utilisateur"}
                </Button>
            </form>
          </Form>
            </Card>
    )
}

export default DriverAddEdit
