export enum Status {
  TODO,
  DOING,
  DONE,
  INCOMPLETE,
  RESCHEDULED,
};

export type Task = {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  status: Status;
};