import {z} from "zod"
export interface User {
  id: string;
  name: string;
  email: string;
  token?: string;
}
export const AgentSchema=z.object({
  
  name:z.string().min(3,"nom de agent trop court").max(50,"nom de agent trop long"),
  email:z.string().min(3,"email de agent trop court").max(30,"email de agent trop long"),
  password:z.string().min(8,"email de agent trop court").max(30,"email de agent trop long").optional(),
  rePassword:z.string().min(8,"email de agent trop court").max(30,"email de agent trop long").optional(),
  role:z.enum(["admin","agent","driver"]).optional(),
  station :z.string(),
  activeStatus:z.boolean().default(true)
});
export interface Agent{
  name:string;
  id?:string;
  email:string;
  role?:"agent"|"admin"|"driver";
  station:{id:string,name:string};
  activeStatus?:boolean;

}
export interface TimeHourMinute{
  hour:number,
  minute:number
}
export interface Step{
  index:number;
  step:string;
  arrival:TimeHourMinute;
  departure:TimeHourMinute;
}
export interface Route{
  id?:string;
  createdAt?:string;
  name:string;
  steps:Step[];
}
//export type Agent=z.infer<typeof AgentSchema>;
// export interface Station {
//   id?: number;
//   name: string;
//   wilaya: string;
//   adresse?: string;
//   phone?: string;
// }
export const StationSchema=z.object({
  id:z.uuid().optional(),
  name:z.string().min(3,"nom de station trop court").max(50,"nom de station trop long"),
  wilaya:z.string().min(3,"wilaya de station trop court").max(30,"wilaya de station trop long"),
  address:z.string().min(3,"addresse de station trop court").max(150,"addresse de station trop long").optional(),
  phone :z.string().min(9,"incorrect num de telephone").max(20,"phone de station trop long").optional()
})

export type Station=z.infer<typeof StationSchema>;