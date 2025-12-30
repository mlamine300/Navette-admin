/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils"
import type { TimeHourMinute } from "@/types"

function InputHourMinut({containerClassName,inputClassName,value,setValue}:{inputClassName?:string;containerClassName?:string,value:TimeHourMinute,setValue:(t:TimeHourMinute)=>void}) {
    return (
    <div className= {cn(containerClassName," grid grid-cols-7 items-center bg-gray-hot/50 px-1 border border-gray-hot  has-focus:outline outline-primary peer")} >
            <input className={cn(inputClassName,"col-span-3 py-1 border-none outline-none")} value={value.hour} onChange={(e)=>setValue({hour:Number(e.target.value),minute:value.minute})} />
            <p className="col-span-1">:</p>
              <input className={cn(inputClassName,"col-span-3 py-1 border-none outline-none")} value={value.minute} onChange={(e)=>setValue({minute:Number(e.target.value),hour:value.hour})} />
        </div>
    )
}

export default InputHourMinut
