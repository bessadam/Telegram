import React from 'react';
import styles from "./Authentication.module.scss";
//components
import SignIn from './SignIn';
import SignUp from './SignUp';
//redux
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Authentication: React.FC = () => {
  const signIsActive = useSelector((state: RootState) => state.authentication.id);
  return (
    <div className={styles.authentication}>
      <div className={styles.banner}></div>
      {signIsActive === 0 ? <SignIn /> : <SignUp />}
    </div>
  )
}

export default Authentication;