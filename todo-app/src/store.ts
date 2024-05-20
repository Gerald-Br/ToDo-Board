import { reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  completed: boolean;
}
interface State {
  tasks: Task[];
}
const state: State = reactive({
  tasks: [{ id: uuidv4(), title: 'Learn Vue 3',description:'Test',priority: 1, completed: false},
    { id: uuidv4(), title: 'Learn Vuex',description:'Another Test',priority: 2, completed: true},
  ],
})
type Priority = 1 | 2 | 3

const priorityMap = {
  1: 'High',
  2: 'Medium',
  3: 'Low',
}
export function getPriority(priority: Priority) {
  return priorityMap[priority]
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