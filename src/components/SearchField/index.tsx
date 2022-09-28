import React from 'react';
import styles from "./SearchField.module.scss";
//components
import DropMenu from '../DropMenu';
import SearchInput from './SearchInput';
//icons
import { FiEdit } from "../../assets/icons";
//db
import { dropMenuSearchItems } from "../../redux/db/dbDropMenuItems";
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

interface SearchFieldI {
  searchFrom: string;
}

const SearchField: React.FC<SearchFieldI> = ({ searchFrom }) => {
  const [searchIsActive, setSearchIsActive] = React.useState<boolean>(false);
  //Chats search
  const chatsSearchIsActive = useSelector((state: RootState) => state.activeSearch.chatsSearch.isActive);
  //Chats search
  const contactsSearchIsActive = useSelector((state: RootState) => state.activeSearch.contactsSearch.isActive);
  //ChannelInfo search
  const channelInfoSearchIsActive = useSelector((state: RootState) => state.activeSearch.channelInfoSearch.isActive);

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

  return (
    <div className={styles.searchField}>
      <SearchInput searchFrom={searchFrom} />
      { !searchIsActive && <DropMenu dropMenuItems={dropMenuSearchItems} menuIcon={<FiEdit />} /> }  
    </div>
  )
}

export default SearchField