export enum Status {
  TODO = 'todo',
  DOING = 'doing',
  DONE = 'done',
  INCOMPLETE = 'incomplete',
  RESCHEDULED = 'rescheduled',
}

export type Task = {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  status: Status;
};
