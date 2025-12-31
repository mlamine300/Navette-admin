import Spinner from "@/components/main/Spinner";
import RouteRow from "@/components/route/RouteRow";
import RouteRowHeader from "@/components/route/RouteRowHeader";
import RouteTimeLine from "@/components/route/RouteTimeLine";
import Modal from "@/components/ui/Modal";
import { getRoutes } from "@/service/apiRoutes"
import type { Route } from "@/types";
import { useQuery } from "@tanstack/react-query"
import { useState } from "react";

function RouteList() {
    const [showModal, setShowModal] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState<Route|null>(null);
    const {data:routes,error,isFetching}=useQuery({
        queryKey:["routes"],
        queryFn:()=>getRoutes(),
    })
    console.log(routes);
    if(error)console.log(error);
 const showRouteItinerary=(route:Route)=>{
    setShowModal(true);
    setSelectedRoute(route);
    }
    if(isFetching){
        return <div className="flex justify-center items-center min-w-[75svw] min-h-[75svh]">
             <Spinner size="xl"/>
        </div>
    }
    return (
        <div className="flex flex-col w-full ">
            <h3 className=" w-full text-center">Gestion des itinéraire</h3>

            <div className="flex flex-col w-full gap-2">
                <RouteRowHeader/>
                {(routes&&Array.isArray(routes)&&routes.length>0)&&routes.map(r=><RouteRow route={r} show={showRouteItinerary} />)}
            </div>
            <Modal className="max-h-10/12 h-fit" close={()=>setShowModal(false)} showModal={showModal} title={`overView sur l'itinéraire (${selectedRoute?.name})`} >
             <div  className="overflow-y-auto max-h-10/12">

                <RouteTimeLine steps={selectedRoute?.steps||[]} />
             </div>
            </Modal>
        </div>
    )
}

export default RouteList
