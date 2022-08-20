export enum Status {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE',
}

export class TodoUI {
  id?: number;
  title!: string;
  description?: string;
  scheduled!: string;
  status?: Status;
}
