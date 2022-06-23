import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { Task } from '../../types/types';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { closeModal } from '../../features/modalSlice';

import styles from './Modal.module.css';

const Modal: React.FC = () => {
  const dispatch = useAppDispatch();
  const task: Task = useAppSelector((state) => state.modal.task) as Task;

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

  const close = () => {
    // clear the title and description
    clearModal();
    dispatch(closeModal());
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
    close();
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
          <button onClick={close} className="modalCloseButton">
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
          <button onClick={close} className="modalCancelbutton">
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );

  return ReactDOM.createPortal(reactModal, domModal);
};

export default Modal;
