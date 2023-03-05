import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function CustomModal({ isOpen, onClose }) {
    let subtitle;

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    return (
        <Modal
            isOpen={isOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={onClose}
            style={customStyles}
            ariaHideApp={false}
            contentLabel="Example Modal"
        >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
            <button onClick={onClose}>close</button>
            
            
        </Modal>
    );
}

export default CustomModal
