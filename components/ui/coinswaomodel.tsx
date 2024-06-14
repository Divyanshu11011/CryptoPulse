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
    width: '80%',
    height: '80%'
  }
};

Modal.setAppElement('#__next');

const CoinSwapModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Coin Swap Modal"
    >
      <button onClick={onRequestClose}>Close</button>
      <iframe
        src="http://localhost:3001"
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Coin Swap"
      ></iframe>
    </Modal>
  );
};

export default CoinSwapModal;
