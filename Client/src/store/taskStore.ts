import { defineStore } from 'pinia';
import { getTasks, createTask, updateTask, deleteTask } from '@/services/taskService';
export interface Task {
  _id: string;
  title: string;
  priority: Priority;
  category: string;
  completed: boolean;
}

export enum Priority {
  High = 1,
  Medium = 2,
  Low = 3,
  None = 0,
}

export const categoryColorMap: Record<string, string> = {
  Education: '#537a8d',
  Work: '#538d84',
}

const priorityMap = {
  0: 'None',
  1: 'High',
  2: 'Medium',
  3: 'Low',
}

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    /** @type {{id: number, title: string, description: string, priority: Priority, category: string, completed: boolean}[]} */
    tasks: [] as Task[],
    /** @type {'all' | 'finished' | 'unfinished'} */
    filter: 'all'
  }),
  getters: {
    finishedTasks: (state) => state.tasks.filter(task => task.completed),
    unfinishedTasks: (state) => state.tasks.filter(task => !task.completed),
    taskPriority: () => (priority: Priority) => priorityMap[priority],
    categoryColorMap: () => categoryColorMap,
    alltasks: (state) => state.tasks,
    totalTasks: (state) => state.tasks.filter(task => !task.completed).length,
    totalDoneTasks: (state) => state.tasks.filter(task => task.completed).length,
  },
  actions: {
    async fetchTasks() {
      this.tasks = await getTasks();
    },
    async addTask(title: string, priority: number, category: string) {
      const newTask = await createTask({ title, priority, category, completed: false });
      this.tasks.push(newTask);
    },
    async completeTask(taskId: string) {
      const task = this.tasks.find(task => task._id === taskId);
      if (task) {
        task.completed = !task.completed;
        await updateTask(taskId, { completed: task.completed });
      }
    },
    async removeTask(taskId: string) {
      await deleteTask(taskId);
      this.tasks = this.tasks.filter(task => task._id !== taskId);
    }
  },
});