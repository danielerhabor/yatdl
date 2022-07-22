import { AxiosError } from 'axios';
import { useState } from 'react';
import ReactDOM from 'react-dom';

import { TodoUI } from '../../types/types';
import { useDeleteTodo, useRefresh, useUpdateTodo } from '../../util/hooks';

import styles from './Modal.module.css';

import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Modal: React.FC<{
  todo: TodoUI;
  onClose: CallableFunction;
}> = ({ todo, onClose }) => {
  const [modalTodo, setModalTodo] = useState<TodoUI>(todo);
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();
  const refresh = useRefresh();

  const closeHandler = () => {
    clearModal();
    onClose();
  };

  const clearModal = () => {
    setModalTodo((prev: TodoUI) => ({ ...prev, name: '', description: '' }));
  };

  const saveHandler = async () => {
    try {
      const res = await updateTodo.mutateAsync(modalTodo);
      if (res.status !== 200) {
        throw new Error(`[ERROR] Response status: (${res.status})`);
      }
      refresh(modalTodo.scheduled);
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
      const res = await deleteTodo.mutateAsync(modalTodo);
      if (res.status !== 204) {
        throw new Error(`[ERROR] Response status: (${res.status})`);
      }
      refresh(modalTodo.scheduled);
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
          <p>{modalTodo.scheduled}</p>
          <button onClick={closeHandler} className="modalCloseButton">
            &times;
          </button>

          <button onClick={deleteHandler}><FontAwesomeIcon icon={faTrashAlt}/></button>
        </header>
        <div>
          <input
            value={modalTodo.name}
            onChange={(e) =>
              setModalTodo((prev: TodoUI) => ({ ...prev, name: e.target.value }))
            }
            className="modalTodoName"
            placeholder="Enter todo name..."
          ></input>
        </div>

        <textarea
          value={modalTodo.description}
          onChange={(e) =>
            setModalTodo((prev: TodoUI) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          className="modalTextArea"
          placeholder="Enter todo description..."
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
