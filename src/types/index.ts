export interface User {
  id: string;
  name: string;
  email: string;
  token?: string;
}
export interface Station {
  id: number;
  name: string;
  wilaya: string;
  adresse?: string;
  phone?: string;
}