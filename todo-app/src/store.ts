import { reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  category: string;
  completed: boolean;
}
interface State {
  tasks: Task[];
}
const state: State = reactive({
  tasks: [{ id: uuidv4(), title: 'Learn Vue 3',description:'Test',priority: 1,category:'Education', completed: false},
    { id: uuidv4(), title: 'Learn Vuex',description:'Another Test',priority: 2,category:'Education', completed: true},
    { id: uuidv4(), title: 'Do Something',description:'Test',priority: 3,category:'Work', completed: false},
  ],
})
export enum Priority {
  High = 1,
  Medium = 2,
  Low = 3
}

export const categoryColorMap: Record<string, string> = {
  Education: '#537a8d',
  Work: '#538d84',
}

export function getFinishedTasks() {
  return state.tasks.filter(task => task.completed);
}

const priorityMap = {
  1: 'High',
  2: 'Medium',
  3: 'Low',
}
export function getPriority(priority: Priority) {
  return priorityMap[priority]
}
export function addCategory(category: string, color: string) {
  categoryColorMap[category] = color
}
export function getCategoryColorMapEntries() {
  return Object.entries(categoryColorMap);
}
export function addTask(task: Task) {
  state.tasks = [...state.tasks, task];
}

export function completeTask(taskId: string) {
  const task = state.tasks.find(task => task.id === taskId)
  if (task) {
    task.completed = !task.completed
  }
}

export function removeTask(taskId: string) {
  const index = state.tasks.findIndex(task => task.id === taskId)
  if (index !== -1) {
    state.tasks.splice(index, 1)
  }
}

export function getTasks() {
  return state.tasks
}

export default state