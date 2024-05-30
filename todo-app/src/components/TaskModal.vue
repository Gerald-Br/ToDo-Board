<template>
    <transition name="fade">
        <div v-if="isVisible" class="modal show d-block" tabindex="-1" @click.self="closeModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Create a ToDo</h1>
                        <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="addNewTask">
                            <div class="mb-3">
                                <label for="TitleInput" class="form-label fw-light">Title*</label>
                                <input type="text" class="form-control" v-model="title" id="TitleInput" required />
                            </div>
                            <div class="mb-3">
                                <label for="DescriptionInput" class="form-label fw-light">Description</label>
                                <input type="text" class="form-control" v-model="description" id="DescriptionInput">
                            </div>
                            <div class="mb-3">
                                <label for="PriorityInput" class="form-label fw-light">Priority</label>
                                <div id="PriorityInput">
                                    <input type="radio" class="btn-check" name="priority-options" id="option5"
                                        autocomplete="off" v-model="priority" value="3" checked>
                                    <label class="btn me-2" for="option5">Low</label>
                                    <input type="radio" class="btn-check" name="priority-options"
                                        id="option6" autocomplete="off" v-model="priority" value="2">
                                    <label class="btn me-2" for="option6">Medium</label>
                                    <input type="radio" class="btn-check" name="priority-options" id="option7"
                                        autocomplete="off" v-model="priority" value="1">
                                    <label class="btn" for="option7">High</label>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="CategoryInput" class="form-label fw-light">Category</label>
                                <div class="border border-2 p-2 rounded-3 d-flex flex-wrap">
                                    <div id="CategoryInput" v-for="(category, index) in getCategoryColorMapEntries()"
                                        :key="index">
                                        <button type="button" class="btn badge rounded-pill m-1"
                                            :class="{ 'selected': selectedCategory === category[0] }"
                                            :style="{ backgroundColor: category[1] || 'gray' }"
                                            @click="handleCategoryClick(category[0])">
                                            <i class="bi bi-tag-fill me-1"></i>
                                            {{ category[0] }}
                                        </button>
                                    </div>
                                    <button type="button" class="btn btn-secondary badge rounded-pill m-1">
                                        <i class="bi bi-plus-lg"></i> 
                                    </button>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { addTask, getCategoryColorMapEntries, Priority } from '@/store';
import type { Task } from '@/store'
import { defineProps, defineEmits, ref } from 'vue'
import { v4 } from 'uuid'

defineProps({
    isVisible: Boolean,
})

const emit = defineEmits(['update:isVisible'])
const title = ref('')
const description = ref('')
const priority = ref<Priority>(Priority.Low)
const selectedCategory = ref('')

const addNewTask = () => {
    const task: Task = {
        id: v4(),
        title: title.value,
        description: description.value,
        priority: priority.value,
        category: selectedCategory.value,
        completed: false
    }
    addTask(task)
    resetForm()
    emit('update:isVisible', false)
}
const closeModal = () => {
    emit('update:isVisible', false)
}
const resetForm = () => {
    title.value = ''
    description.value = ''
    priority.value = Priority.Low
    selectedCategory.value = ''
}
const handleCategoryClick = (category: string) => {
    selectedCategory.value = category
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}

.task-title {
    font-size: 1.5rem;
    font-weight: bold;
}

.selected {
    border: 2px solid black !important;
}
</style>