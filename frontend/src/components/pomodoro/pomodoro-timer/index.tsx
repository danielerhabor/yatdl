import { Component } from 'react';
import Countdown from 'react-countdown';

type PomodoroTimerProps = {
  // This is the duration of the pomodoro session in minutes
  duration: number;
};

export class PomodoroTimer extends Component<PomodoroTimerProps> {
  // This is a timer that is counting down from some "time" (i.e 25:00 minutes) to 0:00
  // The timer should be displayed in the format "00:00"
  constructor(props: PomodoroTimerProps) {
    super(props);
  }

  render() {
    const { duration } = this.props;
    return (
      <Countdown
        controlled={true}
        date={duration}
        onComplete={() => console.log(`Timer finished...`)}
      />
    );
  }
}

export default PomodoroTimer;
