export type TodoDataState = 'active' | 'completed';
export type TodoViewState = TodoDataState | 'all';
export interface TodoData {
    readonly id: number;
    title: string;
    state: TodoDataState;
}