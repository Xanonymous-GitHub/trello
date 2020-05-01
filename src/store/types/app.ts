export interface AppState {
  board: TrelloBoard;
}

export interface TrelloBoard {
  name: string;
  columns: Array<Column>;
}

interface Column {
  name: string;
  tasks: Array<Task>;
  id: string;
}

interface Task {
  description?: string;
  name: string;
  id: string;
  userAssigned?: boolean;
}
