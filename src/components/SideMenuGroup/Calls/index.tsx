import React from 'react';
import styles from "./Calls.module.scss";
//components
import Call from './Call';
//icons
import { FiSettings } from "../../../assets/icons";
//db
import { contacts } from "../../../redux/db/dbContacts";
//interface
import { CallsInterface } from "../../../types/Contacts";

const Calls: React.FC = () => {
  const [callsArr, setCallsArr] = React.useState<CallsInterface[]>([]); // contacts only with calls-data
  const [orderedCalls, setOrderedCalls] = React.useState<CallsInterface[]>([]); // ordered calls array

  React.useEffect(() => {    
    contacts.map(item => {
      return item.calls && setCallsArr((prev: any) => [...prev, item.calls]);
    })
  }, []);

  React.useEffect(() => {
    setOrderedCalls(callsArr.flat(1).sort((a, b) => {
      return b.time - a.time;
    }))
  }, [callsArr]);

  return (
    <div className={styles.calls}>
      <div className={styles.header}>
        <i><FiSettings/></i>
        <p>Recent Calls</p>
        <span>Edit</span>
      </div>  
      {orderedCalls.map((call, key) => {
        return <Call {...call} key={key} />
      })}
    </div>
  )
}

export default Calls;