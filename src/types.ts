export type TodoDataState = 'active' | 'completed';
export type TodoViewState = TodoDataState | 'all';
export interface TodoData {
    id: number;
    title: string;
    state: TodoDataState;
}