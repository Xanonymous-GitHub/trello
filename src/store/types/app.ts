export interface AppState {
  board: TrelloBoard;
}

export interface TrelloBoard {
  name: string;
  columns: Array<TrelloColumn>;
}

export interface TrelloColumn {
  name: string;
  tasks: Array<TrelloTask>;
  id: string;
}

export interface TrelloTask {
  description?: string;
  name: string;
  id?: string;
  userAssigned?: boolean;
}
