import { useState, useEffect } from 'react';
import ClipboardJS from 'clipboard';
import {
  Button,
} from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShareButton = () => {
  const [buttonValue, setButtonValue] = useState('UsadRL');

  useEffect(() => {
    const clipboard = new ClipboardJS('#my-button');
    clipboard.on('success', (e) => {
    });
    clipboard.on('error', (e) => {
      console.error("Failed to copy text: ", e);
    });
    return () => clipboard.destroy();
  }, []);

  function handleButtonClick() {
    toast("successfully copied");
  }

  return (
    <div>
      <Button data-clipboard-text={buttonValue} onClick={handleButtonClick} id="my-button" color="gray">Click to copy URL</Button>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{ backgroundColor: "green" }}
      />
    </div>
  );
}

export default ShareButton
