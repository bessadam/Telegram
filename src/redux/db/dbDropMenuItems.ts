import { 
  BiBell,
  BsInfoCircle,
  ImBin,
  MdOutlineEditCalendar,
  RiInboxArchiveLine,
  RiGroupLine,
  MdOutlineTimer,
  FaBullhorn,
  BsFillBrushFill,
  MdOutlineSchedule,
  FaBroom,
} from "../../assets/icons";

export const dropMenuChannelItems = [
  {id: 1, name: "Edit", icon: MdOutlineEditCalendar},
  {id: 2, name: "Info", icon: BsInfoCircle},
  {id: 3, name: "Unmute", icon: BiBell},
  {id: 4, name: "Archive", icon: RiInboxArchiveLine},
  {id: 5, name: "Leave Channel", icon: ImBin},
];

export const dropMenuContactItems = [
  {id: 1, name: "Edit", icon: MdOutlineEditCalendar},
  {id: 2, name: "Info", icon: BsInfoCircle},
  {id: 3, name: "Unmute", icon: BiBell},
  {id: 4, name: "Create Group", icon: RiGroupLine},
  {id: 5, name: "Change Colors", icon: BsFillBrushFill},
  {id: 6, name: "Archive", icon: RiInboxArchiveLine},
  {id: 7, name: "Scheduled Messages", icon: MdOutlineSchedule},
  {id: 8, name: "Clear Chat History", icon: FaBroom},
  {id: 9, name: "Delete Chat", icon: ImBin},
];

export const dropMenuSearchItems = [
  {id: 1, name: "New Group", icon: RiGroupLine},
  {id: 2, name: "New Secret Chat", icon: MdOutlineTimer},
  {id: 3, name: "New Channel", icon: FaBullhorn},
];