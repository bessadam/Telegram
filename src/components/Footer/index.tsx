import React from "react";
import styles from "./Footer.module.scss";
//db
import { controlGroup } from "../../redux/db/dbControlGroup";
//redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../redux/store';
import { setSideMenu } from "../../redux/slices/switchSideMenu";
import { setSettingsActive } from "../../redux/slices/activeSettings";
import { joinNewUserChannel, setChannelMuted } from "../../redux/slices/activeChats";
import { setChatsSearchActive, setChatsSearchValue, setContactsSearchActive, setContactsSearchValue } from "../../redux/slices/activeSearch";

const Footer: React.FC = () => {
  const [channelIsNew, setChannelIsNew] = React.useState<boolean>(false);

  const modalWindowIsActive = useSelector((state: RootState) => state.activeModalWindow.isActive);
  const currentSideMenuCategory = useSelector((state: RootState) => state.activeSideMenu.currentSideMenuCategory);
  const {currentChannel, userChannels, chatInfoIsActive} = useSelector((state: RootState) => state.activeChats);
  const activeContactChat = useSelector((state: RootState) => state.activeContacts.activeContactChat);

  //channels and contacts download status 
  const channelsStatus = useSelector((state: RootState) => state.activeChats.status);
  const contactsStatus = useSelector((state: RootState) => state.activeContacts.status);
  
  const mainDivWidth = useSelector((state: RootState) => state.handleResize.width);
  const settingsIsActive = useSelector((state: RootState) => state.activeSettings.isActive);
  
  const dispatch = useDispatch();
  
  const choosedChannel = userChannels.find(channel => channel.id === currentChannel?.id);
  
  React.useEffect(() => {
    userChannels.some(channel => channel.id === currentChannel?.id) ? setChannelIsNew(false) : setChannelIsNew(true);
  }, [userChannels, currentChannel]);
  
  /*
    Switch control group by current ID
  */

  const setMenuGroup = (id: number) => {
    if(channelsStatus==="resolved" && contactsStatus==="resolved") {
      dispatch(setSideMenu({id})); 
      settingsIsActive 
        && id!==4 
        && dispatch(setSettingsActive({isActive: false, id: 0})); // Need to disable Settings to not show Settings content in Chats component
      id===1 && dispatch(setContactsSearchActive({active: false})) && dispatch(setContactsSearchValue({searchValue: ""})); // Disable and clear Search from Contacts
      id===3 && dispatch(setChatsSearchActive({active: false})) && dispatch(setChatsSearchValue({searchValue: ""})); // Disable and clear Search from SideMenu
      id===4 && dispatch(setSettingsActive({isActive: true, id: 1})); // Switch control group to Settings component
    }
  }
  
  const channelFooterAction = () => {
    channelIsNew 
      ? dispatch(joinNewUserChannel({newChannel: currentChannel}))
      : dispatch(setChannelMuted({active: !currentChannel?.muted}))
  }

  const controlGroupField = (group: any) => {
    if(mainDivWidth < 600 && !!currentChannel.id) {
      if(Object.keys(currentChannel).length !== 0) {
        return 
      }
      if(Object.keys(currentChannel).length === 0 && !activeContactChat.id) {
        return group;
      }
    }
    else {
      return group;
    }
  }

  const chatField = () => {
    if(mainDivWidth < 600 && !!currentChannel.id) {
      if(Object.keys(currentChannel).length !== 0) {
        return <div 
          className={styles.chatField} 
          onClick={channelFooterAction}
        >
          <p>{channelIsNew ? "Join" : choosedChannel?.muted ? "Unmute" : "Mute"}</p>
        </div>
      }

      if(Object.keys(currentChannel).length === 0 ) {
        return 
      }
    }

    if(mainDivWidth > 600 && !!currentChannel.id) {
      if(Object.keys(currentChannel).length !== 0) {
        return <div 
          className={styles.chatField} 
          onClick={channelFooterAction}
        >
          <p>{channelIsNew ? "Join" : choosedChannel?.muted ? "Unmute" : "Mute"}</p>
        </div>
      }

      if(Object.keys(currentChannel).length === 0) {
        return
      }
    }
  }

  return (
    <div className={styles.footer} style={{opacity: modalWindowIsActive ? ".2" : ""}}>
      {controlGroupField(<div className={styles.controlPanel} style={{width: mainDivWidth < 600 ? "100%" : "unset", maxWidth: mainDivWidth < 600 ? "unset" : ""}}>
        {controlGroup.map((item) => {
          return <i 
            key={item.id} 
            onClick={() => setMenuGroup(item.id)} 
            style={{color: currentSideMenuCategory && currentSideMenuCategory.id === item.id ? "#45a4f3" : ""}}
            >
              <item.icon/>
            </i>
        })}
      </div>)}
      {!settingsIsActive && !chatInfoIsActive && chatField()}
    </div>
  );
};

export default Footer;



