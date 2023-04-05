import React from 'react';
import styles from "./ChatBlock.module.scss";
//components
import SearchInput from '../../../SearchField/SearchInput';
import DropMenu from '../../../DropMenu';
import ChannelPost from './ChannelPost';
import ContactChat from './ContactChat';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { setChannelEmpty, setChatInfoActive } from "../../../../redux/slices/activeChats";
import { setChannelInfoSearchActive, setSearchOutputActive, setChannelInfoSearchValue } from '../../../../redux/slices/activeSearch';
import { setContactChatEmpty } from "../../../../redux/slices/activeContacts";
import { setSideMenuActive, setSwitchAnimation } from '../../../../redux/slices/switchSideMenu';
//icons
import { 
  BiVolumeMute,
  GoSearch,
  BsThreeDots,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  AiOutlineCloseCircle,
  AiOutlineCalendar, 
  MdKeyboardArrowLeft } from "../../../../assets/icons";
//interface
import { ChannelInterface, PostInterface } from '../../../../types/ChannelInterface';
import { ContactsInterface, ContactChatInterface } from "../../../../types/Contacts";
//hooks
import { useCalculateStatus } from '../../../../hooks/useCalculateStatus';
//db
import { dropMenuChannelItems, dropMenuContactItems } from '../../../../redux/db/dbDropMenuItems';

interface ChatBlockI {
  choosedChat: any; // ChannelInterface | ContactsInterface
  currentChat: any; // ChannelInterface | ContactsInterface
  searchAnimationCondition: boolean;
  setSearchAnimationCondition: Function;
  switchToInfoCondition: boolean;
  setSwitchToInfoCondition: Function;
}

const ChatBlock: React.FC<ChatBlockI> = React.memo(({choosedChat, currentChat, searchAnimationCondition, setSearchAnimationCondition, switchToInfoCondition, setSwitchToInfoCondition}) => {
  const [filteredChannelPosts, setFilteredChannelPosts] = React.useState<any>([]);
  const [filteredSearchOutput, setFilteredSearchOutput] = React.useState<any>(); // <ContactChatInterface[] | PostInterface[]>
  const [chats, setChats] = React.useState<any>([]); // <ContactChatInterface[] | PostInterface[]>
  const calculatedStatus = useCalculateStatus((Date.now() - currentChat?.lastActivity) / 1000);

  const sideMenuIsActive = useSelector((state: RootState) => state.activeSideMenu.isActive);

  const {activeContactChat, currentUser, contacts} = useSelector((state: RootState) => state.activeContacts);
  const {currentChannel, chatInfoIsActive} = useSelector((state: RootState) => state.activeChats);
  const channelInfoSearchIsActive = useSelector((state: RootState) => state.activeSearch.channelInfoSearch.isActive);
  const {searchValue, searchOutputActive} = useSelector((state: RootState) => state.activeSearch.channelInfoSearch);

  const blockWidth = useSelector((state: RootState) => state.handleResize.width);
  const blockHeight = useSelector((state: RootState) => state.handleResize.height);

  const dispatch = useDispatch();

  //search output animation
  const [searchOutputAnimationCondition, setSearchOutputAnimationCondition] = React.useState<boolean>(false);

  /**
   * Search Output Animation
   */

  React.useEffect(() => {
    if(searchValue.trim().length) {
      setSearchOutputAnimationCondition(true);
      setTimeout(() => {
        dispatch(setSearchOutputActive({active: true}))
      }, 100)
    }

    if(!searchValue.trim().length) {
      dispatch(setSearchOutputActive({active: false}))
      setTimeout(() => {
        setSearchOutputAnimationCondition(false);
      }, 100)
    }
  }, [searchValue]);

  /**
   * Filtered Search Output Value
   */

  React.useEffect(() => {
    let filteredGlobalValue = searchValue.trim().length && chats.filter((chat: any) => {
      if(chat.text.split(' ').join('').toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    });

    filteredGlobalValue && filteredGlobalValue.sort((a: any, b: any) => {
      return b.time - a.time; // reverse array cause message should start from bottom of the block to the top
    });

    setFilteredSearchOutput(filteredGlobalValue);
  }, [chats, searchValue]);

  React.useEffect(() => {
    const userContactChats = contacts.find(contact => contact.id === activeContactChat.id);
    const currentUserChat = userContactChats && userContactChats.contacts.filter(contact => contact.id === currentUser?.id);
    
    !!currentUserChat ? setChats(currentUserChat[0].chats) : setChats(currentChannel?.posts);
  }, [contacts, activeContactChat, currentUser, currentChannel]);

  React.useEffect(() => {
    if(!!currentChannel?.id) {
      const channelPosts = [...currentChannel.posts];
      setFilteredChannelPosts(channelPosts.reverse());
    }
  }, [currentChannel]);

  const handleInfoActive = () => {
    dispatch(setChatInfoActive({active: !chatInfoIsActive}));

    setTimeout(() => {
      setSwitchToInfoCondition(!switchToInfoCondition);
    }, 100)
  }

  const handleSearchOutputTime = (time: number) => {
    const currentDate = Date.now();
    const dateStandart = new Date(time);
    let messageTime;
  
    if((currentDate - time) > 86400000) { // if time is longer than one day
      if((currentDate - time) < 604800000) { // if time is shorter than one week
        messageTime = dateStandart.toString().slice(0, 3);
      } else { // if time is bigger than one week
        messageTime = String(dateStandart.getDate()).padStart(2, '0') + '.' + String(dateStandart.getMonth() + 1).padStart(2, '0') + '.' + dateStandart.getFullYear();
      }
    } else { // if time is shorter than one day
      messageTime =  String(dateStandart.getHours()).padStart(2, '0')  + ':' + String(dateStandart.getMinutes()).padStart(2, '0');
    }

    return messageTime;
  }

  const handleSearchActive = () => {
    channelInfoSearchIsActive 
      ? dispatch(setChannelInfoSearchActive({active: !channelInfoSearchIsActive}))
      : setTimeout(() => {
          dispatch(setChannelInfoSearchActive({active: !channelInfoSearchIsActive}));
        }, 100)

    !searchAnimationCondition 
      ? setSearchAnimationCondition(true) 
      : setTimeout(() => {
          setSearchAnimationCondition(false);
        }, 100)

    dispatch(setChannelInfoSearchValue({searchValue: ""})); // clear search value
    setSearchOutputActive({active: false}) && setSearchOutputAnimationCondition(false); // also close search output 
  }

  const closeCurrentChat = () => {
    dispatch(setSwitchAnimation({active: true}));
    
    setTimeout(() => {
      dispatch(setSideMenuActive({active: true}));
    }, 100);

    setTimeout(() => {
      !!currentChannel?.id ? dispatch(setChannelEmpty({})) : dispatch(setContactChatEmpty({}));
    }, 200);
  }

  return (
    <div 
      className={styles.chatInfo} 
      style={{
        display: switchToInfoCondition ? "none" : "block",
        transform: blockWidth<600 
          ? chatInfoIsActive ? chatInfoIsActive ? "translateX(-150px)" : "" : !sideMenuIsActive ? "" : "translateX(150px)"
          : chatInfoIsActive ? "translateX(-150px)" : "",
        
        opacity: blockWidth<600 
          ? chatInfoIsActive ? chatInfoIsActive ? "0" : "1" : !sideMenuIsActive ? "1" : "0"
          : chatInfoIsActive ? "0" : "1",
      }}
    >
      <div className={styles.header}>
        {blockWidth < 600 && <div className={styles.backArrow} onClick={closeCurrentChat}>
          <i><MdKeyboardArrowLeft/></i>
        </div>}
        <div className={styles.avatar}>
          <img src={currentChat?.avatar} alt="avatar" />
        </div>
        <div className={styles.info}>
          <div className={styles.chatData} onClick={handleInfoActive}>
            <div className={styles.chatName}>
              <h4>{currentChat.name}</h4>
              <i style={{opacity: choosedChat?.muted ? "1" : "0"}}><BiVolumeMute/></i> 
            </div>
            <div className={styles.chatActivity}>
              <span 
                style={{
                  color: currentChat?.lastActivity === 0 ? "#45a4f3" : ""
                }}
              >
                {currentChat.subscribers ? `${currentChat.subscribers} subscribers` : `last seen ${calculatedStatus}`}
              </span>
            </div>
          </div>
          <div className={styles.chatUtilities}>
            <i className={styles.icon} onClick={handleSearchActive}><GoSearch/></i>
            <div 
              className={styles.searchField} 
              style={{ 
                display: searchAnimationCondition ? "flex" : "none",
                opacity: channelInfoSearchIsActive ? "1" : "0",
                top: channelInfoSearchIsActive ? "59px" : "-30px"
              }}
            >
              <div className={styles.searchArrows}>
                <i><MdKeyboardArrowUp/></i>
                <i><MdKeyboardArrowDown/></i>
              </div>
              <div className={styles.chatSearch}>
                <SearchInput searchFrom="ChatInfo" />
                {!!filteredSearchOutput && <div 
                  className={styles.searchOutput}
                  style={{
                    display: searchOutputAnimationCondition ? "flex" : "none",
                    opacity: searchOutputActive ? "1" : "0",
                    top: searchOutputActive ? "47px" : "-50px"
                  }}  
                >
                  <ul className={styles.outputMessagesList}>
                    {filteredSearchOutput.map((message: any, key: number) => {
                      return <li key={key}>
                        <div className={styles.messageInfo}>
                          <div className={styles.messageUserAvatar}>
                            <img src={message?.fromConsumer ? currentUser?.avatar : currentChat?.avatar} alt="avatar" />
                          </div>
                          <div className={styles.messageData}>
                            <span className={styles.username}>{message.fromConsumer ? currentUser?.name : currentChat.name}</span>
                            <p className={styles.text}>{message.text}</p>
                          </div>
                        </div>
                        <div className={styles.messageDate}>
                          <p>{handleSearchOutputTime(message.time)}</p>
                        </div>
                      </li>
                    })}
                  </ul>
                </div> }
              </div>
              <div className={styles.optionalButtons}>
                <i><AiOutlineCalendar/></i>
                <i onClick={handleSearchActive}><AiOutlineCloseCircle/></i>
              </div>
            </div> 
            <DropMenu 
              dropMenuItems={!!currentChannel?.id ? dropMenuChannelItems : dropMenuContactItems} 
              menuIcon={<BsThreeDots/>} 
            />
          </div>
        </div>
      </div>
      <div className={styles.chatPosts} style={{height: !!currentChannel?.id  ? blockHeight - 135 : blockHeight - 85}}>
        {!!currentChannel?.id  ? filteredChannelPosts.map((channelInfo: any, key: number) => {
        return <ChannelPost key={key} {...channelInfo} name={currentChannel.name} avatar={currentChannel?.avatar} />
        }) : <ContactChat {...currentChat} blockHeight={blockHeight - 135} /> }
      </div>
    </div>
  )
});

export default ChatBlock;