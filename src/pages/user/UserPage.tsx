import Spinner from "@/components/main/Spinner"
import { Card } from "@/components/ui/card"
import TablePagination from "@/components/ui/TablePAgination"
import { columns } from "@/components/user/columns"
import { DataTable } from "@/components/user/data-table"
import FilterTableDiv from "@/components/user/FilterTableDiv"
import { getAgentsAction } from "@/service/apiAgent"
import { getStationsAction } from "@/service/apiStation"
import type { Agent } from "@/types"
import { useQuery } from "@tanstack/react-query"


function UserPage() {
   // const [pending, setPending] = useState(false);
    //const [stations, setStations] = useState<Station[]>([]);
    //const [agents, setAgents] = useState<Agent[] >([]);
    const {data:agents,error: agentError,isFetching:agentsIsFetching}=useQuery({
        queryKey:["agents"],
        queryFn:getAgentsAction
    });
    const {data:stations,error:stationError,isFetching:stationIsFetching}=useQuery({queryKey:["stations"],
        queryFn:getStationsAction});
        if(agentError)console.log(agentError);
        if(stationError)console.log(stationError)
        
    return (
          <div className="flex w-full h-full">
            <Card className='flex item-center bg-background-base border-none shadow-2xl w-full p-5 min-h-screen justify-start'>
                {
                    (stationIsFetching||agentsIsFetching)?<Spinner/>
                    :<>
                    <FilterTableDiv stations={stations}/>
                <DataTable pending={agentsIsFetching} columns={columns()} data={agents as Agent[]} />
                 <TablePagination maxPages={Math.ceil(5)} className='mt-auto ml-auto gap-2 p-5'/>
                    </>
                }
            </Card>
            
        </div>
    )
}

export default UserPage
