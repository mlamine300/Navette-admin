import Spinner from "@/components/main/Spinner"
import SearchBox from "@/components/station/SearchBox"
import Button from "@/components/ui/Button"
import Modal from "@/components/ui/Modal"
import { deleteStationAction, getStationsAction } from "@/service/apiStation"
import type { Station } from "@/types"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Pen, Trash } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { Link, useSearchParams } from "react-router"

function StationPage() {
    const searchparams=useSearchParams();
    const search=searchparams[0].get("search")||"";
    const {data,error,isLoading} = useQuery({ queryKey: ['station'], queryFn:()=> getStationsAction() });
    const tableData=data?.filter((station:Station)=>{
        if(!search)return true;
        const lowerSearch=search.toLowerCase();
        return station.name.toLowerCase().includes(lowerSearch)||
        station.wilaya.toLowerCase().includes(lowerSearch)||
        (station.address&& station.address.toLowerCase().includes(lowerSearch))||
         (station.phone&&station.phone.toLowerCase().includes(lowerSearch))
    });
    const queryClient = useQueryClient();
    const[showModal,setShowModal]=useState<boolean>(false);
    const [selectedStation,setSelectedStation]=useState<Station|null>(null);
    const deleteMutation = useMutation({
    mutationFn:(id:string)=> deleteStationAction(id),
    onSuccess:()=>{
        toast.success(`Station ${selectedStation?.name||"null"} a été supprimé avec succés`)
    queryClient.invalidateQueries({ queryKey: ['station'] });
    },
    onError:(error)=>toast.error(error.message)
    },
  )
    const selectToDelete=(station:Station)=>{
        setSelectedStation(station);
        setShowModal(true);
    }
    const deleteStation=async()=>{
        if(!selectedStation||!selectedStation.id)return;
       await deleteMutation.mutate(selectedStation?.id);
        if(deleteMutation.isSuccess)
        setSelectedStation(null);
        setShowModal(false)
    }
  if(error)  console.log(error)
    
    
    if(isLoading){
    return <div className="flex w-full h-full justify-center items-center">
        <Spinner/>
    </div>
    }
        return (
        <div className="flex flex-col gap-4 h-full max-h-screen overflow-y-auto w-full">
            <h3>List des stations</h3>
            <div className="flex justify-end w-full h-32 px-20">
            <SearchBox label="Recherche une station..." />
            </div>
            {tableData && tableData.length>0 ? tableData.map((station:Station)=>(
                <div key={station.id} className="p-4 border border-gray-hot rounded-lg flex gap-4 w-full bg-background  shadow-xl">
                    <div className="flex flex-col gap-2 mr-auto">

                    <p className="font-bold italic text-xl text-text-primary "><span className="font-bold italic text-xl text-text-primary/80 ">Name:</span> {station.name}</p> 
                    <p><span className="font-semibold">Addresse:</span> {station.address}</p> 
                    <p><span className="font-semibold">N°telephone:</span> {station.phone}</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <p className="px-4 py-2 rounded-full bg-primary"><span className="font-semibold">Wilaya:</span> {station.wilaya}</p>
                    </div>
                    <div className="flex flex-col  justify-around">
                    <Button onClick={()=>selectToDelete(station)} variant="destructive" className="w-10 h-10 bg-gray-hot/20 flex items-center justify-center p-2 rounded-full hover:bg-gray-hot hover:rotate-12">
                        <Trash className="w-5 h-5" color="#f00" />
                    </Button>
                    <Link to={`/station/${station.id}`} className="w-10 h-10 bg-gray-hot/20 flex items-center justify-center p-2 rounded-full hover:bg-gray-hot hover:rotate-12">
                        <Pen className="w-5 h-5 text-cold"  />
                    </Link>
                    </div>
                </div>
            )) : (
                <p>Aucune station trouvée.</p>  
                    )}
                        <Modal className="h-fit  md:min-h-6/12 mx-5 flex flex-col  " showModal={showModal} close={()=>setShowModal(false)} title={`Supprimer la station : ${selectedStation?.name}`} >
          
                <p className="lg:mt-10 my-2">{`Êtes-vous sûr de vouloir supprimer la station ${selectedStation?.name} ?`} </p>
               
                    <div className="flex justify-between mx-1/12 mt-auto mb-3  ">
                        <Button onClick={()=>{
                            setSelectedStation(null);
                            setShowModal(false)
                        }}  className="bg-gray-hot" >
                            Cancel
                        </Button>
                        <Button onClick={()=>deleteStation()} variant={"destructive"} >
                            Supprimer
                        </Button>
                    </div>
                     
                        </Modal>
        </div>
    )
}

export default StationPage
