//icons
import { 
  BsThreeDots,
  MdCall,
  FaVideo,
  AiTwotoneMessage,
  RiShareForwardFill,
  RiErrorWarningFill,
  BsReverseBackspaceReverse,
  BsFillBellFill 
} from "../../assets/icons";

export const userChatCategories = [
  {id: 1, name: "Message", icon: AiTwotoneMessage},
  {id: 2, name: "Call", icon: MdCall},
  {id: 3, name: "Video", icon: FaVideo},
  {id: 4, name: "More", icon: BsThreeDots},
]

export const channelChatCategories = [
  {id: 1, name: "Unmute", icon: BsFillBellFill},
  {id: 2, name: "Share", icon: RiShareForwardFill},
  {id: 3, name: "Report", icon: RiErrorWarningFill},
  {id: 4, name: "Leave", icon: BsReverseBackspaceReverse},
]

export const userMediaCategories = [
  {id: 1, name: "Media"},
  {id: 2, name: "Files"},
  {id: 3, name: "Links"},
  {id: 4, name: "Music"},
  {id: 5, name: "Voice"},
  {id: 6, name: "GIFs"},
]