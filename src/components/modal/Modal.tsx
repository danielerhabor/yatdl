import { useState } from 'react';
import ReactDOM from 'react-dom';
import { useAppDispatch } from '../../app/hooks';
import { setIsOpen } from '../../features/modalSlice';

import styles from './Modal.module.css';

const Modal: React.FC = () => {
  const dispatch = useAppDispatch();
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');

  const closeModal = () => {
    // clear the title and description
    clearModal();
    dispatch(setIsOpen(false));
  };

  const clearModal = () => {
    setDescription('');
    setTitle('');
  };

  const saveHandler = () => {
    // print the title of the modal
    // and the text description
    console.log(title);
    console.log(description);

    // close the modal
    closeModal();
  };

  const domModal = document.getElementById('root-modal') as HTMLElement;
  const reactModal = (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <header className="modalHeader">
          <input
            
            onChange={e => setTitle(e.target.value)}
            className="modalTaskName"
            placeholder="Enter task name..."
          ></input>
          <button onClick={closeModal} className="modalCloseButton">
            &times;
          </button>
        </header>
        <textarea
          onChange={e => setDescription(e.target.value)}
          className="modalTextArea"
          placeholder="Enter task description..."
        ></textarea>
        <footer className="modalFooter">
          <button onClick={saveHandler} className="modalSaveButton">
            Save
          </button>
          <button onClick={closeModal} className="modalCancelbutton">
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );

  return ReactDOM.createPortal(reactModal, domModal);
};

export default Modal;
