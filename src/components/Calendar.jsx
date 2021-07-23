import React, { useEffect, useState } from "react";
import moment from "moment";
import "./style.css";
import data from "../data"

const calendarSpread = 7;
const days = ["s", "m", "t", "w", "t", "f", "s"];
const currentMonth = date => date.format("MMMM")
const currentYear = date => date.format("YYYY")
const prevMonth = date => date.clone().subtract(1, "month")
const nextMonth = date => date.clone().add(1, "month")

const renderDayNames = () => (
    <div className="day-names">{days.map((day, index) => (
        <div key={`day-${day}-${index}`} className="week">{day}</div>
    ))}
    </div>
)

const sorter = (a,b) => moment(a.start).format("HH") - moment(b.start).format("HH")

const arr = data.meetings.reduce((acc, val) => {
    const date = moment(val.start).format("YYYY-MM-DD")
    return { ...acc, [date]: [...(acc[date] ? acc[date] : []), val].sort(sorter) }
}, {})

console.log(arr);

const checkDay = (dayToCheck, date) => date.isSame(dayToCheck, "day") ? "selected" : "";

const CalendarHeader = ({ date, changeDate }) => (
    <>
        <div className="previous" onClick={() => changeDate(prevMonth(date))}>{String.fromCharCode(171)}</div>
        <div className="current">{currentMonth(date)} {currentYear(date)}</div>
        <div className="next" onClick={() => changeDate(nextMonth(date))}>{String.fromCharCode(187)}</div>
    </>
)

// const checkMost = Object.keys().

const Calendar = () => {
    const [date, setDate] = useState(moment("2020-06"));
    const [calendar, setCalendar] = useState([])

    const startDay = date.clone().startOf("month").startOf("week").subtract(1, "day");
    const endDay = date.clone().endOf("month").endOf("week")

    const generateCalendar = () => {
        const calendarArr = []

        while (startDay.isBefore(endDay, "day")) {
            calendarArr.push(
                Array(calendarSpread).fill(0).map(() => startDay.add(1, "day").clone())
            )
        }

        setCalendar(calendarArr)
    }

    const changeDate = (day) => setDate(day)

    const renderCalendar = () => calendar.map((week, index) => <div key={`week-${index}`}>
        {week.map((day) => {
            // console.log(day.isSame("2020-06-05"));
            return (
                <div className="day" key={day.format()} onClick={() => changeDate(day)}>
                    <div className={checkDay(day, date)}>{day.format("D")} {arr[day.format("YYYY-MM-DD")]?.map(val => <>{val.name}</>)}</div>
                </div>
            )
        })}
    </div>)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => generateCalendar(), [date])

    return <div className="calendar">
        <CalendarHeader date={date} changeDate={changeDate} />
        <div className="body">
            {renderDayNames()}
            {renderCalendar()}
        </div>
    </div>
}

export default Calendar