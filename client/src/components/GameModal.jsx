import React from "react";

const GameModal = ({ modalVisible, setModalVisible })=> {
    if (!modalVisible) return null;
    return (
        <div className="flex justify-center items-center fixed top-0 left-0 h-screen w-screen rounded p-4 max-h-screen overflow-hidden">
            <button onClick={() => setModalVisible(false)}>Kapat</button>
            Modal içeriği burada
        </div>
    );
  }

export default GameModal
