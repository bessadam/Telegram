import React from 'react';
import styles from "./Categories.module.scss";
//redux
import { useSelector } from "react-redux";
import { RootState } from '../../../../redux/store';

const TelegramCategories: React.FC = () => {
  const currentSettings = useSelector((state: RootState) => state.activeSettings.currentSettings);

  return <>
    {currentSettings.categories?.map((category: any, key: number) => {
      return ( 
        <div className={styles.categoryContainer} key={category.id}>
          <h5>{category.title}</h5>
          <ul key={key}>
            {category.categoryItems.map((item: any) => {
              return <li key={item.id}>
                <p>{item.title}</p>
              </li>
            })}
          </ul>
        </div>
      ) 
    })}
  </>
};

export default TelegramCategories;