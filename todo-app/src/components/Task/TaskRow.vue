<template>
    <div :class="['d-flex', 'align-items-center', 'justify-content-between', { 'is-done': isTaskCompleted }]">
        <div class="d-flex align-items-center">
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" v-model="isTaskCompleted"
                    @click="handleCompleteTask(props.task.id)" />
            </div>
            <div class="m-2">
                {{ props.task.title }}
            </div>
        </div>
        <div class="d-flex align-items-center">
            <div class="me-3">
                <span :class="['badge', 'rounded-pill', getPriority(props.task.priority).class]">
                    <i class="bi bi-exclamation-circle-fill me-1"></i>
                    {{ getPriority(props.task.priority).label }}
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
                <button type="button" class="btn btn-sm btn-delete" @click="handleDeleteTask(props.task.id)">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/store'
import { defineProps } from 'vue'

const store = useTaskStore()
/*const categoryColorMap = store.categoryColorMap*/

const props = defineProps({
    task: {
        type: Object,
        default: () => ({ id: '', title: '', priority: 0 })
    }
})
const isTaskCompleted = store.isTaskCompleted(props.task.id)
const handleCompleteTask = (taskId: number) => {
    store.completeTask(taskId)
}

const handleDeleteTask = (taskId: number) => {
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