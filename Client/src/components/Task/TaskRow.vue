<template>
    <div :class="['d-flex', 'align-items-center', 'justify-content-between', { 'is-done': task.completed }]">
        <div class="d-flex align-items-center">
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" :checked="task.completed == true"
                    @click="handleCompleteTask(task._id)" />
            </div>
            <div class="m-2">
                {{ task.title }}
            </div>
        </div>
        <div class="d-flex align-items-center">
            <div class="me-3">
                <span :class="['badge', 'rounded-pill', getPriority(task.priority).class]">
                    <i class="bi bi-exclamation-circle-fill me-1"></i>
                    {{ getPriority(task.priority).label }}
                </span>
            </div>
            <!--<div class="me-3">
                <span v-if="props.task.category" class="badge rounded-pill"
                    :style="{ backgroundColor: categoryColorMap[props.task.category] || 'gray' }">
                    <i class="bi bi-tag-fill me-1"></i>
                    {{ props.task.category }}
                </span>
            </div>-->
            <div>
                <button type="button" class="btn btn-sm btn-delete" @click="handleDeleteTask(task._id)">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/store/taskStore'

const store = useTaskStore()

const { task } = defineProps<{
  task: {
    _id: string;
    title: string;
    priority: number;
    completed: boolean;
  }
}>()

const handleCompleteTask = (taskId: string) => {
    store.completeTask(taskId)
}

const handleDeleteTask = (taskId: string) => {
    console.log("Deleting ID: ", taskId)
    store.removeTask(taskId)
}

const getPriority = (priority: number) => {
    switch (priority) {
        case 1:
            return { label: 'High', class: 'bg-danger' };
        case 2:
            return { label: 'Medium', class: 'bg-warning' };
        case 3:
            return { label: 'Low', class: 'bg-success' };
        default:
            return { label: '', class: '' };
    }
}

</script>

<style scoped>
input[type="checkbox"] {
    transform: scale(1.5);
}

.btn-delete {
    transform: scale(1.5);
}

.btn-delete:hover {
    transition: all .3s ease-in-out;
    transform: scale(2);
    color: var(--btn-delete-hover);
}

.is-done {
    text-decoration: line-through;
    opacity: 0.5;
}
</style>