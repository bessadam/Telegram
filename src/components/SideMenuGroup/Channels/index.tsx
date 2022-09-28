import React from 'react';
import styles from "./Channels.module.scss";
//components
import Channel from './Channel';
import SearchField from '../../SearchField';
import SearchOutput from '../../SearchField/SearchOutput';
//redux
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
//interface
import { ChannelInterface } from '../../../types/ChannelInterface';
import { ContactsInterface } from "../../../types/Contacts";
//skeleton
import ChannelSkeleton from "./ChannelSkeleton";

const Channels: React.FC = () => {
  const [orderedChannels, setOrderedChannels] = React.useState<any>([]); // <ContactsInterface[] | ChannelInterface[]>
  
  const searchIsActive = useSelector((state: RootState) => state.activeSearch.chatsSearch.isActive);
  const userChannels: ChannelInterface[] = useSelector((state: RootState) => state.activeChats.userChannels);
  const contacts: ContactsInterface[] = useSelector((state: RootState) => state.activeContacts.contacts);
  
  React.useLayoutEffect(() => {
    if(userChannels.length) {
      const mutableCopyOfChannels = [...userChannels, ...contacts];
      setOrderedChannels(mutableCopyOfChannels.sort((a, b) => {
        return b.lastActivity - a.lastActivity;
      }));
    } 
  }, [userChannels, contacts]);  
  
  return (
    <div className={styles.channels}>
      <SearchField searchFrom="Chats" />
      { orderedChannels.length 
        ? !searchIsActive ? orderedChannels.map((item: any) => {
          return <Channel {...item} key={item.id + item.name} />
        }) : <SearchOutput searchFrom="Chats" /> 
        : [...Array(7)].map((_, key) => {
          return <ChannelSkeleton key={key} />
        })
      }
    </div>
  )
}

export default Channels;