import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
};
Modal.setAppElement('#root');

export default function ModalEnd(props) {
    const localCloseModal = () => {
      if(!props.passed){
        props.closeModal();
      }
    }

    return (
      <Modal  className="modal_content" isOpen={props.showModal} onRequestClose={localCloseModal} style={customStyles} >

        <div className="modal_info">
          <h2>{props.I18n.getTrans("i.modalheader2")}</h2>
          <p>{props.passed ? props.I18n.getTrans("i.congrats") + props.I18n.getTrans("i.congrats2"):props.I18n.getTrans("i.retry")}</p>
        </div>

          {!props.passed ?<div className="close_modal" onClick={props.closeModal}>
            <svg className="close_modal_icon" viewBox="0 0 14 14">
              <path d="M7.94 7l5.527-5.527a.667.667 0 00-.94-.94L7 6.06 1.473.527a.67.67 0 00-.946.946L6.06 7 .527 12.527a.667.667 0 10.94.94L7 7.94l5.527 5.527a.667.667 0 00.94-.94L7.94 7z"/>
            </svg>
          </div>:null}
      </Modal>);
}
