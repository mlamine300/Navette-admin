import Spinner from "@/components/main/Spinner";
import { Card } from "@/components/ui/card";
import Input from "@/components/ui/Input"
import SelectMultiple from "@/components/ui/SelectMultiple";
import { getStationsAction } from "@/service/apiStation";
import { useQuery } from "@tanstack/react-query";
import {  useState } from "react";
import { useParams } from "react-router";

function RouteAddEdit() {
    const params=useParams();
    const id=params.id||"new";
    const [title, setTitle] = useState<string>("");
    const [steps, setsteps] = useState<string[]>([]);
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
    <SelectMultiple label="Ajouter une étape" name="steps"
     value={steps} onValueChange={(lst)=>setsteps(lst)}
      possibleValues={stationsString} />

  </div>
            </div>
            <div className="bg-blue-600">
                a
            </div>
            </div>
                        </Card> 
        </ div>
    )
}

export default RouteAddEdit
