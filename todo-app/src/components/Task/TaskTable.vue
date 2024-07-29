<template>
    <div class="task-list">
        <transition-group v-if="hasTasks" name="slide-fade">
            <li class="task-list-item" v-for="task in props.tasks" :key="task.id" tabindex="-1">
                <TaskRow :task="task" />
            </li>
        </transition-group>
        <div v-else class="task-list-empty d-flex justify-content-center align-items-center">
            <img src="@/assets/images/list-check.svg" alt="Empty Todo List" class="" />
            <p>Your Todo List is empty</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import TaskRow from '@/components/Task/TaskRow.vue'
import type { PropType } from 'vue'
import type { Task } from '@/store'

const props = defineProps({
    tasks: {
        type: Array as PropType<Task[]>,
        default: () => []
    }
})
const hasTasks = computed(() => props.tasks.length > 0)
</script>

<style scoped lang="scss">
.slide-fade-leave-active {
    transition: all .7s ease;
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

    &-empty {
        display: flex;
        flex-direction: column;
        padding: 0.1rem 1rem;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: #e0e0e0;
        font-size: 2rem;
        line-height: 100%;
        text-align: center;
        font-weight: 500;

        img {
            max-width: 100%;
            width: 8rem;
            height: 8rem;
        }
    }

    @media only screen and (max-width: 768px) {
        &-item {
            padding: 0.5rem 1rem;
        }

        &-empty {
            font-size: 1.5rem;
        }

    }
}
</style>
