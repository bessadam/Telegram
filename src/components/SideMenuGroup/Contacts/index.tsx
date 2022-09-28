import React from 'react';
import styles from "./Contacts.module.scss";
//components
import Contact from './Contact';
import SearchField from '../../SearchField';
import SearchOutput from '../../SearchField/SearchOutput';
//icons
import { AiOutlineUserAdd } from "../../../assets/icons";
//interface
import { ContactsInterface } from "../../../types/Contacts";
//redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { setModalWindowActive } from "../../../redux/slices/activeModalWindow";

const Contacts: React.FC = () => {
  const [statusOrderedArray, setStatusOrderedArray] = React.useState<ContactsInterface[]>([]);

  const searchIsActive = useSelector((state: RootState) => state.activeSearch.contactsSearch.isActive);
  const contacts = useSelector((state: RootState) => state.activeContacts.contacts);

  const dispatch = useDispatch();

  React.useEffect(() => {
    const mutableCopyOfContacts = [...contacts];
    setStatusOrderedArray(mutableCopyOfContacts.sort((a, b) => {
      return b.lastActivity - a.lastActivity
    }))
  }, [contacts]);

  const addContact = () => {
    dispatch(setModalWindowActive({active: true}));
  }

  return (
    <div className={styles.contacts}>
      <SearchField searchFrom="Contacts" />
      {!searchIsActive &&<div className={styles.addBtn}>
        <i><AiOutlineUserAdd/></i>
        <p onClick={addContact}>Add Contact</p>
      </div>}
      {!searchIsActive 
        ? statusOrderedArray.map((item, key) => {
        return <Contact key={key} {...item} lastActivity={(Date.now() - item.lastActivity) / 1000} />
        })
        : <SearchOutput searchFrom="Contacts" /> }
    </div>
  )
}

export default Contacts;