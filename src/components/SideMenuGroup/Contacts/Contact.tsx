import React from 'react';
import styles from "./Contacts.module.scss";
//interface
import { ContactsInterface } from "../../../types/Contacts";
//custom hook
import { useCalculateStatus } from "../../../hooks/useCalculateStatus";
//redux
import { RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveContactChat } from "../../../redux/slices/activeContacts";
import { setChannelEmpty } from '../../../redux/slices/activeChats';
import { setSideMenuActive, setSwitchAnimation } from '../../../redux/slices/switchSideMenu';

const Contact: React.FC<ContactsInterface> = ({id, name, surname, lastActivity, avatar}) => {
  const calculatedDate = useCalculateStatus(lastActivity);

  const channelIsActive = useSelector((state: RootState) => state.activeChats.currentChannel);
  const activeContactChat = useSelector((state: RootState) => state.activeContacts.activeContactChat);
  const mainDivWidth = useSelector((state: RootState) => state.handleResize.width);

  const dispatch = useDispatch();

  const openContactChat = () => {
    setTimeout(() => {
      dispatch(setActiveContactChat({id}));
      !!channelIsActive?.id && dispatch(setChannelEmpty({}));
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
      className={styles.contact} 
      onClick={openContactChat} 
      style={{
        backgroundColor: activeContactChat.id === id ? "#45a4f3" : "", 
        color: activeContactChat.id === id ? "white" : "",
      }}
    >
        <div className={styles.avatar}>
          <img src={avatar} alt="avatar" />
        </div>
        <div 
          className={styles.info} 
          style={{
            borderTop: activeContactChat.id === id ? "1px solid rgba(0, 0, 0, 0)" : ""
          }}
        >
          <p className={styles.name}>{name} {surname}</p>
          <p 
            className={styles.status} 
            style={{
              color: lastActivity === 0 ? "#45a4f3" : "",
            }}
          >
            {lastActivity !== 0 && `last seen ${calculatedDate}`}
          </p>
        </div>
      </div>
  )
}

export default Contact