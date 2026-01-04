import { columns } from "@/components/driver/columns"
import { DataTable } from "@/components/driver/data-table"
import FilterTableDiv from "@/components/driver/FilterTableDiv"
import Spinner from "@/components/main/Spinner"
import { Card } from "@/components/ui/card"
import TablePagination from "@/components/ui/TablePAgination"
import { getDriverActionWithFilter } from "@/service/apiDriver"
import { getRoutes } from "@/service/apiRoutes"
import type { Driver } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"

function DriverList() {
        const searchParams=useSearchParams();
    const search= searchParams[0].get("search")||""
    const itinerary= searchParams[0].get("itinerary")||""
    const role= searchParams[0].get("role")||""
    const page= Number(searchParams[0].get("page")||"1")
    const {data:driver,error: agentError,isPending:driverIsFetching}=useQuery({
        queryKey:["agents",search,itinerary,role,page],
        queryFn:()=> getDriverActionWithFilter({search,itinerary,page,maxPerPage:10})
    });
    const {data:itineraries,error:itineraryError,isPending:itineraryIsFetching}=useQuery({queryKey:["itinerary"],
        queryFn:getRoutes});
        if(agentError)console.log(agentError);
        if(itineraryError)console.log(itineraryError)

     return (
          <div className="flex w-full h-full">
            <Card className='flex item-center bg-background-base border-none shadow-2xl w-full p-5 min-h-screen max-h-screen justify-start overflow-y-auto'>
                {
                    (itineraryIsFetching||driverIsFetching)?<Spinner/>
                    :<>
                    <h3 className="text-center">
                        Gestion des Utilisateur
                    </h3>
                    <FilterTableDiv itineraries={itineraries}/>
                <DataTable  pending={driverIsFetching} columns={columns()} data={driver as Driver[]} />
                 <TablePagination maxPages={Math.ceil(5)} className='mt-auto ml-auto gap-2 p-5'/>
                    </>
                }
            </Card>
            
        </div>
    )
}

export default DriverList
