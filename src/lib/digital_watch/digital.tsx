import { useState, useEffect } from "react";
import * as styles from "./digital.module.css";

export const DigitalWatch: React.FC = () => {

  let currentDate = new Date();
  const [sec, setSec] = useState(currentDate.getSeconds());
  
  const updateSec = (sec: any)=>{
    if(sec>=59){
      return 0;
    }
    return sec+1;
  }

  const maintainTwoDigits =( time : any)=> time<10 ? '0'+time : time; 

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSec(sec=>updateSec(sec));
    }, 1000);

    return () => clearInterval(intervalId);

  }, []);

  return (
    <div className={styles.digital} style={{ }}>
      {maintainTwoDigits(currentDate.getHours())}: {maintainTwoDigits(currentDate.getMinutes())} : {maintainTwoDigits(sec)}
    </div>
  );
};
