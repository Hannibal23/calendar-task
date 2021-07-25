import moment from "moment";
import { useState } from "react";

export const useModal = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [dataToShow, setDataToShow] = useState([]);

    const showModal = data => {
        if (!data) return;
        setDataToShow(data);
        toggleModal()
    }

    const toggleModal = () => setIsOpen(!modalIsOpen)

    return { modalIsOpen, toggleModal, showModal, dataToShow }
}

export const sorter = (a, b) => moment(a.start).format("hh") - moment(b.start).format("hh")

export const calendarSpread = 7;
export const startDate = "2020-06";
export const days = ["s", "m", "t", "w", "t", "f", "s"];
export const currentMonth = date => date.format("MMMM")
export const currentYear = date => date.format("YYYY")
export const prevMonth = date => date.clone().subtract(1, "month")
export const nextMonth = date => date.clone().add(1, "month")

export const renderDayNames = () => (
    <div className="day-names">{days.map((day, index) => (
        <div key={`day-${day}-${index}`} className="week">{day}</div>
    ))}
    </div>
)

export const checkDay = (dayToCheck, date) => date.isSame(dayToCheck, "day") ? "selected" : "";
export const meetingCheker = data => {
    if (!data) return [];
    return data.reduce((acc, val) => {
        if (acc.some(({ meetingRoom, start }) => meetingRoom === val.meetingRoom && start === val.start)){
            return acc;
        } 
        return [...acc, val];
    }, []);
}