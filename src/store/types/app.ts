export interface AppState {
  board: Board;
}

interface Board {
  name: string;
  columns: Array<Column>;
}

interface Column {
  name: string;
  tasks: Array<Task>;
}

interface Task {
  description?: string;
  name: string;
  id: string;
  userAssigned?: boolean;
}
