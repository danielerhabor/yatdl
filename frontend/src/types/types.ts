export enum Status {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE',
}

export interface TodoUI {
  key?: number;
  title: string;
  description?: string;
  scheduled: string;
  status?: Status;
}
