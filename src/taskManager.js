let _nextId = 1;

export function resetId() {
  _nextId = 1;
}

export function createTask(title) {
  return {
    id: _nextId++,
    title: title.trim(),
    completed: false,
  };
}

export function addTask(tasks, title) {
  const newTask = createTask(title);

  return [...tasks, newTask];
}

export function removeTask(tasks, taskId) {
  return tasks.filter((task) => task.id !== taskId); }

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