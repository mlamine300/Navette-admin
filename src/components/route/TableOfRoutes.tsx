/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { FaXmark } from "react-icons/fa6";
import { ArrowDown, ArrowUp } from "lucide-react";
import type { Step, TimeHourMinute } from "@/types";
import InputHourMinut from "../ui/InputHourMinut";

function TableOfRoutes({mainClassName,rowClassName,routes,setRoutes}:{mainClassName?:string;rowClassName?:string ;routes:Step[];setRoutes:any}) {
    const orderRoutes=routes.sort((a,b)=>a.index-b.index)
    // const changeIndex=(route:{index:number,step:string},newIndex:number)=>{
        
    //     const rowTochangeWith=routes.filter(r=>r.index===newIndex).at(0);
    //     const oldIndex=routes.filter(r=>r.step===route.step).at(0)?.index;
    //    const newRoutes= routes.map((r:{index:number,step:string})=>{
    //         if(r.step===route.step){
    //             return {index:newIndex,step:r.step}
    //         }else if(r.step===rowTochangeWith?.step){
    //             return {index:oldIndex,step:rowTochangeWith.step}
    //         }else return r;
    //     });
    //     //if(newIndex>routes.length||newIndex<1)return;
    //     setRoutes(newRoutes)
    // }
    const orderUp=(index:number)=>{
        if(index<2)return;
        setRoutes((routes:{index:number,step:string}[])=>{
            return routes.map(r=>{
                if(r.index===index)return {...r,index:r.index-1};
                else if(r.index===index-1)return{...r,index:r.index+1}
                else return r
            })
        })
    }
    const orderDown=(index:number)=>{
        if(index>=orderRoutes.length)return;
        setRoutes((routes:{index:number,step:string}[])=>{
            return routes.map(r=>{
                if(r.index===index)return {...r,index:r.index+1};
                else if(r.index===index+1)return{...r,index:r.index-1}
                else return r
            })
        })
    }
    const deleteRoute=(index:number)=>{
        const beforeIndex=orderRoutes.filter((r)=>r.index<index);
        const afterIndex=orderRoutes.filter((r)=>r.index>index).map(r=>{return {index:r.index-1,step:r.step}});
        setRoutes([...beforeIndex,...afterIndex]);
    }

    
    return (
        <div className={cn(mainClassName,"flex flex-col gap-2 w-full min-w-full max-h-[600px]")} >
        <div className={cn(rowClassName,"grid grid-cols-9 gap-x-2")}>
                <Input parentClassName="col-span-2" labelClassName="hidden" disabled  type="text" value={"index"} placeHolder="" label="" onChange={()=> {return}} />
              <Input parentClassName="col-span-4"  labelClassName="hidden" disabled  type="text" value={"Station / CTR"} placeHolder="" label="" onChange={()=>{return}} />
               <Input parentClassName="col-span-1" inputClassName="text-[9px]" labelClassName="hidden" disabled  type="text" value={"Arrivée"} placeHolder="" label="" onChange={()=> {return}} />
            <Input parentClassName="col-span-1" inputClassName="text-[9px]" labelClassName="hidden" disabled  type="text" value={"Départ"} placeHolder="" label="" onChange={()=> {return}} />
           <Input parentClassName="col-span-1" inputClassName="text-[9px]" labelClassName="hidden" disabled  type="text" value={"Supp"} placeHolder="" label="" onChange={()=> {return}} />
           
            </div>  
           {orderRoutes.map(route=>
            <div className={cn(rowClassName,"grid grid-cols-9 gap-x-4")}>
              <div className="col-span-2 flex items-center justify-around">
                  <Button disabled={route.index<2} onClick={()=>orderUp(route.index)} className="bg-gray-hot/30 hover:bg-gray-hot  disabled:cursor-not-allowed">
                    <ArrowUp />
                </Button>
                <Input inputClassName="text-xs text-center" parentClassName="max-w-14" disabled labelClassName="hidden" type="text" value={String(route.index)} placeHolder="" label="" onChange={()=> {return}} />
               <Button disabled={route.index>orderRoutes.length-1} onClick={()=>orderDown(route.index)}  className="bg-gray-hot/30 hover:bg-gray-hot disabled:cursor-not-allowed cursor-pointer">
                    <ArrowDown/>
                </Button>
              </div>
              <Input parentClassName="col-span-4"  labelClassName="hidden" disabled  type="text" value={route.step} placeHolder="" label="" onChange={()=>{return}} />
              <InputHourMinut  containerClassName="col-span-1"  value={route.arrival} setValue={(value:TimeHourMinute)=>{
                const newRoutes=orderRoutes.map((r:Step)=>{
                    if(r.index===route.index)return{...r,arrival:value}
                    else return r;
                });
                setRoutes(newRoutes);
              }} />
                <InputHourMinut containerClassName="col-span-1"  value={route.departure}   setValue={(value:TimeHourMinute)=>{
                const newRoutes=orderRoutes.map((r:Step)=>{
                    if(r.index===route.index)return{...r,departure:value}
                    else return r;
                });
                setRoutes(newRoutes);
              }}  />
            
              <Button className="col-span-1 bg-gray-hot/30 hover:bg-gray-hot my-auto" onClick={()=>deleteRoute(route.index)}>
                    <FaXmark className="text-red-500" />
                </Button>
            </div>
           )} 
        </div>
    )
}

export default TableOfRoutes
