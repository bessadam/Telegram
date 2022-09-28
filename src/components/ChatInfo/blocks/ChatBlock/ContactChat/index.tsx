import React from 'react';
import styles from "./ContactChat.module.scss";
//icons
import { 
  ImAttachment, 
  BsEmojiSmile, 
  BiMicrophone, 
  MdSend, 
  BsCheck, 
  BsCheckAll, 
  BsArrowDownCircle 
} from "../../../../../assets/icons";
//redux
import { RootState } from '../../../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { sendNewMessage } from "../../../../../redux/slices/activeContacts";
//interface
import { ContactChatInterface } from "../../../../../types/Contacts";

interface ContactChatI {
  name: string;
  blockHeight: number;
}

const ContactChat: React.FC<ContactChatI> = ({name, blockHeight}) => {
  const [messageValue, setMessageValue] = React.useState<string>("");
  const [listScrollPosition, setListScrollPosition] = React.useState<number>(0);
  const [chats, setChats] = React.useState<ContactChatInterface[]>([]);
  const [chatPlugIsActive, setChatPlugIsActive] = React.useState<boolean>(false);
  const [filteredMessages, setFilteredMessages] = React.useState<ContactChatInterface[]>([]);

  const messageListRef = React.useRef<HTMLUListElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const messageRef = React.useRef<HTMLLIElement>(null);  

  const {activeContactChat, currentUser, contacts} = useSelector((state: RootState) => state.activeContacts);

  const dispatch = useDispatch();

  React.useEffect(() => {
    const userContactChats = contacts.find(contact => contact.id === activeContactChat.id);
    const currentUserChat = userContactChats && userContactChats.contacts.filter(contact => contact.id === currentUser?.id);
    
    if(currentUserChat && !!currentUserChat[0].chats.length) {
      setChats(currentUserChat[0].chats);
      setChatPlugIsActive(false);
    } else {
      setChats([]);
      setChatPlugIsActive(true);
    }
  }, [contacts, activeContactChat, currentUser]);  

  React.useEffect(() => {
    if(!!chats.length) {      
      const mutableCopyOfChats = [...chats];
      mutableCopyOfChats && setFilteredMessages(mutableCopyOfChats.sort((a, b) => {
        return b.time - a.time; // reverse array cause message should start from bottom of the block to the top
      }));
    }
  }, [chats]);    

  /**
   * Scroll to the bottom of block when a new message is sent
   */

  React.useEffect(() => {
    if(messageListRef.current) {
      const handleScroll = () => {
        if(messageListRef.current) {
          const position = messageListRef.current.scrollTop;
          setListScrollPosition(position);
        }
      };
      
      messageListRef.current.addEventListener("scroll", handleScroll);
  
      return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if(messageListRef.current) messageListRef.current.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  React.useEffect(() => {
    inputRef.current && inputRef.current.focus();
    setMessageValue("");
  }, [activeContactChat]);

  const calculateMessageMonth = (time: number) => {
    let day = String(new Date(time).getDate()).padStart(2, '0');

    let monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let month = new Date(time).getMonth();
    let monthName = monthsArray[month];

    return String(day + " " + monthName);
  }

  const calculateMessageTime = (time: number) => {
    const dateStandart = new Date(time);
    if(true) {

    }
    const date = String(dateStandart.getHours()).padStart(2, '0')  + ':' + String(dateStandart.getMinutes()).padStart(2, '0');
    return date;
  }

  const sendMessage = () => {
    if(messageValue.trim().length) {
      const message = {
        fromConsumer: true,
        text: messageValue,
        time: Date.now()
      };
      dispatch(sendNewMessage({id: activeContactChat.id, message}));
      setMessageValue("");
      messageRef.current && messageRef.current.scrollIntoView();
    }
  }

  const scrollToBottom = () => {
    messageRef.current && messageRef.current.scrollIntoView();
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if(e.key === "Enter") {
      sendMessage();
    }
  } 

  return (
    <div>
      <div className={styles.messageBlock}>
        <ul className={styles.messageList} style={{height: blockHeight}} ref={messageListRef}>
          {!chatPlugIsActive ? filteredMessages.map((message, key) => {
            return <li key={key} ref={key === 0 ? messageRef : null}> 
              <div style={{display: "flex"}}> 
                <div className={styles.avatar}>
                  <img src={message.fromConsumer ? currentUser?.avatar : activeContactChat.avatar} alt="avatar" />
                </div>
                <div className={styles.textBody}>
                  <div className={styles.userInfo}>
                    <p className={styles.name}>{message.fromConsumer ? currentUser?.name : name}</p>
                    <div className={styles.activity}>
                      <i className={styles.view}>{<BsCheckAll/>}</i>
                      <p className={styles.time}>
                        {Date.now() - message.time < 86400000 ? calculateMessageTime(message.time) : calculateMessageMonth(message.time) + " " + calculateMessageTime(message.time)}
                      </p>
                    </div>
                  </div>
                  <p className={styles.text}>{message.text}</p>
                </div>
              </div>
            </li> 
          }) : <h1 className={styles.noMessagesPlug}>No messages yet.</h1> }
        </ul>
        {listScrollPosition < -70 && <div className={styles.bottomBtn}>
          <i onClick={scrollToBottom}><BsArrowDownCircle/></i>
        </div> }
      </div>
      <div className={styles.inputField}>
        <span><i><ImAttachment/></i></span>
        <input 
          type="text" 
          placeholder="Write a message..." 
          ref={inputRef} 
          value={messageValue} 
          onChange={e => setMessageValue(e.target.value)} 
          onKeyDown={(e: any) => handleKeyDown(e)}
        />
        <span><i><BsEmojiSmile/></i></span>
        <span 
          style={{color: messageValue.trim() ? "#55A4F9" : ""}}
        >
          <i>{messageValue.trim() ? <MdSend onClick={sendMessage} /> : <BiMicrophone/> }</i>
        </span>
      </div>
    </div>
  )
}

export default ContactChat;



