<template>
  <v-row>
    <v-col>
       {{ activeTodos.length }} items left
    </v-col>
    <v-col>
      <v-btn-toggle>
        <router-link to="/all">
          <v-btn small>All</v-btn>
        </router-link>
        <router-link to="/active">
          <v-btn small>Active</v-btn>
        </router-link>
        <router-link to="/completed">
          <v-btn small>Completed</v-btn>
        </router-link>
      </v-btn-toggle>
    </v-col>
    <v-col>
      <v-btn
          small
          :class="{ hidden: getClearButtonState }"
          @click="$emit('clearCompletedTodo')"
      >
        Clear Completed
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { TodoData } from '@/types';

@Component
export default class TodoFooter extends Vue {
  @Prop({ required: true }) readonly activeTodos!: TodoData[];
  @Prop({ required: true }) readonly completedTodos!: TodoData[];

  get getClearButtonState(): string {
    return this.completedTodos.length > 0 ? "" : "hidden";
  }
}
</script>

<style scoped>
.hidden {
  visibility: hidden;
}
</style>