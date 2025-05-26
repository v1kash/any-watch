import { react, useState, useEffect } from "react";

export const DigitalWatch = () => {

  let currentDate = new Date();
  const [sec, setSec] = useState(currentDate.getSeconds());
  
  const updateSec = (sec)=>{
    if(sec>=59){
      return 0;
    }
    return sec+1;
  }

  const maintainTwoDigits = time => time<10 ? '0'+time : time; 

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSec(sec=>updateSec(sec));
    }, 1000);

    return () => clearInterval(intervalId);

  }, []);

  return (
    <div style={{ backgroundColor: "black", color: "gray", fontSize: "128px" }}>
      {maintainTwoDigits(currentDate.getHours())}: {maintainTwoDigits(currentDate.getMinutes())} : {maintainTwoDigits(sec)}
    </div>
  );
};
