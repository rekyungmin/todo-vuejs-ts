<template>
  <div
      @mouseenter='hasMousePointer=true'
      @mouseleave='hasMousePointer=false'
  >
    <v-list-item>
      <v-checkbox v-model='state'/>
      <label :class='{"todo-completed": state}'>{{ todo.title }}</label>
      <v-spacer/>
      <v-icon
          medium
          v-if='hasMousePointer'
          @click='$emit("removed", index)'
      >
        mdi-alpha-x-circle
      </v-icon>
    </v-list-item>
    <v-divider/>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import { TodoData } from '@/types';

@Component
export default class TodoListItem extends Vue {
  @Prop({ required: true }) readonly todo!: TodoData;
  @Prop({ required: true }) readonly index!: number;

  hasMousePointer: boolean = false;
  public get state(): boolean {
    return this.todo.state === 'completed';
  }
  public set state(value: boolean) {
    this.todo.state = value ? 'completed' : 'active';
  }
}
</script>

<style scoped>
.todo-completed {
  text-decoration: line-through;
  color:#d9d9d9;
}
</style>