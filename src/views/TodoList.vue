<template>
  <div class='todo-list'>
    <v-text-field
      outlined
      autofocus
      placeholder='What needs to be done?'
      v-model='newTodoTitle'
      @keyup.enter='push'
    />
    <div :class='{ outline: this.todos }'>
      <TodoListItem
          v-for='(todo, index) in view'
          :key='todo.id'
          :index="index"
          :todo='todo'
          @removed='pop'
      />
    </div>
    <TodoFooter
      :activeTodos='activeTodos'
      :completedTodos='completedTodos'
      @clearCompletedTodo="todos=activeTodos"
      />
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import TodoListItem from '@/components/TodoListItem.vue';
import TodoFooter from '@/components/TodoFooter.vue';
import {TodoDataState, TodoViewState, TodoData} from '@/types';

class TodoDataImpl implements TodoData {
  state: TodoDataState;
  title: string;
  constructor(readonly id: number, title: string, state: TodoDataState = 'active') {
    this.title = title;
    this.state = state;
  }
}

@Component({
  components: {
    TodoListItem,
    TodoFooter,
  }
})
export default class TodoList extends Vue {
  viewState: TodoViewState = 'all';
  todos: TodoData[] = [];
  newTodoTitle = '';
  lastIndex = 1;

  get view(): TodoData[] {
    if (this.viewState === 'all') return this.todos;
    else if (this.viewState === 'active') return this.activeTodos;
    else return this.completedTodos;
  }
  get activeTodos(): TodoData[] {
    return this.todos.filter(todo => todo.state === 'active');
  }
  get completedTodos(): TodoData[] {
    return this.todos.filter(todo => todo.state === 'completed');
  }
  @Watch('$route.params.state')
  switchView(view: TodoViewState): void {
    this.viewState = view || 'all';
  }
  push(): void {
    const title = this.newTodoTitle.trim();
    if (title.length === 0) return;
    const id = this.lastIndex++;
    this.todos.push(new TodoDataImpl(id, title));
    this.newTodoTitle = '';
  }
  pop(index: number): void {
    this.todos.splice(index, 1);
  }
}
</script>

<style scoped>
.outline {
  border: 1px rgba(0, 0, 0, 0.12) solid;
}
</style>
