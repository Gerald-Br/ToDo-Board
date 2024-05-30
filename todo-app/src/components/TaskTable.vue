<template>
    <ul class="list-group list-group-flush">
        <transition-group name="slide-fade">
            <li class="list-group-item" v-for="task in props.tasks" :key="task.id" tabindex="-1">
                <TaskRow :task="task" @task-completed="updateTasks" @task-deleted="updateTasks" />
            </li>
        </transition-group>
    </ul>   
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import  state  from '@/store'
import TaskRow from '@/components/TaskRow.vue'
import type { PropType } from 'vue'
import type { Task } from '@/store'

const props = defineProps({
  tasks: {
    type: Array as PropType<Task[]>,
    default: () => []
  }
})
const updateTasks = () => {
    state.tasks = [...state.tasks]
}
</script>

<style scoped>
.slide-fade-leave-active {
    transition: all .9s ease;
    transform: translateX(+100%);
    opacity: 0;
}
.col-width {
    width: 25%; /* Adjust this value as needed */
}
.list-group {
    margin: 0;
    padding: 0;
}
</style>