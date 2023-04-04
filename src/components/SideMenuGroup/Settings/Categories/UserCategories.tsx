import React from 'react';
import styles from "./Categories.module.scss";
//redux
import { useSelector } from "react-redux";
import { RootState } from '../../../../redux/store';

const UserCategories: React.FC = () => {
  // user data fields
  const [name, setName] = React.useState<string>("");
  const [surname, setSurname] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");

  const currentUser = useSelector((state: RootState) => state.activeContacts.currentUser);

  const logOut = () => {
    localStorage.clear();
    setTimeout(() => {
      document.location.reload();
    }, 500);
  }

  return <>
    <div className={styles.userName}>
      <div className={styles.container}>
        <div className={styles.avatar}>
          <img src={currentUser?.avatar} alt="avatar" />
        </div>
        <div className={styles.nameField}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} /> 
        </div>
      </div>
      <div className={styles.description}>
        <label>Enter your name and add a profile photo</label>
      </div>
    </div>
    <div className={styles.userBio}>
      <div className={styles.title}>
        <h5>BIO</h5>
      </div>
      <div className={styles.textField}>
        <input 
          type="text" 
          placeholder="Description" 
          maxLength={70} 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
      </div>
      <div className={styles.description}>
        <label>Any details such as age, occupation or city</label>
        <label>Example: 23 y.o. designer from San Francisco</label>
      </div>
    </div>
    <div className={styles.userConnectionInfo}>
      <div className={styles.container}>
        <p>Username</p>
        <p>Phone Number</p>
      </div>
    </div>
    <div className={styles.userActions}>
      <div className={styles.container}>
        <p>Add Account</p>
        <p onClick={logOut}>Log Out</p>
      </div>
    </div>
  </>
}

export default UserCategories;