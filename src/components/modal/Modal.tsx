import ReactDOM from 'react-dom';
import { useAppDispatch } from '../../app/hooks';
import { setIsOpen } from '../../features/modalSlice';

const Modal: React.FC = () => {
  const dispatch = useAppDispatch();
  const closeModal = () => {
    dispatch(setIsOpen(false));
  };

  const domModal = document.getElementById('root-modal') as HTMLElement;
  const reactModal = (
    <div className="modalOverlay">
      <div className="modalContainer">
        <header className="modalHeader">
          <input
            className="modalTaskName"
            placeholder="Enter task name..."
          ></input>
          <button onClick={closeModal} className="modalCloseButton">&times;</button>
        </header>
        <textarea
          className="modalTextArea"
          placeholder="Enter task description..."
        ></textarea>
        <footer className="modalFooter">
          <button className="modalSaveButton">Save</button>
          <button className="modalCancelbutton">Cancel</button>
        </footer>
      </div>
    </div>
  );

  return ReactDOM.createPortal(reactModal, domModal);
};

export default Modal;