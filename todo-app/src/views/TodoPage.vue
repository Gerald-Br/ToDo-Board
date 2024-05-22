<template>
    <div class="container-sm border rounded-4 p-3 d-flex flex-column">
        <div>
            <h1>ToDo's</h1>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Priority</th>
                        <th scope="col">Category</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <transition-group name="slide-fade" tag="tbody">
                    <tr v-for="task in state.tasks" :key="task.id" tabindex="-1">
                        <TaskRow :task="task" @task-completed="updateTasks" @task-deleted="updateTasks"/>
                    </tr>
                </transition-group>
            </table>
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-primary" @click="showModal = true">
                    <i class="bi bi-plus-lg"></i>
                </button>
            </div>
            <TaskModal v-model:isVisible="showModal" :taskTitle="newTaskTitle" @task-added="updateTasks"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import TaskModal from '@/components/TaskModal.vue'
import TaskRow from '@/components/TaskRow.vue'
import { ref } from 'vue'
import state from '@/store'

const newTaskTitle = ref('')
const showModal = ref(false)

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

.bg-success {
    color: white;
}

.btn-complete.btn-outline-secondary:hover {
    /* Styles for when btn-complete also has btn-outline-secondary */
    transition: all .3s ease-in-out;
    background-color: var(--btn-complete-hover);
}

.btn-complete.btn-outline-light:hover {
    /* Styles for when btn-complete also has btn-outline-light */
    transition: all .3s ease-in-out;
    background-color: var(--btn-complete-reset-hover);
}

.btn-delete {
    transform: scale(1.5);
}

.btn-delete:hover {
    transition: all .3s ease-in-out;
    transform: scale(2);
    color: var(--btn-delete-hover);
}
</style>