import React from 'react';
import styles from "./SearchField.module.scss";
//icons 
import { FiSearch, MdCancel } from "../../assets/icons"; 
//redux
import { 
  setChatsSearchActive, 
  setChatsSearchValue, 
  setContactsSearchActive,
  setContactsSearchValue,
  setChannelInfoSearchActive, 
  setChannelInfoSearchValue 
} from "../../redux/slices/activeSearch";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface SearchInputI {
  searchFrom: string;
}

const SearchInput: React.FC<SearchInputI> = ({ searchFrom }) => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [searchIsActive, setSearchIsActive] = React.useState<boolean>(false);

  const searchInputRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const mainDivWidth = useSelector((state: RootState) => state.handleResize.width);
  
  //Chats search
  const chatsSearchValue = useSelector((state: RootState) => state.activeSearch.chatsSearch.searchValue);
  const chatsSearchIsActive = useSelector((state: RootState) => state.activeSearch.chatsSearch.isActive);

  //Chats search
  const contactsSearchValue = useSelector((state: RootState) => state.activeSearch.contactsSearch.searchValue);
  const contactsSearchIsActive = useSelector((state: RootState) => state.activeSearch.contactsSearch.isActive);

  //ChannelInfo search
  const channelInfoSearchValue = useSelector((state: RootState) => state.activeSearch.channelInfoSearch.searchValue);
  const channelInfoSearchIsActive = useSelector((state: RootState) => state.activeSearch.channelInfoSearch.isActive);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if(searchFrom==="ChatInfo" && channelInfoSearchIsActive) {
      inputRef.current && inputRef.current.focus();
    }
  }, [searchFrom, channelInfoSearchIsActive]);

  /**
   * Setting up local logic of input activity
   */
  React.useEffect(() => {
    if(searchFrom==="Chats") {
      searchIsActive && setSearchIsActive(false);
      chatsSearchIsActive && setSearchIsActive(true);
    }

    if(searchFrom==="Contacts") {
      searchIsActive && setSearchIsActive(false);
      contactsSearchIsActive && setSearchIsActive(true);
    }
    
    if(searchFrom==="ChatInfo") {
      searchIsActive && setSearchIsActive(false);
      channelInfoSearchIsActive && setSearchIsActive(true);
    }
  }, [searchIsActive, searchFrom, chatsSearchIsActive, contactsSearchIsActive, channelInfoSearchIsActive]);

  /**
   * Setting up local logic of input value
   */
  React.useEffect(() => {
    if(searchFrom==="Chats") {
      setInputValue(chatsSearchValue);
    }

    if(searchFrom==="Contacts") {
      setInputValue(contactsSearchValue);
    }
    
    if(searchFrom==="ChatInfo") {
      setInputValue(channelInfoSearchValue);
    }
  }, [searchFrom, chatsSearchValue, contactsSearchValue, channelInfoSearchValue]);

  React.useEffect(() => {
    if(searchFrom!=="ChatInfo") {
      const handleClickOutside = (e: any) => {
        if(!inputValue.trim().length && !e.path.includes(searchInputRef.current)) {
          searchFrom==="Chats" && dispatch(setChatsSearchActive({active: false}));
          searchFrom==="Contacts" && dispatch(setContactsSearchActive({active: false}));
        }
      };
      document.addEventListener("click", handleClickOutside);
  
      return () => {
        document.removeEventListener("click", handleClickOutside);
      }
    }
  }, [inputValue, searchFrom]);

  const handleSearch = (active: boolean) => {
    if(searchFrom==="Chats") {
      dispatch(setChatsSearchActive({active}));
      inputRef.current && inputRef.current.focus();
    }

    if(searchFrom==="Contacts") {
      dispatch(setContactsSearchActive({active}));
      inputRef.current && inputRef.current.focus();
    }

    if(searchFrom==="ChatInfo") {
      dispatch(setChannelInfoSearchActive({active}));
      inputRef.current && inputRef.current.focus();
    }
  }

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(searchFrom==="Chats") {
      dispatch(setChatsSearchValue({searchValue: e.target.value}));
    }

    if(searchFrom==="Contacts") {
      dispatch(setContactsSearchValue({searchValue: e.target.value}));
    }

    if(searchFrom==="ChatInfo") {
      dispatch(setChannelInfoSearchValue({searchValue: e.target.value}));
    }
  }

  const clearSearch = () => { 
    if(searchFrom==="Chats") {
      dispatch(setChatsSearchValue({searchValue: ""}));
    }

    if(searchFrom==="Contacts") {
      dispatch(setContactsSearchValue({searchValue: ""}));
    }

    if(searchFrom==="ChatInfo") {
      dispatch(setChannelInfoSearchValue({searchValue: ""}));
    }
  }

  return (
    <div className={styles.searchInput} ref={searchInputRef} onClick={() => handleSearch(true)}>
      <input 
        ref={inputRef}
        type="text" 
        value={inputValue}
        onChange={(e) => onSearchChange(e)}
        className={styles.searchInput} 
        placeholder="Search" 
        maxLength={searchFrom==="ChatInfo" ? 75 : 30}
        style={{
          paddingLeft: searchFrom!=="ChatInfo"
            ? mainDivWidth<600 ? "30px" : searchIsActive ? "30px" : "90px" 
            : "40px",
        }}
      />
      <i 
        className={styles.searchIcon} 
        style={{
          paddingLeft: searchFrom!=="ChatInfo" 
            ? mainDivWidth<600 ? "10px" : searchIsActive ? "10px" : "70px" 
            : "10px",
        }}
      >
        <FiSearch/>
      </i>
      <i 
        className={styles.clearIcon} 
        onClick={() => clearSearch()} 
        style={{
          opacity: searchFrom!=="ChatInfo"  
            ? searchIsActive ? "1" : "0"
            : "1",
          right: searchFrom!=="ChatInfo"  
            ? searchIsActive ? "0" : "50px"
            : "0"
        }}
      >
        <MdCancel/>
      </i> 
    </div>
  )
}

export default SearchInput