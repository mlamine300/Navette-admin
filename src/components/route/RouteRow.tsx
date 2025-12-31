import type { Route } from "@/types"
import Button from "../ui/Button";
import {  Eye, Pen } from "lucide-react";
import { Link } from "react-router";

function RouteRow({route,show}:{route:Route,show:(route:Route)=>void}) {
    const ordersSteps=route.steps.sort((a,b)=>a.index-b.index);
    const first=ordersSteps.at(0);
    const last=ordersSteps.at(ordersSteps.length-1);
    return (
        <div className="grid grid-cols-16 items-center gap-2 shadow-black px-5 py-2 shadow rounded">
           
            <p className="col-span-4 border-r border-gray-400/50">{route.name}</p>
            <div className="flex flex-col col-span-2">
                {ordersSteps.map(s=><p className="text-xs italic">
                   <span>{s.index}:</span> {s.step}
                </p>)}
            </div>
            <p className="col-span-1 border-r border-gray-400/50 w-full text-center">{ordersSteps.length} </p>
                <p className="col-span-4 border-r border-gray-400/50">{`${first?.step} (${first?.arrival.hour}:${first?.arrival.minute})`} </p>
                 <p className="col-span-4 border-r border-gray-400/50">{`${last?.step} (${last?.arrival.hour}:${last?.arrival.minute})`} </p>

                 <div className="flex items-center">
                    <Button className="group" variant={"ghost"} onClick={()=>show(route)}>
                        <Eye size={15} className="group-hover:scale-125 group-hover:text-primary"/>
                    </Button>
                    <Link to={`/routes/${route.id}`}>
                        <Pen size={15} className="hover:scale-125 hover:text-primary" />
                    </Link>
                 </div>
        </div>
    )
}

export default RouteRow
