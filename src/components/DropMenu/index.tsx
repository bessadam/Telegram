import React from 'react';
import styles from "./DropMenu.module.scss";
//interfaces
import { DropItemInterface } from "../../types/DropItem";
//redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { removeUserChannel, setChannelEmpty, setChannelMuted, setChatInfoActive } from "../../redux/slices/activeChats";
import { clearContactChatHistory, deleteUserContactChat, setContactChatEmpty } from '../../redux/slices/activeContacts';

interface DropMenuInterface {
  dropMenuItems: DropItemInterface[];
  menuIcon: any;
}

const DropMenu: React.FC<DropMenuInterface> = ({ menuIcon, dropMenuItems }) => {
  const [dropMenuIsActive, setDropMenuIsActive] = React.useState<boolean>(false);
  const dropMenuRef = React.useRef<HTMLDivElement>(null);

  const {activeContactChat} = useSelector((state: RootState) => state.activeContacts);
  const {currentChannel, userChannels} = useSelector((state: RootState) => state.activeChats);
  const choosedChannel = userChannels.find(channel => channel.id === currentChannel?.id);
  const dispatch = useDispatch();  

  React.useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (!e.path.includes(dropMenuRef.current)) {
        setDropMenuIsActive(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    }
  }, [dropMenuIsActive]);

  const showDropMenu = (name?: string) => {
    setDropMenuIsActive(prev => !prev);
    name === "Info" && dispatch(setChatInfoActive({active: true}));
    name === "Mute" && dispatch(setChannelMuted({active: true}));
    name === "Unmute" && dispatch(setChannelMuted({active: false}));
    name === "Clear Chat History" && dispatch(clearContactChatHistory({id: activeContactChat.id}));
    name === "Delete Chat" && dispatch(deleteUserContactChat({id: activeContactChat.id})) && dispatch(setContactChatEmpty({}));
    name === "Leave Channel" && dispatch(removeUserChannel({id: currentChannel?.id})) && dispatch(setChannelEmpty({}));
  }

  const delayedCloseMenu = () => {
    dropMenuIsActive && setTimeout(() => {
      setDropMenuIsActive(false);
    }, 500)
  }

  return (
    <div className={styles.dragField} ref={dropMenuRef}>
      <i className={styles.dragBtn} onClick={() => showDropMenu()} style={{backgroundColor: dropMenuIsActive ? "rgb(65, 155, 228)" : "", color: dropMenuIsActive ? "white" : ""}}>{menuIcon}</i>
      <ul className={styles.dropMenu} onMouseLeave={delayedCloseMenu} style={{display: dropMenuIsActive ? "block" : "none"}}>
        {dropMenuItems.map((item, key) => {
          return <li key={key} onClick={() => showDropMenu(item.name)}>
            <i><item.icon/></i>
            <span>{dropMenuItems.length > 4 && !choosedChannel?.muted && item.id===3 ? "Mute" : item.name}</span>
          </li>
        })}
      </ul>
    </div>
  )
}

export default DropMenu