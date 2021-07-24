import moment from 'moment';
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');
const MeetingsModal = ({ toggleModal, modalIsOpen, dataToShow }) => {

  function closeModal() {
    toggleModal();
  }

  const meetingMapper = () => dataToShow.map((val, index) => (
    <div className="meeting-box" key={`${val.meetingName}-${index}`}>
      <label>{val.name}</label>
      <label>{`${moment(val.start).utc().format("hh:mm")} - ${moment(val.end).utc().format("hh:mm")}`}</label>
      <label>{`Meeting Room: ${val.meetingRoom}`}</label>
    </div>
  ))


  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Meetings Modal"
        className="modal"
      >
        <button onClick={closeModal} className="close">x</button>
        <div className="meeting-container">
          {meetingMapper()}
        </div>
      </Modal>
    </div>
  );
}

export default MeetingsModal;