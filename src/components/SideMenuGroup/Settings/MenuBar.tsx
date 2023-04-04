import React from 'react';
import styles from "./Settings.module.scss";
//components
import SearchField from '../../SearchField';
//db
import { settings } from "../../../redux/db/dbSettings";
//icons
import { MdOutlineKeyboardArrowRight, AiOutlineUserAdd } from "../../../assets/icons";
//redux 
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../../redux/store';
import { setSettingsActive } from "../../../redux/slices/activeSettings";

const MenuBar: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.authentication.user);
  const activeCategoryId = useSelector((state: RootState) => state.activeSettings.id);
  const dispatch = useDispatch();

  const setActiveSettingCategory = (id: number) => {
    dispatch(setSettingsActive({isActive: true, id}));
  }

  const handleUserSettings = () => {
    dispatch(setSettingsActive({isActive: true, id: null}));
  }

  return (
    <div className={styles.menuBar}>
      <SearchField searchFrom="Settings" />
      <div className={styles.content}>
        <div 
          className={styles.userContainer} 
          onClick={handleUserSettings} 
          style={{backgroundColor: activeCategoryId === null ? "#55A4F9" : ""}}
        >
          <div className={styles.user}>
            <div className={styles.profile}>
              <div className={styles.avatar}>
                <img src={currentUser?.avatar} alt="" />
              </div>
              <div className={styles.info}>
                <p className={styles.name}>{currentUser?.name}</p>
                <p>{currentUser?.phoneNumber}</p>
                <p>{currentUser?.link}</p>
              </div>
            </div>
            { activeCategoryId !==0 && <div className={styles.arrow} >
              <i><MdOutlineKeyboardArrowRight/></i>
            </div> }
          </div>
        </div>
        <div className={styles.addBtn}>
          <i><AiOutlineUserAdd/></i>
          <p>Add Account</p>
        </div>
        <div className={styles.categories}>
          <ul>
            {settings.map((category, key) => {
              return <li 
                key={key} 
                onClick={() => setActiveSettingCategory(category.id)} 
                style={{
                  backgroundColor: activeCategoryId === category.id ? "#45a4f3" : "", 
                  color: activeCategoryId === category.id ? "white" : ""
                }}
              >
                <i 
                  className={styles.categoryIcon} 
                  style={{
                    backgroundColor: activeCategoryId===category.id ? "white" : category.bgColor, 
                    color: activeCategoryId === category.id ? "#1B222C" : ""
                  }}
                >
                    <category.icon/>
                  </i>
                <p>{category.name}</p>
                {activeCategoryId !== category.id && <i className={styles.arrow}><MdOutlineKeyboardArrowRight/></i>}
              </li>
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MenuBar;