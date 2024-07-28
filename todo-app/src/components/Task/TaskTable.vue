<template>
    <div class="task-list">
        <transition-group name="slide-fade">
            <li class="task-list-item" v-for="task in props.tasks" :key="task.id" tabindex="-1">
                <TaskRow :task="task" />
            </li>
        </transition-group>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import TaskRow from '@/components/Task/TaskRow.vue'
import type { PropType } from 'vue'
import type { Task } from '@/store'

const props = defineProps({
    tasks: {
        type: Array as PropType<Task[]>,
        default: () => []
    }
})
</script>

<style scoped lang="scss">
.slide-fade-leave-active {
    transition: all .9s ease;
    transform: translateX(+100%);
    opacity: 0;
}

.task-list {
    display: flex;
    position: relative;
    flex-direction: column;
    list-style: none;

    &-item {
        display: flex;
        flex-direction: column;
        padding: 0.1rem 1rem;
        margin-bottom: 0.5rem;
        border-radius: 1rem;
        border: 2px solid #e0e0e0;
        transition: all .9s ease;
    }
}
</style>
