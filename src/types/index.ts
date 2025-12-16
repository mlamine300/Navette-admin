import {z} from "zod"
export interface User {
  id: string;
  name: string;
  email: string;
  token?: string;
}
export const AgentSchema=z.object({
   id:z.uuid().optional(),
  name:z.string().min(3,"nom de station trop court").max(50,"nom de station trop long"),
  email:z.string().min(3,"email de station trop court").max(30,"email de station trop long"),
   role:z.enum(["admin","agent","driver"]).optional(),
  station :z.string().min(9,"incorrect num de telephone").max(20,"phone de station trop long"),
  activeStatus:z.boolean().default(true)
})
export type Agent=z.infer<typeof AgentSchema>;
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