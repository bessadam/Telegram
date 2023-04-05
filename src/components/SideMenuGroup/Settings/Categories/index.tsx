import React from 'react';
import styles from "./Categories.module.scss";
// category components
import UserCategories from "./UserCategories";
import TelegramCategories from "./TelegramCategories";
//icons
import { MdKeyboardArrowLeft } from "../../../../assets/icons";
//redux
import { useSelector, useDispatch } from "react-redux";
import { setSettingsActive } from "../../../../redux/slices/activeSettings";
import { RootState } from '../../../../redux/store';

const Categories: React.FC = () => {
  const currentSettings = useSelector((state: RootState) => state.activeSettings.currentSettings);
  const activeCategoryId = useSelector((state: RootState) => state.activeSettings.id);
  const mainDivHeight = useSelector((state: RootState) => state.handleResize.height);

  const dispatch = useDispatch();

  const closeSettings = () => {
    dispatch(setSettingsActive({isActive: false, id: 0}));
  }

  return (
    <div className={styles.settingCategories}>
      <div className={styles.header}>
        <div className={styles.backBtn}>
          <i><MdKeyboardArrowLeft/></i>
          <p onClick={closeSettings}>Back</p>
        </div>
        <div className={styles.title}>
          <p>{activeCategoryId !== null ? currentSettings.name : "Edit Profile"}</p>
        </div>
        {activeCategoryId === null && <div className={styles.doneBtn}>
          <p>Done</p>
        </div>}
      </div>
      <div className={styles.categories} style={{height: mainDivHeight - 86}}>
        {activeCategoryId === null ? <UserCategories/> : <TelegramCategories/>}
      </div>
    </div>
  )
}

export default Categories;