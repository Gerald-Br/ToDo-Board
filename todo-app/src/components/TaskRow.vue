<template>
    <td class="d-flex align-items-center border-0">
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" @click="handleCompleteTask(props.task.id)" />
        </div>
        <div class="m-2">
            {{ props.task.title }}
        </div>
    </td>
    <td class="align-middle border-0">
        {{ getPriority(props.task.priority) }}
    </td>
    <td class="align-middle border-0">
        <span v-if="props.task.category" class="badge rounded-pill" :style="{backgroundColor: categoryColorMap[props.task.category] || 'gray'}">
            <i class="bi bi-tag-fill me-1"></i>
            {{ props.task.category }}
        </span>
    </td>
    <td class="align-middle border-0">
        <div class="ml-auto d-flex align-items-center">
            <button type="button" class="btn btn-sm btn-delete" @click="handleDeleteTask(props.task.id)">
                <i class="bi bi-trash"></i>
            </button>
        </div>
    </td>
</template>

<script setup lang="ts">
import { completeTask, removeTask, getPriority, categoryColorMap} from '@/store'
import { defineProps } from 'vue'

const props = defineProps({
    task: {
        type: Object,
        default: () => ({ id: '', title: '', category: ''}) // provide a default value
    }
})
const handleCompleteTask = (taskId: string) => {
    completeTask(taskId)
}
const handleDeleteTask = (taskId: string) => {
    removeTask(taskId)
}
</script>

<style scoped>
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