import react from "react";

export const DigitalWatch = (

) => {
    let currentDate = new Date();
    return <div>
       
        {currentDate.getHours()}: {currentDate.getMinutes()} : {currentDate.getSeconds()}

    </div>
}