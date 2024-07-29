<template>
    <h1 class="d-flex justify-content-center mb-5">ToDo's</h1>
    <div class="container d-flex flex-column board">
        <header class="d-flex justify-content-end board-info">
            <div class="d-flex board-info-element">
                <span class="badge rounded-pill text-bg-primary">
                    Todo: {{ totalTasks }}
                </span>
            </div>
            <div class="d-flex board-info-element">
                <span class="badge rounded-pill text-bg-primary">
                    Done: {{ totalTasksDone }}
                </span>
            </div>
        </header>
        <div class="board-content">
            <TaskTable :tasks="allTasks" />
        </div>
        <div class="board-footer d-flex justify-content-end">
            <button type="button" class="btn btn-primary board-footer-add" @click="showModal = true">
                <i class="bi bi-plus-lg"></i>
            </button>
        </div>
    </div>
    <TaskModal v-model:isVisible="showModal" />
</template>

<script setup lang="ts">
import TaskModal from '@/components/Task/TaskModal.vue'
import TaskTable from '@/components/Task/TaskTable.vue'
import { ref, computed } from 'vue'
import { useTaskStore } from '@/store'

const store = useTaskStore()
const showModal = ref(false)

const allTasks = computed(() => store.alltasks)
const totalTasks = computed(() => store.totalTasks)
const totalTasksDone = computed(() => store.totalDoneTasks)

</script>

<style scoped lang="scss">
.board-info {
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    background-color: rgb(220, 220, 220);
}

.board-info-element {
    margin-right: 1rem;
}

.board {
    position: relative;
    width: 80%;
    max-width: 50rem;
    margin: 0 auto 3rem;
    overflow: hidden;
    transition: 0.5s ease-in-out 0s;
    background-color: white;

    &-footer {
        &-add {
            margin: 0.5rem 0.5rem 0.5rem 0.5rem;
        }
    }
}

.container {
    padding: 0;
    border-radius: 1rem;
}

.board-content {
    padding: 0 0.5rem;
}

.board-footer {
    padding: 0rem;
    margin: 0rem;
    background-color: rgb(220, 220, 220);
}

h1 {
    font-size: 4rem;
}
</style>