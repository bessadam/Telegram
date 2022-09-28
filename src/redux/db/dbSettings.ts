import {
  VscSettingsGear,
  RiNotificationBadgeLine,
  RiLock2Fill,
  RiMacbookLine,
  HiOutlineDatabase,
  BsFillBrushFill,
  MdLanguage,
  BiSticker,
  BsFillFolderFill,
} from "../../assets/icons";

export const settings = [
  { id: 1, name: "General", icon: VscSettingsGear, bgColor: "#898989", categories: [
    {id: 1, title: "EMOJI & STICKERS", categoryItems: [
      {id: 1, title: "Show Sticker Sidebar", active: true, disable: true, type: "checkbox"},
      {id: 2, title: "Replace Emoji Automatically", active: true, disable: false, type: "checkbox"},
      {id: 3, title: "Large Emoji", active: true, disable: false, type: "checkbox"},
    ]},
    {id: 2, title: "Interface", categoryItems: [
      {id: 1, title: "Show Calls Tab", active: true, disable: false, type: "checkbox"},
      {id: 2, title: "Show Icon in Menu Bar", active: true, disable: false, type: "checkbox"},
      {id: 3, title: "In-App Sounds", active: true, disable: false, type: "checkbox"},
    ]},
    {id: 3, title: "Shortcuts", categoryItems: [
      {id: 1, title: "Keyboard Shortcuts", active: true, disable: false, type: "button"},
    ]},
    {id: 4, title: "Advanced", categoryItems: [
      {id: 1, title: "Copy Text Formatting", active: true, disable: false, type: "checkbox"},
      {id: 2, title: "Accept Secret Chats", active: true, disable: false, type: "checkbox"},
    ]},
    {id: 5, title: "Force Touch Active", categoryItems: [
      {id: 1, title: "Reply to Message", active: false, disable: false, type: "button"},
      {id: 2, title: "Edit Message", active: true, disable: false, type: "button"},
      {id: 3, title: "Forward Message", active: false, disable: false, type: "button"},
    ]},
    {id: 6, title: "Input Settings", categoryItems: [
      {id: 1, title: "Send with Enter", active: false, disable: false, type: "button"},
      {id: 2, title: "Send with ⌘ + Enter", active: true, disable: false, type: "button"},
    ]},
    {id: 7, title: "Call Settings", categoryItems: [
      {id: 1, title: "Call Settings", active: true, disable: false, type: "button"},
    ]},
  ]},
  { id: 2, name: "Notifications and Sounds", icon: RiNotificationBadgeLine, bgColor: "#ff3c2f", categories: [
    {id: 1, title: "Notifications", categoryItems: [
      {id: 1, title: "Notifications", active: true, disable: true, type: "checkbox"},
      {id: 2, title: "Message Preview", active: true, disable: false, type: "checkbox"},
      {id: 3, title: "Notifications tone", active: true, disable: false, type: "checkbox"},
      {id: 4, title: "Bounce dock icon", active: true, disable: false, type: "checkbox"},
      {id: 5, title: "Reset Notofications", active: true, disable: false, type: "checkbox"},
    ]},
    {id: 2, title: "Sound Effects", categoryItems: [
      {id: 1, title: "Sent Message", active: true, disable: false, type: "checkbox"},
    ]},
    {id: 3, title: "Badge counter", categoryItems: [
      {id: 1, title: "Enabled", active: true, disable: false, type: "button"},
      {id: 2, title: "Include Groups", active: true, disable: false, type: "button"},
      {id: 3, title: "Include Channels", active: true, disable: false, type: "button"},
      {id: 4, title: "Count Unread Messages", active: true, disable: false, type: "button"},
    ]},
    {id: 4, title: "", categoryItems: [
      {id: 1, title: "New contacts", active: true, disable: false, type: "button"},
    ]},
    {id: 5, title: "When App is in focus", categoryItems: [
      {id: 1, title: "Enabled", active: true, disable: false, type: "button"},
    ]},
  ]},
  { id: 3, name: "Privacy and Security", icon: RiLock2Fill, bgColor: "#1f94fa", categories: [
    {id: 1, title: "Privacy", categoryItems: [
      {id: 1, title: "Notifications", active: true, disable: true, type: "checkbox"},
      {id: 2, title: "Message Preview", active: true, disable: false, type: "checkbox"},
      {id: 3, title: "Notifications tone", active: true, disable: false, type: "checkbox"},
      {id: 4, title: "Bounce dock icon", active: true, disable: false, type: "checkbox"},
      {id: 5, title: "Reset Notofications", active: true, disable: false, type: "checkbox"},
    ]},
    {id: 2, title: "Delete my account", categoryItems: [
      {id: 1, title: "If Away For", active: true, disable: true, type: "checkbox"},
    ]},
    {id: 3, title: "Chats", categoryItems: [
      {id: 1, title: "Delete All Cloud Drafts", active: true, disable: true, type: "checkbox"},
    ]},
  ]},
  { id: 4, name: "Data and Storage", icon: HiOutlineDatabase, bgColor: "#4bd863", categories: [
    {id: 1, title: "", categoryItems: [
      {id: 1, title: "Auto-Download Media", active: true, disable: true, type: "checkbox"},
      {id: 2, title: "Photos", active: true, disable: false, type: "checkbox"},
      {id: 3, title: "Videos", active: true, disable: false, type: "checkbox"},
      {id: 4, title: "Files", active: true, disable: false, type: "checkbox"},
      {id: 5, title: "Reset Auto-Download Settings", active: true, disable: false, type: "checkbox"},
    ]},
    {id: 2, title: "Autoplay Media", categoryItems: [
      {id: 1, title: "GIFs", active: true, disable: true, type: "checkbox"},
      {id: 2, title: "Videos", active: true, disable: false, type: "checkbox"},
    ]},
    {id: 3, title: "Autoplay Media", categoryItems: [
      {id: 1, title: "Use Proxy", active: true, disable: false, type: "checkbox"},
    ]},
  ]},
  { id: 5, name: "Active Sessions", icon: RiMacbookLine, bgColor: "#fc9500" },
  { id: 6, name: "Appearance", icon: BsFillBrushFill, bgColor: "#34aadc" },
  { id: 7, name: "Language", icon: MdLanguage, bgColor: "#d074e6" },
  { id: 8, name: "Stickers and Emoji", icon: BiSticker, bgColor: "#ff9500" },
  { id: 9, name: "Chat Folders", icon: BsFillFolderFill, bgColor: "#d074e6" },
];
