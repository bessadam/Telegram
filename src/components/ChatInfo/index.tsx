import React from 'react';
//components
import ChatBlock from "./blocks/ChatBlock";
import InfoBlock from './blocks/InfoBlock';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { setChatInfoActive } from "../../redux/slices/activeChats";
import { setChannelInfoSearchActive } from '../../redux/slices/activeSearch';
//interface
import { ChannelInterface } from '../../types/ChannelInterface';
import { ContactsInterface } from "../../types/Contacts";

const ChatInfo: React.FC = () => {
  const [currentChat, setCurrentChat] = React.useState<any>(""); // interfaces <ContactsInterface | ChannelInterface>

  const {currentChannel, userChannels, chatInfoIsActive} = useSelector((state: RootState) => state.activeChats);
  const contacts = useSelector((state: RootState) => state.activeContacts.contacts);
  const currentContact = useSelector((state: RootState) => state.activeContacts.activeContactChat);
  
  const dispatch = useDispatch();

  //animation
  const [searchAnimationCondition, setSearchAnimationCondition] = React.useState<boolean>(false);
  const [switchToInfoCondition, setSwitchToInfoCondition] = React.useState<boolean>(false);

  //choosedChat 
  const choosedChat = currentChat === currentChannel 
    ? userChannels.find(channel => channel.id === currentChannel?.id)
    : contacts.find(contact => contact.id === currentContact.id);
  
  /**
   * Adding animation when switching to the infoBlock from the category in dropMenu
   */

  React.useEffect(() => {
    chatInfoIsActive && setTimeout(() => {
      setSwitchToInfoCondition(true);
    }, 100)
  }, [chatInfoIsActive]);
  
  React.useEffect(() => {
    !!currentChannel?.id ? setCurrentChat(currentChannel) : setCurrentChat(currentContact);
  }, [currentChannel, currentContact]);
  
  /**
   * When switching chats in SideMenu -->
   *    Turn off search
   *    Turn off info
   */

  React.useEffect(() => {
    dispatch(setChannelInfoSearchActive({active: false}));
    setSearchAnimationCondition(false);

    dispatch(setChatInfoActive({active: false}));
    setSwitchToInfoCondition(false);
  }, [currentChat]);

  return (
    <>
      <ChatBlock 
        choosedChat={choosedChat} 
        currentChat={currentChat} 
        searchAnimationCondition={searchAnimationCondition} 
        setSearchAnimationCondition={setSearchAnimationCondition} 
        switchToInfoCondition={switchToInfoCondition}
        setSwitchToInfoCondition={setSwitchToInfoCondition} 
      />
      <InfoBlock 
        choosedChat={choosedChat} 
        currentChat={currentChat} 
        switchToInfoCondition={switchToInfoCondition}
        setSwitchToInfoCondition={setSwitchToInfoCondition} 
      />
    </>
  )
}

export default ChatInfo;