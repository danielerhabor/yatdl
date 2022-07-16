import { AxiosError } from 'axios';
import { useState } from 'react';
import ReactDOM from 'react-dom';

import { Task } from '../../types/types';
import { useDeleteTask, useRefresh, useUpdateTask } from '../../util/hooks';

import styles from './Modal.module.css';

import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Modal: React.FC<{
  task: Task;
  onClose: CallableFunction;
}> = ({ task, onClose }) => {
  const [modalTask, setModalTask] = useState<Task>(task);
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const refresh = useRefresh();

  const closeHandler = () => {
    clearModal();
    onClose();
  };

  const clearModal = () => {
    setModalTask((prev: Task) => ({ ...prev, name: '', description: '' }));
  };

  const saveHandler = async () => {
    try {
      const res = await updateTask.mutateAsync(modalTask);
      if (res.status !== 200) {
        throw new Error(`[ERROR] Response status: (${res.status})`);
      }
      refresh(modalTask.created_at);
      closeHandler();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(`[AXIOS_ERROR]- ${error.message}`);
      } else {
        console.error(error);
      }
    }
  };

  const deleteHandler = async () => {
    try {
      const res = await deleteTask.mutateAsync(modalTask);
      if (res.status !== 204) {
        throw new Error(`[ERROR] Response status: (${res.status})`);
      }
      refresh(modalTask.created_at);
      closeHandler();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(`[AXIOS_ERROR] - ${error.message}`);
      } else {
        console.error(error);
      }
    }
  };

  const domModal = document.getElementById('root-modal') as HTMLElement;
  const reactModal = (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>

        <header className={styles.modalHeader}>
          <p>{modalTask.created_at}</p>
          <button onClick={closeHandler} className="modalCloseButton">
            &times;
          </button>

          <button onClick={deleteHandler}><FontAwesomeIcon icon={faTrashAlt}/></button>
        </header>
        <div>
          <input
            value={modalTask.name}
            onChange={(e) =>
              setModalTask((prev: Task) => ({ ...prev, name: e.target.value }))
            }
            className="modalTaskName"
            placeholder="Enter task name..."
          ></input>
        </div>

        <textarea
          value={modalTask.description}
          onChange={(e) =>
            setModalTask((prev: Task) => ({
              ...prev,
              description: e.target.value,
            }))
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
