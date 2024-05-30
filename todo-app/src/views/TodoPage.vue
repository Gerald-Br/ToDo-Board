<template>
    <div class="container-fluid p-2 d-flex flex-column">
        <h4>ToDo's</h4>
        <TaskTable :tasks="uncompletedTasks" @task-completed="updateTasks" @task-deleted="updateTasks" />
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-primary my-3" @click="showModal = true">
                    <i class="bi bi-plus-lg"></i>
                </button>
            </div>
            <h4>Done:</h4>
            <TaskModal v-model:isVisible="showModal" :taskTitle="newTaskTitle" @task-added="updateTasks" />
        <TaskTable :tasks="completedTasks" @task-completed="updateTasks" @task-deleted="updateTasks" />
    </div>
</template>

<script setup lang="ts">
import TaskModal from '@/components/TaskModal.vue'
import TaskTable from '@/components/TaskTable.vue'
import { ref, computed } from 'vue'
import state from '@/store'

const newTaskTitle = ref('')
const showModal = ref(false)
const uncompletedTasks = computed(() => state.tasks.filter(task => !task.completed));
const completedTasks = computed(() => state.tasks.filter(task => task.completed));

const updateTasks = () => {
    state.tasks = [...state.tasks]
}
</script>

<style>
:root {
    --btn-complete-hover: #82DD55;
    --btn-complete-reset-hover: #C8CDD0;
    --btn-delete-hover: #E23636;
}
</style>
<style scoped>
input[type="checkbox"] {
    transform: scale(1.5);
}

.slide-fade-leave-active {
    transition: all .9s ease;
    transform: translateX(+100%);
    opacity: 0;
}
</style>