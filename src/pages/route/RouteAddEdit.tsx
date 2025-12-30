/* eslint-disable @typescript-eslint/no-explicit-any */
import Spinner from "@/components/main/Spinner";
import RouteTimeLine from "@/components/route/RouteTimeLine";
import TableOfRoutes from "@/components/route/TableOfRoutes";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import Input from "@/components/ui/Input"
import SelectWithSearch from "@/components/ui/SelectWithSearch";
import { addItinerary, EditItinirary,getItiniraryById } from "@/service/apiRoutes";
import { getStationsAction } from "@/service/apiStation";
import type {  Step } from "@/types";
import { useQuery } from "@tanstack/react-query";
import {  useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";

function RouteAddEdit() {
    const params=useParams();
    const id=params.id||"new";
   
  
    const [title, setTitle] = useState<string>("");
    const [steps, setsteps] = useState<Step[]>([]);
    const [selectedStation, setSelectedStation] = useState<null|string>(null);
    const {data:stations,error,isFetching}=useQuery({
        queryKey:["station"],
        queryFn:()=>getStationsAction(),
    })
      useEffect(()=>{
       const renderRoute=async()=>{
        const route=await getItiniraryById(id);
        if(route){
            setTitle(route.name);
            setsteps(route.steps);
        }
       }
       renderRoute();
    },[id])
    const stationsString=stations?.map(s=>s.name);
    const addOrEditRooute=async()=>{
       try {
        let route=null;
        if(id==="new"){
 route=await addItinerary({name:title,steps});
        }else {
            route =await EditItinirary(id,{name:title,steps})
        }
         
        if(route){
            setsteps([]);
            setTitle("");
 toast.success("Itinéraire ajouté")
        }
           
       } catch (error:any) {
    console.log(error)
        toast.error(error)
       }
    }
    if(isFetching)return <div className="flex justify-center items-center">
        <Spinner/>
    </div>
    if(error)
    console.log(error)
    const addStation=(station:string)=>{
        
        if(steps.filter(s=>s.step===station).length>0)return;
setsteps(lst=>{
            return [...lst,{index:lst.length+1,step:station,arrival:{hour:0,minute:0},departure:{hour:0,minute:0}}]
        })
        
    }
    return (
        <div className="flex flex-col p-4">
            <Card className="shadow-2xl min-h-[70svh] lg:min-w-[70svw] min-w-full p-4 border-none ">
            <h3 className="w-full text-center">
{id==="new"?"Ajouter un itinéraire":"Modifier l'itinéraire"}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 h-full">
            <div className="flex flex-col gap-2 col-span-3">
<Input parentClassName="max-w-96" label="Nom d'itinéraire" type="text" placeHolder="entrer le nom d'itinéraire" value={title} onChange={(e)=>setTitle(e.target.value)} />
  <div className="flex gap-2">
    <SelectWithSearch label="Ajouter une étape" name="steps"
     value={selectedStation||""} onValueChange={(sts:string)=>{
        setSelectedStation(sts);
        addStation(sts)
     }}
      possibleValues={stationsString} />
   
  </div>
  <TableOfRoutes routes={steps} setRoutes={setsteps}  />
    <Button onClick={()=>addOrEditRooute()} className="mt-auto" >
        {id==="new"?"Ajouter itinéraire":"Modifier itinéraire"}
    </Button>
            </div>
            <Card className="flex flex-col lg:max-h-[900px] overflow-auto border-gray-300 col-span-2" >
                <h3 className="text-center italic font-semibold text-primary">{`Visualisation d'itinéraire ${title} :`}</h3>
               <RouteTimeLine steps={steps}/>
            </Card>
            </div>
                        </Card> 
        </ div>
    )
}

export default RouteAddEdit
