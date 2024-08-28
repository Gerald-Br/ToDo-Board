<template>
    <div class="container d-flex flex-column board shadow">
        <header class="d-flex justify-content-end board-header">
            <div class="d-flex board-header-element">
                <span class="badge rounded-pill text-bg-primary">
                    Todo: {{ totalTasks }}
                </span>
            </div>
            <div class="d-flex board-header-element">
                <span class="badge rounded-pill text-bg-primary">
                    Done: {{ totalTasksDone }}
                </span>
            </div>
            <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar w-75"></div>
</div>
        </header>
        <div class="board-content my-1">
            <TaskTable :tasks="allTasks" />
        </div>
        <div class="board-footer d-flex justify-content-end">
            <button type="button" class="btn btn-primary rounded-circle board-footer-add" @click="showModal = true">
                <i class="bi bi-plus-lg"></i>
            </button>
        </div>
    </div>
    <TaskModal v-model:isVisible="showModal" />
</template>

<script setup lang="ts">
import TaskModal from '@/components/Task/TaskModal.vue'
import TaskTable from '@/components/Task/TaskTable.vue'
import { ref, computed, onMounted } from 'vue'
import { useTaskStore } from '@/store/taskStore'

const store = useTaskStore()
const showModal = ref(false)

const allTasks = computed(() => store.alltasks)
const totalTasks = computed(() => store.totalTasks)
const totalTasksDone = computed(() => store.totalDoneTasks)

console.log("All Tasks:", allTasks)

onMounted(() => {
    store.fetchTasks()
})
</script>

<style scoped lang="scss">
.board-header {
    padding: 0.5rem;


    &-element {
        margin-right: 1rem;
    }
}
.board-footer, .board-header {
    background: linear-gradient(90deg, rgba(238, 231, 217, 0.945), rgb(201, 230, 230));
}

.board {
    width: 100%;
    margin: 0 0 2rem 0;
    overflow: hidden;
    transition: 0.5s ease-in-out 0s;
    background-color: white;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.6);

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

    .btn{
        width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            flex-shrink: 0;
    }
}

h1 {
    font-size: 4rem;
}
</style>