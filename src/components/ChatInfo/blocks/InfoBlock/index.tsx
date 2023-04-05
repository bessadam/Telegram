import React from 'react';
import styles from "./InfoBlock.module.scss";
//redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { removeUserChannel, setChannelEmpty, setChannelMuted, setChatInfoActive } from "../../../../redux/slices/activeChats";
//icons
import { BiVolumeMute,MdKeyboardArrowLeft } from "../../../../assets/icons";
//mock media image
import mockMediaImg from "../../../../assets/images/mock-media-img.jpg";
//hooks
import { useCalculateStatus } from '../../../../hooks/useCalculateStatus';
//db
import { userChatCategories, channelChatCategories, userMediaCategories } from "../../../../redux/db/dbInfoBlock";

interface InfoBlockI {
  choosedChat: any; // ChannelInterface | ContactsInterface
  currentChat: any; // ChannelInterface | ContactsInterface
  switchToInfoCondition: boolean;
  setSwitchToInfoCondition: any;
}

const InfoBlock: React.FC<InfoBlockI> = React.memo(({choosedChat, currentChat, switchToInfoCondition, setSwitchToInfoCondition}) => {
  const [currentMediaCategory, setCurrentMediaCategory] = React.useState<number>(1);

  const calculatedDate = useCalculateStatus((Date.now() - currentChat.lastActivity) / 1000);
  const infoDataRef = React.useRef<HTMLDivElement>(null);
  
  const {currentChannel, chatInfoIsActive} = useSelector((state: RootState) => state.activeChats);
  const blockWidth = useSelector((state: RootState) => state.handleResize.width);
  const blockHeight = useSelector((state: RootState) => state.handleResize.height);
  const dispatch = useDispatch();

  //setting up chat categories for infoBlock
  const chatCategories = currentChat === currentChannel ? channelChatCategories : userChatCategories;

  /**
   * it is necessary to bring the number to the following form - 7 999 888-66-44
   */
  const changeStructureOfNumber = () => {
    if(currentChat.phoneNumber) {
      let phoneNumber = 
        currentChat.phoneNumber[0] + " " + 
        currentChat.phoneNumber.slice(1,4) + " " + 
        currentChat.phoneNumber.slice(4, 7) + "-" + 
        currentChat.phoneNumber.slice(7, 9) + "-" + 
        currentChat.phoneNumber.slice(9, 11);
  
      return phoneNumber;
    }
  }

  const handleInfoActive = () => {
    dispatch(setChatInfoActive({active: !chatInfoIsActive}));

    setTimeout(() => {
      setSwitchToInfoCondition(!switchToInfoCondition);
    }, 100)
  }

  const handleMediaCategories = (id: number) => {
    setCurrentMediaCategory(id);
    if(infoDataRef.current) infoDataRef.current.scrollTop = 400;
  }

  const handleChatCategories = (name: string) => {
    name === "Message" &&  dispatch(setChatInfoActive({active: false})) && setSwitchToInfoCondition(false);
    name === "Mute" && dispatch(setChannelMuted({active: true}));
    name === "Unmute" && dispatch(setChannelMuted({active: false}));
    name === "Leave" && dispatch(removeUserChannel({id: currentChannel?.id})) && dispatch(setChannelEmpty({}));
  }

  return (
    <div 
      className={styles.infoBlock} 
      style={{
        display: switchToInfoCondition ? "block" : "none",
        transform: chatInfoIsActive ? "" : "translateX(150px)",
        opacity: chatInfoIsActive ? "1" : "0",
      }}
    > 
      <div className={styles.header}>
        <div className={styles.backBtn}>
          <i><MdKeyboardArrowLeft/></i>
          <p onClick={handleInfoActive}>Back</p>
        </div>
        <div className={styles.title}>
          <p>Info</p>
        </div>
        {!!currentChannel?.id  && <div className={styles.editBtn}>
          <p>Edit</p>
        </div>}
      </div>
      <div className={styles.infoData} ref={infoDataRef} style={{height: blockHeight - 75}}>
        <div className={styles.avatar}>
          <img src={currentChat.avatar} alt="avatar" />
        </div>
        <div className={styles.chatName}>
          <h4 className={styles.name}>{currentChat.name} {choosedChat?.muted && <i><BiVolumeMute/></i>}</h4>
          {!!currentChannel?.id  ? <p>{currentChat.subscribers} subscribers</p> : <p>{currentChat.lastActivity !== 0 ? `last seen ${calculatedDate}` : "online"}</p>} 
        </div>
        <div className={styles.chatCategories}>
          {chatCategories.map(item => {
            return <div 
              className={styles.chatCategory} 
              key={item.id} 
              onClick={() => handleChatCategories(item.name)}
              style={{
                marginRight: item.id !== 4 ? "12px" : "",
                display: blockWidth < 950 && item.id === 3 
                ? "none" 
                : item.id === 2 
                  ? blockWidth > 780 ? "flex"
                  : blockWidth < 780 && blockWidth > 600 
                    ? "none" 
                    : blockWidth < 600 && blockWidth > 470 ? "flex" : "none" 
                  : ""
              }}
            >
              <i><item.icon/></i>
              <p>{item.name === "Unmute" && !choosedChat?.muted ? "Mute" : item.name}</p>
            </div>
          })}
        </div>
        <div className={styles.chatPrivateData}>
        {!!currentChannel?.id 
        ? <>
            <div className={styles.chatChannelInfo}>
              <span>info</span>
              <p>{currentChat.info}</p>
            </div>
            <div className={styles.chatChannelLink}>
              <span>share link</span>
              <p>{currentChat.shareLink}</p>
            </div>
          </>
        : <>
            <div className={styles.chatUserPhone}>
              <span>phone</span>
              <p>+ {changeStructureOfNumber()}</p>
            </div>
            <div className={styles.chatUsername}>
              <span>username</span>
              <p>{currentChat.name}</p>
            </div>
          </> 
        }
        </div>
        <div className={styles.media}>
          <div className={styles.mediaHeader}>
            {userMediaCategories.map(item => {
              return <div 
                key={item.id} 
                onClick={() => handleMediaCategories(item.id)} 
                style={{
                  borderBottom: currentMediaCategory === item.id ? "3px solid #55A4F9" : "", 
                  color: currentMediaCategory === item.id ? "#55A4F9" : ""
                }}
              >
                {item.name}
              </div>
            })}
          </div>
          <div className={styles.mediaOutput}>
            {[...Array(20)].map((_, key) => {
              return <img src={mockMediaImg} alt="media" key={key} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
})

export default InfoBlock;