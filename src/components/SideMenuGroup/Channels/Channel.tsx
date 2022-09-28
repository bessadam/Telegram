import React from 'react';
import styles from "./Channels.module.scss";
//icons
import { BiVolumeMute, BsCheck, BsCheckAll }  from '../../../assets/icons';
//interface
import { ContactChatInterface } from "../../../types/Contacts";
//redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../../redux/store';
import { setActiveChannel, setChannelEmpty } from "../../../redux/slices/activeChats";
import { setSettingsActive } from "../../../redux/slices/activeSettings";
import { setActiveContactChat, setContactChatEmpty } from "../../../redux/slices/activeContacts";
import { setSideMenuActive, setSwitchAnimation } from '../../../redux/slices/switchSideMenu';

interface ChannelI {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  muted: boolean;
  posts: [];
  lastActivity: number;
}

const Channel: React.FC<ChannelI> = ({id, name, avatar, muted, surname, posts, lastActivity}) => {
  const [calculatedDate, setCalculatedDate] = React.useState<string>("");
  const [currentChatId, setCurrentChatId] = React.useState<number>(0);
  const [lastPost, setLastPost] = React.useState<ContactChatInterface>();

  const currentChannel = useSelector((state: RootState) => state.activeChats.currentChannel);
  const currentContact = useSelector((state: RootState) => state.activeContacts.activeContactChat);
  const {currentUser, contacts} = useSelector((state: RootState) => state.activeContacts);
  const settingsIsActive = useSelector((state: RootState) => state.activeSettings.isActive);

  const mainDivWidth = useSelector((state: RootState) => state.handleResize.width);

  const dispatch = useDispatch();  

  React.useEffect(() => {
    if(posts) {
      setLastPost(posts[posts.length - 1]);
    } else {
      const test = contacts && contacts.find(contact => contact.id === id);
      const contactChat = test && test.contacts.find(chat => chat.id === currentUser?.id);
      setLastPost(contactChat && contactChat.chats[contactChat.chats.length - 1]);
    }
  }, [posts, contacts, currentUser, id]);
  
  React.useEffect(() => {
    surname ? setCurrentChatId(currentContact.id) : setCurrentChatId(currentChannel.id);
  }, [surname, currentContact, currentChannel]);

  React.useEffect(() => {
    const currentDate = Date.now();
    const time = lastPost ? lastPost.time : lastActivity;
    const dateStandart = new Date(time);

    if((currentDate - time) > 86400000) { // if time is longer than one day
      if((currentDate - time) < 604800000) { // if time is shorter than one week
        setCalculatedDate(dateStandart.toString().slice(0, 3));
      } else { // if time is bigger than one week
        setCalculatedDate(String(dateStandart.getDate()).padStart(2, '0') + '.' + String(dateStandart.getMonth() + 1).padStart(2, '0') + '.' + dateStandart.getFullYear());
      }
    } else { // if time is shorter than one day
      setCalculatedDate(String(dateStandart.getHours()).padStart(2, '0')  + ':' + String(dateStandart.getMinutes()).padStart(2, '0'));
    }
  }, [posts, lastPost, lastActivity])

  const chooseChannel = () => {
    setTimeout(() => {
      surname 
        ? dispatch(setActiveContactChat({id})) && dispatch(setChannelEmpty({})) 
        : dispatch(setActiveChannel({id})) && dispatch(setContactChatEmpty({}));
      settingsIsActive && dispatch(setSettingsActive({isActive: false}));
    }, 100);

    if(mainDivWidth<600) {
      dispatch(setSideMenuActive({active: false}));

      setTimeout(() => {
        dispatch(setSwitchAnimation({active: false}));
      }, 200);
    }
  }

  return (
    <div 
      className={styles.channel} 
      onClick={chooseChannel} 
      style={{
        color: currentChatId === id ? "#fff" : "", 
        backgroundColor: currentChatId === id ? "rgb(69, 164, 243)" : "",
      }}
    >
      <div className={styles.avatar}>
        <img src={avatar} alt="avatar" className={styles.avatarImage} />
      </div>
      <div className={styles.content} style={{borderBottom: currentChatId === id ? "1px solid rgba(0, 0, 0, 0)" : ""}}>
        <div className={styles.header}>
          <div className={styles.title}>
            <h4 style={{maxWidth: mainDivWidth<600 ? "180px" : "140px" }}>{name}</h4>
            <i style={{opacity: muted ? "1" : "0"}}><BiVolumeMute/></i>
          </div>
          <div className={styles.activity}>
            {surname && lastPost ? <i style={{color: currentChatId === id ? "#fff" : ""}}><BsCheckAll/></i> : "" }
            <p className={styles.time}>{calculatedDate}</p>
          </div>
        </div>
        <div className={styles.info}>
          {/* <img src="" alt="" /> */}
          <p className={styles.text}>{lastPost ? lastPost.text : "There are no messages yet."}</p>
        </div>
      </div>
    </div>
  )
}

export default Channel;