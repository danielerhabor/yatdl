import { useState } from 'react';
import ReactDOM from 'react-dom';

import { Task } from '../../types/types';
import { useRefresh, useUpdateTask } from '../../util/hooks';

import styles from './Modal.module.css';

const Modal: React.FC<{
  task: Task;
  onSave: CallableFunction;
  onClose: CallableFunction;
}> = ({ task, onSave, onClose }) => {
  const [modalTask, setModalTask] = useState<Task>(task);
  const updateTask = useUpdateTask();
  const refresh = useRefresh();

  const closeHandler = () => {
    clearModal();
    onClose();
  };

  const clearModal = () => {
    setModalTask((prev: Task) => ({ ...prev, name: '', description: '' }));
  };

  const saveHandler = async () => {
    updateTask
      .mutateAsync(modalTask)
      .then((res) => {
        if (res.status === 200) {
          console.log(`Axios response - ${res.statusText}`);
          refresh(modalTask.created_at);
          closeHandler();
        } else {
          console.log('something!', res);
        }
      })
      .catch((err) => {
        console.log(`Axios error - ${err}`);
      });
  };

  const domModal = document.getElementById('root-modal') as HTMLElement;
  const reactModal = (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <header className="modalHeader">
          <input
            value={modalTask.name}
            onChange={(e) =>
              setModalTask((prev: Task) => ({ ...prev, name: e.target.value }))
            }
            className="modalTaskName"
            placeholder="Enter task name..."
          ></input>
          <button onClick={closeHandler} className="modalCloseButton">
            &times;
          </button>
        </header>
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
