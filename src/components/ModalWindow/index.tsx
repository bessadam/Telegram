import React from 'react';
import styles from "./ModalWindow.module.scss";
//icons 
import { AiOutlineCloseCircle } from "../../assets/icons";
//redux
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setModalWindowActive } from '../../redux/slices/activeModalWindow';
import { addNewContactToLoggedUser, addNewContactToOtherUser } from "../../redux/slices/activeContacts";

const ModalWindow: React.FC = () => {
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");

  const firstNameRef = React.useRef<HTMLInputElement>(null);

  //error label
  const [errorLabelText, setErrorLabelText] = React.useState<string>("");
  const [errorLabelActive, setErrorLabelActive] = React.useState<boolean>(false);

  const modalWindowIsActive = useSelector((state: RootState) => state.activeModalWindow.isActive);
  const users = useSelector((state: RootState) => state.activeContacts.users);
  const contacts = useSelector((state: RootState) => state.activeContacts.contacts);

  const dispatch = useDispatch();
  //animation
  const [modalWindowCondition, setModalWindowCondition] = React.useState<boolean>(false);

  React.useEffect(() => {
    if(modalWindowIsActive) {
      setTimeout(() => {
        setModalWindowCondition(true);
      }, 200)
    }
    firstNameRef.current && firstNameRef.current.focus();
  }, [modalWindowIsActive]);

  const searchUser = () => {
    if(firstName.trim().length) {
      if(contacts.some(contact => contact.name.toLowerCase() === firstName.toLowerCase())) {
        setErrorLabelActive(true);
        setErrorLabelText("Contact is already yours");
      } else {
        const user = users.find(user => user.name.toLowerCase() === firstName.toLowerCase());

        if(!!user) {
          setTimeout(() => {
            dispatch(addNewContactToLoggedUser({contact: user}));
            dispatch(addNewContactToOtherUser({id: user.id}));
            closeModalWindow();
          }, 300)
        }
  
        if(user===undefined) {
          setErrorLabelActive(true);
          setErrorLabelText("No matches");
        }
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if(e.key==="Enter") {
      searchUser();
    }
  }

  const closeModalWindow = () => {
    dispatch(setModalWindowActive({active: false}));
    setModalWindowCondition(false);
    setErrorLabelActive(false);
    setFirstName("");
    setLastName("");
  }

  return (
    <div className={styles.modalWindow} style={{display: modalWindowIsActive ? "" : "none"}}>
      <div 
        className={styles.header}
        style={{
          transform: modalWindowCondition ? "" : "translateY(50px)"
        }}
      >
        <div className={styles.closeBtn}>
          <i onClick={closeModalWindow}><AiOutlineCloseCircle/></i>
        </div>
        <div className={styles.title}>
          <p>Add Contact</p>
        </div>
      </div>
      <div className={styles.dataFields}>
        <div className={styles.container}>
          <div className={styles.username}>
            <input 
              type="text" 
              placeholder="First Name" 
              value={firstName} 
              onChange={e => setFirstName(e.target.value)} 
              onKeyDown={(e: any) => handleKeyDown(e)} 
              ref={firstNameRef}
            />
          </div>
          <div className={styles.lastname}>
            <input 
              type="text" 
              placeholder="Last Name" 
              value={lastName} 
              onChange={e => setLastName(e.target.value)} 
            />
          </div>
          {errorLabelActive && <div className={styles.errorLabel}>
            <p>{errorLabelText}</p>
          </div>}
        </div>
      </div>
      <div 
        className={styles.acceptBtn} 
        style={{
          transform: modalWindowCondition ? "" : "translateY(-50px)"
        }}
        onClick={searchUser}
      >
        <p>OK</p>
      </div>
    </div>
  )
}

export default ModalWindow;