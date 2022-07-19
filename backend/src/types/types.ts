export enum Status {
  TODO = 'todo',
  DOING = 'doing',
  DONE = 'done',
  INCOMPLETE = 'incomplete',
  RESCHEDULED = 'rescheduled',
}

export type Task = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  status: Status;
};
