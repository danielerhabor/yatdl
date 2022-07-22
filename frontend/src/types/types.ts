export enum Status {
  TODO = 'todo',
  DOING = 'doing',
  DONE = 'done',
  INCOMPLETE = 'incomplete',
  RESCHEDULED = 'rescheduled',
}

export interface TodoUI {
  key?: string;
  name: string;
  description: string;
  scheduled: string;
  status: Status;
}

