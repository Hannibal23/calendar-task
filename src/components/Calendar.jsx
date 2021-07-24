import React, { useEffect, useState } from "react";
import moment from "moment";
import "./style.css";
import {
    calendarSpread,
    checkDay,
    currentMonth,
    currentYear,
    nextMonth,
    prevMonth,
    renderDayNames,
    startDate
} from "../misc/utils";

const CalendarHeader = ({ date, changeDate }) => (
    <div className="header">
        <div className="previous" onClick={() => changeDate(prevMonth(date))}>{String.fromCharCode(171)}</div>
        <div className="current">{currentMonth(date)} {currentYear(date)}</div>
        <div className="next" onClick={() => changeDate(nextMonth(date))}>{String.fromCharCode(187)}</div>
    </div>
)

const Calendar = ({ showModal, dictionary }) => {
    const [date, setDate] = useState(moment(startDate));
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

    const meetingMapper = (day) => {
        const source = dictionary[day.format("YYYY-MM-DD")];
        if (!source) return null;
        if (source.length >= 4) {
            return source.slice(0, 4).map((val, index) => {
                return (
                    index !== 3 ? (
                        <label title={`${moment(val.start).utc().format("hh:mm")} - ${moment(val.end).utc().format("hh:mm")} ${val.name} -> ${val.meetingRoom}`}>{val.name}</label>
                    ) : (<label>...</label>)
                )
            })
        }

        return source.map(val => {
            return <label title={val.name}>{val.name}</label>
        })

    }

    const handleDayClick = (day) => {
        showModal(dictionary[day.format("YYYY-MM-DD")]);
        changeDate(day)
    }

    const renderCalendar = () => calendar.map(week => week.map(day => {
        return (
            <div className={`day ${checkDay(day, date)}`} key={day.format()} onClick={() => handleDayClick(day)}>
                <span className="day-number">{day.format("D")}</span>
                <div className="meetings">
                    {meetingMapper(day)}
                </div>
            </div>
        )
    }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => generateCalendar(), [date])

    return (
        <>
            <div className="calendar">
                <CalendarHeader date={date} changeDate={changeDate} />
                {renderDayNames()}
                <div className="body">
                    {renderCalendar()}
                </div>
            </div>
        </>
    )
}

export default Calendar