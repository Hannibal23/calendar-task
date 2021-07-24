import moment from "moment";
import React from "react"
import data from "../data";
import { sorter, useModal } from "../misc/utils";
import Calendar from "./Calendar";
import MeetingsModal from "./MeetingsModal";

const CalendarContainer = () => {
    const { showModal, toggleModal, modalIsOpen, dataToShow } = useModal();

    const dictionary = data.meetings.reduce((acc, val) => {
        const date = moment(val.start).format("YYYY-MM-DD")
        return { ...acc, [date]: [...(acc[date] ? acc[date] : []), val].sort(sorter) }
    }, {})

    return (
        <>
            <MeetingsModal
                dataToShow={dataToShow}
                toggleModal={toggleModal}
                modalIsOpen={modalIsOpen}
            />
            <Calendar dictionary={dictionary} showModal={showModal} />
        </>
    )

}

export default CalendarContainer;