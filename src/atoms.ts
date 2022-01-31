import { atom } from "recoil";

export interface ITodo {
  id: number;
  todo: string;
}

export interface ITodoListState {
  [key: string]: ITodo[];
}

export const todoListState = atom<ITodoListState>({
  key: "todoListState",
  default: JSON.parse(
    localStorage.getItem("todoListState") || `{"todo":[],"doing":[],"done":[]}`
  ),
});
