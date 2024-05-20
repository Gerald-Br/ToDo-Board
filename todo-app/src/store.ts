import { reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  title: string;
  priority: number;
  completed: boolean;
}
interface State {
  tasks: Task[];
}

const state: State = reactive({
  tasks: [{ id: uuidv4(), title: 'Learn Vue 3',priority: 1, completed: false},
    { id: uuidv4(), title: 'Learn Vuex',priority: 2, completed: false},
  ],
})

export function addTask(task: Task) {
  state.tasks.push(task)
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

export default state