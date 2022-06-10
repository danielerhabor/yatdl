import styles from './Modal.module.css';

import { RootState } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';
import { close } from '../../features/modal/modalSlice';

const backdropRoot = document.getElementById('backdrop-root') as HTMLElement;
const overlayRoot = document.getElementById('overlay-root') as HTMLElement;

const Backdrop: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div onClick={() => dispatch(close())} className={styles.backdrop}></div>
  );
};

const Modal: React.FC = () => {
  /* `useSelector` helps me "get" the state for particular reducer*/
  // const modal = useSelector((state: RootState) => state.modal.value);

  /* 
    `useDispatch` helps me "set" the state by dispatching an action that is registered for
    a particular reducer 
  */

  // Modal should probably be used in the app component, I think?
  const dispatch = useDispatch();
  return (
    <>
      {createPortal(<Backdrop />, backdropRoot)}
      {createPortal(
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <div>DATE_PICKER</div>
            <button
              className={styles.modalCloseBtn}
              type="button"
              onClick={() => dispatch(close())}
            >
              X
            </button>
          </div>
          <textarea name="task-descripton"></textarea>
          <div className={styles.modalFooter}>MODAL_FOOTER_HERE</div>
        </div>,
        overlayRoot
      )}
    </>
  );
};

export default Modal;
