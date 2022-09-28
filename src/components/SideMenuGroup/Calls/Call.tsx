import React from 'react';
import styles from "./Calls.module.scss";
//icons
import { MdPhoneCallback } from "../../../assets/icons";
//interface
import { CallsInterface } from "../../../types/Contacts";
//db
import { contacts } from "../../../redux/db/dbContacts";

const Call: React.FC<CallsInterface> = ({count, time, status, duration, userName, userSurname}) => {
  const [calculatedDuration, setCalculatedDuration] = React.useState<string>("");
  const [avatar, setAvatar] = React.useState<string>("");

  const callDateStandart = new Date(time);
  const date = String(callDateStandart.getDate()).padStart(2, '0') + '.' + String(callDateStandart.getMonth() + 1).padStart(2, '0') + '.' + callDateStandart.getFullYear();

  React.useEffect(() => {
    const currentContact = contacts.find(contact => contact.name === userName);
    currentContact && setAvatar(currentContact.avatar);
  }, [])

  React.useEffect(() => {
    if(duration <= 60) setCalculatedDuration(`${duration} sec`); 
    if(duration > 60) setCalculatedDuration(`${(duration / 60).toFixed(0)} min`);
  }, [duration]);

  return (
    <div className={styles.call} style={{marginLeft: status !== "Outgoing" ? "25px" : "0"}}>
      {status === "Outgoing" && <i><MdPhoneCallback/></i>}
      <div className={styles.avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <div className={styles.info}>
        <div className={styles.user}>
          <p 
            className={styles.name} 
            style={{color: status === "Missed" ? "#cf380b" : ""}}
          >
            {userName} {userSurname} {count >= 2 ? `(${count})` : ""}
          </p>
          <p 
            className={styles.status} 
            style={{color: status === "online" ? "#45a4f3" : ""}}
          >
            {status} {status !== "Missed" ? `(${calculatedDuration})` : ""}
          </p>
        </div>
        <div className={styles.time}>
          <p>{date}</p>
        </div>
      </div>
    </div>
  )
}

export default Call;
