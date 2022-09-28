import React from 'react';
import styles from "./SearchField.module.scss";
//interface
import { ChannelInterface } from '../../types/ChannelInterface';
//icons 
import { MdOutlineSearchOff, MdOutlineSearch } from "../../assets/icons"
//redux
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveChannel } from '../../redux/slices/activeChats';
import { setChatsSearchActive, setChatsSearchValue, setContactsSearchActive, setContactsSearchValue } from '../../redux/slices/activeSearch';
import { setContactChatEmpty } from '../../redux/slices/activeContacts';
import { setSideMenu } from '../../redux/slices/switchSideMenu';

interface SearchOutputI {
  searchFrom: string;
}

const SearchOutput: React.FC<SearchOutputI> = ({ searchFrom }) => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [globalSearchResultCount, setGlobalSearchResultCount] = React.useState<number>(6);
  const [filteredContactsAndChats, setFilteredContactsAndChats] = React.useState<any>([]); // ChannelInterface | ContactsInterface
  const [filteredGlobalSearchResults, setFilteredGlobalSearchResults] = React.useState<any>([]); // ChannelInterface | ContactsInterface

  const {currentChannel, userChannels, notActiveChannels} = useSelector((state: RootState) => state.activeChats);
  const {contacts, notFriendContacts} = useSelector((state: RootState) => state.activeContacts);
  const chatsSearchValue = useSelector((state: RootState) => state.activeSearch.chatsSearch.searchValue);
  const contactsSearchValue = useSelector((state: RootState) => state.activeSearch.contactsSearch.searchValue);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if(searchFrom==="Chats") {
      setInputValue(chatsSearchValue);
    }

    if(searchFrom==="Contacts") {
      setInputValue(contactsSearchValue);
    }
  }, [searchFrom, chatsSearchValue, contactsSearchValue]);


  /**
   * Contacts and Chats output
   */
  React.useEffect(() => {
    if(searchFrom==="Chats") {
      const filteredUserValue = chatsSearchValue.trim().length && userChannels.filter((channel) => {
        if(channel.name.split(' ').join('').toLowerCase().includes(chatsSearchValue.toLowerCase())) {
          return true;
        }
        return false;
      })
  
      typeof filteredUserValue==="object" && setFilteredContactsAndChats(filteredUserValue);
    }

    if(searchFrom==="Contacts") {
      const filteredUserValue = contactsSearchValue.trim().length && [...contacts, ...userChannels].filter((channel) => {
        if(channel.name.split(' ').join('').toLowerCase().includes(contactsSearchValue.toLowerCase())) {
          return true;
        }
        return false;
      })
  
      typeof filteredUserValue==="object" && setFilteredContactsAndChats(filteredUserValue);
    }

  }, [searchFrom, chatsSearchValue, contactsSearchValue, userChannels, contacts]);

  /**
   * Global contacts ant chats output
   */
  React.useEffect(() => {
    if(searchFrom==="Chats") {
      let filteredGlobalValue = chatsSearchValue.trim().length && notActiveChannels.filter(channel => {
        if(channel.name.split(' ').join('').toLowerCase().includes(chatsSearchValue.toLowerCase())) {
          return true;
        }
        return false;
      })
  
      typeof filteredGlobalValue==="object" && setFilteredGlobalSearchResults(filteredGlobalValue);
    }

    if(searchFrom==="Contacts") {
      let filteredGlobalValue = contactsSearchValue.trim().length && notFriendContacts.filter(contact => {
        if(contact.name.split(' ').join('').toLowerCase().includes(contactsSearchValue.toLowerCase())) {
          return true;
        }
        return false;
      })
  
      typeof filteredGlobalValue==="object" && setFilteredGlobalSearchResults(filteredGlobalValue);
    }
  }, [notActiveChannels, searchFrom, chatsSearchValue, contactsSearchValue, notFriendContacts]);

  const chooseUserChat = (id: number) => {
    if(searchFrom==="Chats") {
      setTimeout(() => {
        dispatch(setActiveChannel({id}));
        dispatch(setChatsSearchActive({active: false}));
        dispatch(setChatsSearchValue({searchValue: ""}));
        dispatch(setContactChatEmpty({}));
      }, 100);
    }

    if(searchFrom==="Contacts") {
      setTimeout(() => {
        dispatch(setActiveChannel({id}));
        dispatch(setContactsSearchActive({active: false}));
        dispatch(setContactsSearchValue({searchValue: ""}));
        dispatch(setContactChatEmpty({}));
        dispatch(setSideMenu({id: 3}));
      }, 100);
    }
  }

  const chooseGlobalChannel = (id: number) => {
    if(searchFrom==="Chats") {
      setTimeout(() => {
        dispatch(setActiveChannel({id}));
        userChannels.some(channel => channel.id === id) 
          && dispatch(setChatsSearchActive({active: false})) 
          && dispatch(setContactChatEmpty({}))
          && dispatch(setChatsSearchValue({searchValue: ""}));
      }, 100);
    }
  }

  return (
    <div className={styles.searchOutput}>
      <div className={styles.chats} style={{display: inputValue.length && filteredContactsAndChats.length ? "" : 'none'}}>
          <p className={styles.header}>Contacts and Chats</p>
          <ul>
            {filteredContactsAndChats.map((item: any, key: number) => {
              return <li key={key} onClick={() => chooseUserChat(item.id)}>
                <div className={styles.avatar}>
                  <img src={item.avatar} alt="avatar" />
                </div>
                <div className={styles.info} style={{padding: "11px 0"}}>
                  <p className={styles.name}>{item.name}</p>
                </div>
              </li>
            })}
          </ul>
        </div>
        <div className={styles.global} style={{display: inputValue.length && filteredGlobalSearchResults.length ? "" : 'none'}}>
          <div className={styles.header}>
            <p className={styles.title}>Global Search</p>
            {filteredGlobalSearchResults.length > 6 
              && <p 
                className={styles.showBtn} 
                onClick={() => globalSearchResultCount <= 6 ? setGlobalSearchResultCount(20) : setGlobalSearchResultCount(6)}
              >
                {globalSearchResultCount <= 6 ? "show more" : "show less"}
              </p>}
          </div>
          <ul>
            {filteredGlobalSearchResults.slice(0, globalSearchResultCount).map((item: any, key: number) => {
              return <li 
                key={key} 
                onClick={() => chooseGlobalChannel(item.id)} 
                style={{backgroundColor: item.id === currentChannel?.id ? "#476a93" : "", }}
              >
                <div className={styles.avatar}>
                  <img src={item.avatar} alt="avatar"/>
                </div>
                <div className={styles.info} style={{padding: "5px 0", borderBottom: item.id === currentChannel?.id ? "1px solid rgba(0,0,0,0)" : ""}}>
                  <p className={styles.name}>{item.name}</p>
                  <p className={styles.link} style={{color: item.id === currentChannel?.id ? "#fff" : ""}}>@{item.name}, {item.subscribers} subscribers</p>
                </div>
              </li>
            })}
          </ul>
        </div>
      {!filteredContactsAndChats.length && !filteredGlobalSearchResults.length && <i className={styles.notFound}><MdOutlineSearch/></i>}
    </div> 
  )
}

export default SearchOutput;