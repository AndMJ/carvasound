import { useState, useEffect } from "react";

const Clock = () => {
    const [date, setDate] = useState(new Date().toDateString() + ", " + new Date().toLocaleTimeString("en-EN"));

    useEffect(() => {
        //document.title = date;
        const timerID = setInterval(() => tick(), 1000);
        return () => {
            clearInterval(timerID);
        };
    }, []);

    const tick = () => {
        setDate(new Date().toDateString() + ", " + new Date().toLocaleTimeString("en-EN"));
    };

    return <>{date}</>;
};

export default Clock;