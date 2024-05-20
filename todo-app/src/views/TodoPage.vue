<template>
    <div class="container-sm border rounded-4 p-3 d-flex flex-column">
        <div>
            <h1>ToDo's</h1>
            <transition-group name="slide-fade" tag="div">
                <div class="d-flex justify-content-between align-items-center mb-3 rounded-2"
                    v-for="task in state.tasks" :key="task.id" tabindex="-1">
                    <div class="m-2" :class="{ 'completed-task': task.completed }">
                        {{ task.title }}
                    </div>
                    <div class="ml-auto d-flex align-items-center">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox"
                                :class="{ 'btn-outline-secondary': !task.completed, 'btn-outline-light': task.completed }"
                                @click="handleCompleteTask(task.id)" />
                            <label class="form-check-label" for="flexCheckDefault"></label>
                        </div>
                        <button type="button" class="btn m-2 btn-sm btn-delete" @click="handleDeleteTask(task.id)">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </transition-group>
            <div class="border-bottom border-3 border-secondary d-flex align-items-center py-1 custom-bg-body">
        <input type="text" v-model="newTaskTitle" placeholder="Enter new task" class="border-0 custom-bg-body">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" :disabled="!newTaskTitle">
            <i class="bi bi-arrow-right"></i>
        </button>
    </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import state, { completeTask, removeTask } from '@/store'

const newTaskTitle = ref('')

const handleCompleteTask = (taskId: string) => {
    completeTask(taskId)
}
const handleDeleteTask = (taskId: string) => {
    removeTask(taskId)
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

input[type="text"] {
    border: none;
    outline: none;
    width: 100%;
}

.completed-task {
    position: relative;
}

.completed-task::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 10s linear;
}

.completed-task.completed::after {
    transform: scaleX(1);
}

.completed-task.completed::after {
    width: 100%;
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
    color: var(--btn-delete-hover);
}
</style>