import React from 'react';
import styles from "./Content.module.scss";
//components
import SideMenu from '../SideMenu';
import ChatInfo from '../ChatInfo';
import Categories from "../SideMenuGroup/Settings/Categories";
//redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from '../../redux/store';
import { setResizedWidth, setResizedHeight } from "../../redux/slices/handleResize";
import { fetchUsers } from '../../redux/slices/setAuthentication';
import { fetchChats } from "../../redux/slices/activeChats";
import { fetchContacts } from "../../redux/slices/activeContacts";
//lodash.debounce
import debounce from "lodash.debounce";

interface ContentI {
  mainDivRef: any; // div ref
}

const Content: React.FC<ContentI> = ({ mainDivRef }) => {
  const [currentChat, setCurrentChat] = React.useState<any>(""); // interfaces <ContactsInterface | ChannelInterface>

  const modalWindowIsActive = useSelector((state: RootState) => state.activeModalWindow.isActive);
  const currentChannel = useSelector((state: RootState) => state.activeChats.currentChannel);
  const currentContact = useSelector((state: RootState) => state.activeContacts.activeContactChat);
  const settingsIsActive = useSelector((state: RootState) => state.activeSettings.isActive);

  const blockWidth = useSelector((state: RootState) => state.handleResize.width);
  const blockHeight = useSelector((state: RootState) => state.handleResize.height);

  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    !!currentChannel?.id ? setCurrentChat(currentChannel) : setCurrentChat(currentContact);
  }, [currentChannel, currentContact]);

  React.useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchChats());
    dispatch(fetchContacts());
  }, [])

  React.useEffect(() => {
    mainDivRef.current && resizeObserver.observe(mainDivRef.current);

    return function cleanup() {
      resizeObserver.disconnect();
    }
  });

  /* 
    Debounce func for resize optimization 
    delay 50ms is optional
  */
    const updateBlockWidth = React.useCallback(
      debounce((width, height) => {
        dispatch(setResizedWidth({value: width}));
        dispatch(setResizedHeight({value: height}));
      }, 50),
      []
    );

  const handleElementResized = () => {
    if(mainDivRef.current) {
      if(mainDivRef.current.offsetWidth) {
        // dispatch(setResizedWidth({value: mainDivRef.current.offsetWidth}));
        // dispatch(setResizedHeight({value: mainDivRef.current.offsetHeight}));
        updateBlockWidth(mainDivRef.current.offsetWidth, mainDivRef.current.offsetHeight);
      }
    }
  }

  const resizeObserver = new ResizeObserver(handleElementResized);

  const sideMenu = () => {
    if(blockWidth < 600) {
      if(Object.keys(currentChat).length === 0) {
        if(settingsIsActive) {
          return
        } else {
          return <SideMenu />;
        }
      } else {
        return 
      }
    } else {
      return <SideMenu />;
    }
  }

  const channelContent = (component: any) => {
    if(blockWidth < 600) {
      if(Object.keys(currentChat).length === 0) {
        return
      } else {
        return component;
      }
    } else {
      if(Object.keys(currentChat).length === 0) {
        return <div className={styles.contentPlug} style={{height: blockHeight - 25}}><p>Select a chat to start messaging</p></div>;
      } else {
        return component;
      }
    }
  }

  return (
    <div className={styles.content} style={{opacity: modalWindowIsActive ? ".2" : ""}}>
      {sideMenu()}
      {settingsIsActive ? <Categories /> : channelContent(<ChatInfo />)}
    </div>
  )
}

export default Content;