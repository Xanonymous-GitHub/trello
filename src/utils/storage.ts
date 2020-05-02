// eslint-disable-next-line
export function saveBoardPlugin(store: any) {
  store.subscribe(() => {
    localStorage.setItem("board", JSON.stringify(store.state.app.board));
  });
}
