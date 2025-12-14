import Spinner from "@/components/main/Spinner"
import Button from "@/components/ui/Button"
import { getStations } from "@/service/apiStation"
import type { Station } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { Pen, Trash } from "lucide-react"

function StationPage() {
    const {data,error,isLoading} = useQuery({ queryKey: ['station'], queryFn: getStations })
  if(error)  console.log(error)
    console.log(data);
    
    if(isLoading){
    return <div className="flex w-full h-full justify-center items-center">
        <Spinner/>
    </div>
    }
        return (
        <div className="flex flex-col gap-4 h-full max-h-screen overflow-y-auto w-full">
            <h3>List des stations</h3>
            {data && data.length>0 ? data.map((station:Station)=>(
                <div key={station.id} className="p-4 border border-gray-hot rounded-lg flex gap-4 w-full bg-background  shadow-xl">
                    <div className="flex flex-col gap-2 mr-auto">

                    <p className="font-bold italic text-xl text-text-primary "><span className="font-bold italic text-xl text-text-primary/80 ">Name:</span> {station.name}</p> 
                    <p><span className="font-semibold">Addresse:</span> {station.adresse}</p> 
                    <p><span className="font-semibold">N°telephone:</span> {station.phone}</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <p className="px-4 py-2 rounded-full bg-primary"><span className="font-semibold">Wilaya:</span> {station.wilaya}</p>
                    </div>
                    <div className="flex flex-col  justify-around">
                    <Button variant="destructive" className="w-10 h-10 bg-gray-hot/20 flex items-center justify-center p-2 rounded-full hover:bg-gray-hot hover:rotate-12">
                        <Trash className="w-5 h-5" color="#f00" />
                    </Button>
                    <Button variant="destructive" className="w-10 h-10 bg-gray-hot/20 flex items-center justify-center p-2 rounded-full hover:bg-gray-hot hover:rotate-12">
                        <Pen className="w-5 h-5 text-cold"  />
                    </Button>
                    </div>
                </div>
            )) : (
                <p>Aucune station trouvée.</p>  
                    )}
        </div>
    )
}

export default StationPage
