function RouteRowHeader() {
    return (
       <div className="grid grid-cols-16 items-center gap-2 shadow-black px-5 py-2 shadow rounded font-semibold">
           
            <p className="col-span-4 ">Nom d'itinéraire</p>
            <p className="flex flex-col col-span-2">
                Etapes
            </p>
            <p className="col-span-1  w-full text-center text-xs">Nombre de stations </p>
                <p className="col-span-4 ">Premiere Station/CTR</p>
                 <p className="col-span-4 ">Dernier Station/CTR </p>

                 <p className="flex items-center">
                  Actions 
                 </p>
        </div>
    )
}

export default RouteRowHeader
