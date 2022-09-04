const Status = {
  TODO: 'TODO',
  DOING: 'DOING',
  DONE: 'DONE'
};

export type Status = typeof Status;

export type TodoUI = {
  id?: number;
  title: string;
  description?: string;
  scheduled: string;
  status?: Status;
};
