//icons
import { MdCall, FiSettings, FaRegComments, FaUserCircle } from "../../assets/icons";
//components
import Contacts from "../../components/SideMenuGroup/Contacts"; 
import Channels from "../../components/SideMenuGroup/Channels";
import Calls from "../../components/SideMenuGroup/Calls";
import Settings from "../../components/SideMenuGroup/Settings";

export const controlGroup = [
  {
    id: 1, 
    name: "Contacts", 
    icon: FaUserCircle, 
    component: Contacts
  },
  {
    id: 2, 
    name: "Calls", 
    icon: MdCall, 
    component: Calls
  },
  {
    id: 3, 
    name: "Chats", 
    icon: FaRegComments, 
    component: Channels
  },
  {
    id: 4, 
    name: "Settings", 
    icon: FiSettings, 
    component: Settings
  },
];

