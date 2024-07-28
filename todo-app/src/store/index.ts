import { defineStore } from 'pinia';

export interface Task {
  id: number;
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
    tasks: [
      { id: 1, title: 'Learn Vue 3', priority: Priority.High, category: 'Education', completed: false },
      { id: 2, title: 'Learn Vuex', priority: Priority.Medium, category: 'Education', completed: true },
      { id: 3, title: 'Do Something', priority: Priority.Low, category: 'Work', completed: false },
    ] as Task[],
    /** @type {'all' | 'finished' | 'unfinished'} */
    filter: 'all',
    nextId: 4,
  }),
  getters: {
    finishedTasks: (state) => state.tasks.filter(task => task.completed),
    unfinishedTasks: (state) => state.tasks.filter(task => !task.completed),
    taskPriority: () => (priority: Priority) => priorityMap[priority],
    categoryColorMap: () => categoryColorMap,
    alltasks: (state) => state.tasks,
    totalTasks: (state) => state.tasks.filter(task => !task.completed).length,
    totalDoneTasks: (state) => state.tasks.filter(task => task.completed).length,
    isTaskCompleted: (state) => (taskId: number) => {
      const task = state.tasks.find(task => task.id === taskId);
      return task ? task.completed : false;
    }
  },
  actions: {
    addCategory(category: string, color: string) {
      categoryColorMap[category] = color;
    },
    addTask(title: string, priority: number, category: string) {
      const newTask = {
        id: this.nextId++,
        title,
        priority,
        category,
        completed: false,
      };
      this.tasks.push(newTask);
    },
    completeTask(taskId: number) {
      const task = this.tasks.find(task => task.id === taskId);
      if (task) {
        task.completed = !task.completed;
      }
    },
    removeTask(taskId: number) {
      const index = this.tasks.findIndex(task => task.id === taskId);
      if (index !== -1) {
        this.tasks.splice(index, 1);
      }
    },
  },
});