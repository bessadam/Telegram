import React from 'react';
import styles from "./SideMenu.module.scss";
//redux
import { useSelector, useDispatch} from "react-redux";
import { RootState } from "../../redux/store";
import { setSideMenuActive, setSwitchAnimation } from '../../redux/slices/switchSideMenu';

const SideMenu: React.FC = () => {
  const currentMenu = useSelector((state: RootState) => state.activeSideMenu.currentSideMenuCategory);
  const sideMenuIsActive = useSelector((state: RootState) => state.activeSideMenu.isActive);
  const sideMenuAnimation = useSelector((state: RootState) => state.activeSideMenu.switchAnimation);

  const currentChannel = useSelector((state: RootState) => state.activeChats.currentChannel);
  const currentContact = useSelector((state: RootState) => state.activeContacts.activeContactChat);

  const mainDivWidth = useSelector((state: RootState) => state.handleResize.width);
  const mainDivHeight = useSelector((state: RootState) => state.handleResize.height);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if(!!currentChannel?.id || !!currentContact.id) {
      dispatch(setSideMenuActive({active: false}));
      dispatch(setSwitchAnimation({active: false}));
    }
  }, [currentChannel, currentContact]);

  return (
    <div 
      className={styles.sideMenu} 
      style={{
        display: mainDivWidth < 600 && sideMenuIsActive ? "block" : mainDivWidth < 600 ? sideMenuAnimation ? "block" : "none" : "block",
        transform: mainDivWidth < 600 ? sideMenuIsActive ? "" : "translateX(-150px)" : "",
        opacity: mainDivWidth < 600 ? sideMenuIsActive ? "1" : "0" : "1",
        height: mainDivHeight - 75, 
        width: mainDivWidth < 600 ? "100%" : "unset", 
        maxWidth: mainDivWidth < 600 ? "unset" : "",
      }}
    >
      { currentMenu && <currentMenu.component/> }
    </div>
  )
}

export default SideMenu;