import React from 'react';
import styles from "./Settings.module.scss";
//icons
import { MdKeyboardArrowLeft } from "../../../assets/icons";
//redux
import { useSelector, useDispatch } from "react-redux";
import { setSettingsActive } from "../../../redux/slices/activeSettings";
import { RootState } from '../../../redux/store';

const SettingCategories: React.FC = () => {
  //user data fields
  const [name, setName] = React.useState<string>("");
  const [surname, setSurname] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");

  const currentUser = useSelector((state: RootState) => state.activeContacts.currentUser);

  const currentSettings = useSelector((state: RootState) => state.activeSettings.currentSettings);
  const activeCategoryId = useSelector((state: RootState) => state.activeSettings.id);
  const user = useSelector((state: RootState) => state.authentication.user);
  
  const mainDivHeight = useSelector((state: RootState) => state.handleResize.height);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if(user) {
      setName(user.name);
      setSurname(user.surname);
    }
  }, [user]);

  const closeSettings = () => {
    dispatch(setSettingsActive({isActive: false, id: 0}));
  }

  const doneProfileChanges = () => {}

  const logOut = () => {
    localStorage.clear();
    setTimeout(() => {
      document.location.reload();
    }, 500);
  }

  const telegramCategories = () => {
    return <>
      {currentSettings.categories?.map((category: any, key: number) => {
        return ( 
          <div className={styles.categoryContainer} key={category.id}>
            <h5>{category.title}</h5>
            <ul key={key}>
              {category.categoryItems.map((item: any) => {
                return <li key={item.id}>
                  <p>{item.title}</p>
                  {/* <input type={item.type} /> */}
                </li>
              })}
            </ul>
          </div>
        ) 
      })}
    </>
  }

  const userCategories = () => {
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
          <input type="text" placeholder="Description" maxLength={70} value={description} onChange={(e) => setDescription(e.target.value)} />
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
  
  return (
    <div className={styles.settingCategories}>
      <div className={styles.header}>
        <div className={styles.backBtn}>
          <i><MdKeyboardArrowLeft/></i>
          <p onClick={closeSettings}>Back</p>
        </div>
        <div className={styles.title}>
          <p>{activeCategoryId !== 0 ? currentSettings.name : "Edit Profile"}</p>
        </div>
        {activeCategoryId === 0 && <div className={styles.doneBtn}>
          <p onClick={doneProfileChanges}>Done</p>
        </div>}
      </div>
      <div className={styles.categories} style={{height: mainDivHeight - 86}}>
        {activeCategoryId === 0 ? userCategories() : telegramCategories()}
      </div>
    </div>
  )
}

export default SettingCategories;