import Spinner from "@/components/main/Spinner"
import { Card } from "@/components/ui/card"
import TablePagination from "@/components/ui/TablePAgination"
import { columns } from "@/components/user/columns"
import { DataTable } from "@/components/user/data-table"
import FilterTableDiv from "@/components/user/FilterTableDiv"
import { getAgentActionWithFilter } from "@/service/apiAgent"
import { getStationsAction } from "@/service/apiStation"
import type { Agent } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"


function UserPage() {
    
    
    const searchParams=useSearchParams();
    const search= searchParams[0].get("search")||""
    const station= searchParams[0].get("station")||""
    const role= searchParams[0].get("role")||""
    const page= Number(searchParams[0].get("page")||"1")
    const {data:agents,error: agentError,isPending:agentsIsFetching}=useQuery({
        queryKey:["agents",search,station,role,page],
        queryFn:()=> getAgentActionWithFilter({search,station,role,page,maxPerPage:10})
    });
    const {data:stations,error:stationError,isPending:stationIsFetching}=useQuery({queryKey:["stations"],
        queryFn:getStationsAction});
        if(agentError)console.log(agentError);
        if(stationError)console.log(stationError)
        
    return (
          <div className="flex w-full h-full">
            <Card className='flex item-center bg-background-base border-none shadow-2xl w-full p-5 min-h-screen max-h-screen justify-start overflow-y-auto'>
                {
                    (stationIsFetching||agentsIsFetching)?<Spinner/>
                    :<>
                    <h3 className="text-center">
                        Gestion des Utilisateur
                    </h3>
                    <FilterTableDiv stations={stations}/>
                <DataTable  pending={agentsIsFetching} columns={columns()} data={agents as Agent[]} />
                 <TablePagination maxPages={Math.ceil(5)} className='mt-auto ml-auto gap-2 p-5'/>
                    </>
                }
            </Card>
            
        </div>
    )
}

export default UserPage
