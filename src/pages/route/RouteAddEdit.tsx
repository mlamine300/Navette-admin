import Spinner from "@/components/main/Spinner";
import TableOfRoutes from "@/components/route/TableOfRoutes";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import Input from "@/components/ui/Input"
import SelectWithSearch from "@/components/ui/SelectWithSearch";
import { getStationsAction } from "@/service/apiStation";
import { useQuery } from "@tanstack/react-query";
import {  useState } from "react";
import { useParams } from "react-router";

function RouteAddEdit() {
    const params=useParams();
    const id=params.id||"new";
    const [title, setTitle] = useState<string>("");
    const [steps, setsteps] = useState<{index:number,step:string}[]>([]);
    const [selectedStation, setSelectedStation] = useState<null|string>(null);
    const {data:stations,error,isFetching}=useQuery({
        queryKey:["station"],
        queryFn:()=>getStationsAction(),
    })
    const stationsString=stations?.map(s=>s.name);
    if(isFetching)return <div className="flex justify-center items-center">
        <Spinner/>
    </div>
    console.log(error)
    return (
        <div className="flex flex-col p-4">
            <Card className="shadow-2xl min-h-[70svh] lg:min-w-[70svw] min-w-full p-4 border-none ">
            <h3 className="w-full text-center">
{id==="new"?"Ajouter un itinéraire":"Modifier l'itinéraire"}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
            <div className="flex flex-col gap-2">
<Input parentClassName="max-w-96" label="Nom d'itinéraire" type="text" placeHolder="entrer le nom d'itinéraire" value={title} onChange={(e)=>setTitle(e.target.value)} />
  <div className="flex gap-2">
    <SelectWithSearch label="Ajouter une étape" name="steps"
     value={selectedStation||""} onValueChange={(sts:string)=>{
        setSelectedStation(sts);
        setsteps(lst=>{
            return [...lst,{index:lst.length+1,step:sts}]
        })
     }}
      possibleValues={stationsString} />
   
  </div>
  <TableOfRoutes routes={steps} setRoutes={setsteps}  />
    <Button className="mt-auto" >
        {id==="new"?"Ajouter itinéraire":"Modifier itinéraire"}
    </Button>
            </div>
            <div className="bg-blue-600">
               
            </div>
            </div>
                        </Card> 
        </ div>
    )
}

export default RouteAddEdit
