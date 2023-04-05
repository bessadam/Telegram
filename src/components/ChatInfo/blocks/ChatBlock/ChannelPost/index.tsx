import React from 'react';
import styles from "./ChannelPost.module.scss";
//icons
import { RiShareForwardFill, AiOutlineEye, FaRegComment } from "../../../../../assets/icons";

interface ChannelPostI {
  text: string;
  time: string;
  media: string;
  views: number;
  name: string;
  avatar: string;
}

const ChannelPost: React.FC<ChannelPostI> = React.memo(({text, time, media, views, name, avatar}) => {
  const [shareBtnActive, setShareBtnActive] = React.useState<boolean>(false);
  const dateStandart = new Date(time);
  const postDay = dateStandart.getDate() + " " +  dateStandart.toLocaleDateString('en-us', {month:"long"});
  const date = String(dateStandart.getHours()).padStart(2, '0')  + ':' + String(dateStandart.getMinutes()).padStart(2, '0');

  return (
    <div className={styles.container}>
      <div className={styles.channelPost} onMouseEnter={() => setShareBtnActive(true)} onMouseLeave={() => setShareBtnActive(false)}>
        <div className={styles.avatar}>
          <img src={avatar} alt="avatar" />
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.name}>
              <span>{name}</span>
            </div>
            <div className={styles.feedback}>
              <div className={styles.commentaries}>
                <span>191</span>
                <i><FaRegComment/></i>
              </div>
              <div className={styles.views}>
                <span>{views}</span>
                <i><AiOutlineEye/></i>
              </div>
              <div className={styles.time}>
                <span>{postDay} {date}</span>
              </div>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.text}>
              <p>{text}</p>
            </div>
            <div className={styles.share}>
              <i style={{opacity: shareBtnActive ? "1" : "0"}}><RiShareForwardFill/></i> 
            </div>
          </div>
        </div>
      </div>
    </div>
  )
});

export default ChannelPost;