import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { Task } from '../../types/types';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { closeModal } from '../../features/modalSlice';

import styles from './Modal.module.css';

const Modal: React.FC<{
  task: Task;
  onSave: CallableFunction;
  onClose: CallableFunction;
}> = ({ task, onSave, onClose }) => {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    // on mount of the modal, set the title and description
    // of the modal to the name and description of the task
    if (task) {
      setDescription(task.description);
      setTitle(task.name);
    }
  }, [task]);

  const closeModal = () => {
    // clear the title and description
    clearModal();
    // close the modal
    onClose();
  };

  const clearModal = () => {
    setDescription('');
    setTitle('');
  };

  const saveHandler = () => {
    // print the title of the modal
    // and the text description
    // console.log(title);
    // console.log(description);
    // close the modal
    onSave(title, description);
  };

  const domModal = document.getElementById('root-modal') as HTMLElement;
  const reactModal = (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <header className="modalHeader">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="modalTaskName"
            placeholder="Enter task name..."
          ></input>
          <button onClick={closeModal} className="modalCloseButton">
            &times;
          </button>
        </header>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
