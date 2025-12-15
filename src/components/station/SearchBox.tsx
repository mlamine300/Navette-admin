import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

function SearchBox({parentClassName,containerClassName,inputClassName,labelClassName,label}:{parentClassName?:string;inputClassName?:string,labelClassName?:string;containerClassName?:string;label:string}) {
   const[search,setSearch]=useState<string>("");
   const [searchParams,setSearchParams]=useSearchParams();
    useEffect(() => {
      const handler = setTimeout(() => {
        const params = new URLSearchParams(searchParams);
        // Search
        if (search) {
          params.set("search", search);
        } else {
          params.delete("search");
        }
        // Emitter Organization
        
        // Recipient Organization
        
        // Status
        
        // Priority
        
        setSearchParams(params);
      }, 300);
      return () => clearTimeout(handler);
    }, [search, setSearchParams, searchParams]);
   
   
    return (
         <div className={cn("flex flex-col gap-1", parentClassName)}>
      <label className={cn("italic font-normal text-text-primary/60 text-sm",labelClassName)} htmlFor={"search"}>
        {label}{" "}
      </label>
        <div className={cn("flex flex-row justify-between items-center rounded  bg-gray-hot/50 p-2 px-4 border border-gray-hot  has-focus:outline outline-primary peer",
       containerClassName )}>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} id="search"  className={cn(
                "w-full h-full focus:border-none focus:outline-none group",
                inputClassName
              )}
              type="text"
              />
            
        </div>
        </div>
    )
}

export default SearchBox
