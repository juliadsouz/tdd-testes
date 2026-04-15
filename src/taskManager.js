let _nextId = 1;

export function resetId() {
  _nextId = 1;
}
//Exercício 1 - RemoveTask

export function addTask(tasks, title) {
  const newTask = createTask(title);

  return [...tasks, newTask];
}

export function removeTask(tasks, taskId) {
  return tasks.filter((task) => task.id !== taskId); }

//Exercício 2 - FilterTask

export function filterTask(tasks,status) {
  switch(status) {
    case 'completed':
      return tasks.filter((task) => task.completed === true);
    case 'pending':
       return tasks.filter((task) => task.completed === false);
    case 'all':
      default:
        return [...tasks];
  }
}

//Exercício 3 - Contagens

export function countTasks(tasks) {
 return tasks.length;
}

export function countCompleted(tasks) {
 return tasks.filter((task) => task.completed === true).length;
}

export function countPending(tasks) {
  return tasks.filter((task) => task.completed === false).length;
}

//Exercício 4 - Priority, ValidatePriority, filterByPriority

export function createTask(title, priority) {
  if (!['low', 'medium', 'high'].includes(priority)) {
    priority = 'medium';
  }
  return {
    id: _nextId++,
    title: title.trim(),
    priority: priority,
    completed: false,
    
  };
}

export function filterByPriority(tasks, priority) {
  return tasks.filter(t => t.priority === priority);
}

export function validatePriority(priority) {
    return ['low', 'medium', 'high'].includes(priority);
  }