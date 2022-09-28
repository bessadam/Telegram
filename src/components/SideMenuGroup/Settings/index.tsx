import React from 'react';
import styles from "./Settings.module.scss";
//components
import MenuBar from './MenuBar';

const Settings: React.FC = () => {
  return (
    <div className={styles.settings}>
      <MenuBar />
    </div>
  )
}

export default Settings;