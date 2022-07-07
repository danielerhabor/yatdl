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
  const [taskState, setTaskState] = useState<Task>(task);

  // useEffect(() => {
  //   // on mount of the modal, set the title and description
  //   // of the modal to the name and description of the task
  //   if (task) {
  //     setDescription(task.description);
  //     setTitle(task.name);
  //   }
  // }, [task]);

  const closeHandler = () => {
    // clear the title and description
    clearModal();
    // close the modal
    onClose();
  };

  const clearModal = () => {
    setTaskState((prev) => ({ ...prev, name: '', description: '' }));
  };

  const saveHandler = () => {
    onSave(taskState);
  };

  const domModal = document.getElementById('root-modal') as HTMLElement;
  const reactModal = (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <header className="modalHeader">
          <input
            value={taskState.name}
            onChange={(e) =>
              setTaskState((prev: Task) => ({ ...prev, name: e.target.value }))
            }
            className="modalTaskName"
            placeholder="Enter task name..."
          ></input>
          <button onClick={closeHandler} className="modalCloseButton">
            &times;
          </button>
        </header>
        <textarea
          value={taskState.description}
          onChange={(e) =>
            setTaskState((prev) => {
              console.log(e.target.value);
              console.log(taskState);
              return { ...prev, description: e.target.value };
            })
          }
          className="modalTextArea"
          placeholder="Enter task description..."
        ></textarea>
        <footer className="modalFooter">
          <button onClick={saveHandler} className="modalSaveButton">
            Save
          </button>
          <button onClick={closeHandler} className="modalCancelbutton">
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );

  return ReactDOM.createPortal(reactModal, domModal);
};

export default Modal;
