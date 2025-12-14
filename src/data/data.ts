import {
 
  LuLayoutDashboard,
  LuLogOut,

} from "react-icons/lu";
import { Home, HousePlus, Plus, User, UserPen, UserPlus, Van } from "lucide-react";
import { FaRoute } from "react-icons/fa6";

export const SIDE_MENU_ADMIN_DATA = [
  {
    id: "01",
    label: "Tableau de Bord",
    icon: LuLayoutDashboard,
    path: "/",
    hasChilds:true,
    childs:[{
       id: "11",
    label: "Chauffeurs",
    icon: Van,
    path: "/driver",
    hasChilds:false,
    },
  {    id: "12",
    label: "Agents",
    icon: User,
    path: "/users", 
    hasChilds:false,}
  ]
  },
   {
    id: "02",
    label: "Gestion des Stations",
    icon: Home,
    path: "/stations",
    hasChilds:true,
    childs:[
{   id: "21",
    label: "Modifier / supprimer Station",
    icon: Home,
    path: "/station/list",
    hasChilds:false,},
    {
        id: "22",
    label: "Ajouter Station",
    icon: HousePlus,
    path: "/station/new",
    hasChilds:false,
    }
    ]
  },
   {
    id: "03",
    label: "Gestion des Utilisateurs",
    icon: User,
    path: "/user",
    hasChilds:true,
    childs:[
{   id: "31",
    label: "Modifier / supprimer utilisateur",
    icon: UserPen,
    path: "/user/list",
    hasChilds:false,},
    {
        id: "32",
    label: "Ajouter Utilisateur",
    icon: UserPlus,
    path: "/user/new",
    hasChilds:false,
    }
    ]
  },
   {
    id: "04",
    label: "Gestion des intinéraires",
    icon: FaRoute,
    path: "/routes",
    hasChilds:true,
    childs:[
{   id: "41",
    label: "Modifier / supprimer intinéraire",
    icon: FaRoute,
    path: "/routes/list",
    hasChilds:false,},
    {
        id: "42",
    label: "Ajouter intinéraires",
    icon: Plus,
    path: "/routes/new",
    hasChilds:false,
    }
    ]
  },

  
  {
    id: "05",
    label: "Gestion des Navettes",
    icon: Van,
    path: "/driver",
    hasChilds:true,
    childs:[
{   id: "51",
    label: "Modifier / supprimer Navettes",
    icon: Van,
    path: "/driver/list",
    hasChilds:false,},
    {
        id: "52",
    label: "Ajouter Navette",
    icon: Plus,
    path: "/driver/new",
    hasChilds:false,
    }
    ]
  },
 
  
  {
    id: "06",
    label: "Logout",
    icon: LuLogOut,
    path: "/logout",
  },

];




    
    