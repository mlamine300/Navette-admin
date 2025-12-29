/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import Input from "../ui/Input";

function TableOfRoutes({mainClassName,rowClassName,routes,setRoutes}:{mainClassName?:string;rowClassName?:string ;routes:{index:number,step:string}[];setRoutes:any}) {
    const orderRoutes=routes.sort((a,b)=>a.index-b.index)
    const changeIndex=(route:{index:number,step:string},newIndex:number)=>{
        
        const rowTochangeWith=routes.filter(r=>r.index===newIndex).at(0);
        const oldIndex=routes.filter(r=>r.step===route.step).at(0)?.index;
       const newRoutes= routes.map((r:{index:number,step:string})=>{
            if(r.step===route.step){
                return {index:newIndex,step:r.step}
            }else if(r.step===rowTochangeWith?.step){
                return {index:oldIndex,step:rowTochangeWith.step}
            }else return r;
        });
        //if(newIndex>routes.length||newIndex<1)return;
        setRoutes(newRoutes)
    }

    
    return (
        <div className={cn(mainClassName,"flex flex-col gap-2 w-full min-w-full max-h-[600px]")} >
        <div className={cn(rowClassName,"grid grid-cols-5 gap-x-4")}>
                <Input parentClassName="col-span-1" labelClassName="hidden" disabled inputClassName="disabled" type="text" value={"index"} placeHolder="" label="" onChange={()=> {return}} />
              <Input parentClassName="col-span-4"  labelClassName="hidden" disabled inputClassName="disabled" type="text" value={"Station / CTR"} placeHolder="" label="" onChange={()=>{return}} />
             
            </div>  
           {orderRoutes.map(route=>
            <div className={cn(rowClassName,"grid grid-cols-5 gap-x-4")}>
                <Input parentClassName="col-span-1" labelClassName="hidden" type="text" value={String(route.index)} placeHolder="" label="" onChange={(e)=> changeIndex(route,Number(e.target.value)||0) } />
              <Input parentClassName="col-span-4"  labelClassName="hidden" disabled inputClassName="disabled" type="text" value={route.step} placeHolder="" label="" onChange={()=>{return}} />
             
            </div>
           )} 
        </div>
    )
}

export default TableOfRoutes
