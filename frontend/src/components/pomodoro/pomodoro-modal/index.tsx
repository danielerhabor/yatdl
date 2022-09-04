import { Modal, Typography } from '@mui/material';
import { Component } from 'react';

type PomodoroModalState = {
  isOpen: boolean;
};

export class PomodoroModal extends Component<PomodoroModalState> {
  // This is a modal that contains the `PomodoroTimer` component as it is counting down
  // The modal should be displayed when the user clicks the "Start" button on a `TodoItem`

  state: PomodoroModalState = {
    isOpen: false
  };

  render() {
    // const rootPomodoroModal = document.getElementById(
    //   'root-pomodoro-modal'
    // ) as HTMLElement;

    const modal = (
      <Modal open={this.state.isOpen}>
        <Typography variant="h3">Edit Pomodoro</Typography>
      </Modal>
    );
    return modal;
  }
}

export default PomodoroModal;
