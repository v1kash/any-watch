import { react, useState, useEffect } from "react";

export const DigitalWatch = () => {

  let currentDate = new Date();
  const [sec, setSec] = useState(currentDate.getSeconds());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSec(sec=> sec+1);
    }, 1000);

    return () => clearInterval(intervalId);


    
  }, []);

  return (
    <div style={{ backgroundColor: "black", color: "gray", fontSize: "128px" }}>
      {currentDate.getHours()}: {currentDate.getMinutes()} : {sec}
    </div>
  );
};
