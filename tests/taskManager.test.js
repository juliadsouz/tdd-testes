import { describe, test, expect, beforeEach } from 'vitest';
import {
  toggleTask,
  removeTask,
  resetId,
  addTask,
  filterTask,
  countTasks,
  countPending,
  countCompleted, 
  createTask,
  validatePriority,
  filterByPriority,
  isDuplicate,
  searchTasks} from '../src/taskManager.js';

  describe('toggleTask', () => {
    beforeEach(() => {
      resetId();
    });
  
    test('deve marcar uma tarefa pendente como concluída', () => {
      const task = createTask('Tarefa pendente');
      const toggled = toggleTask(task);
  
      expect(toggled.completed).toBe(true);
    });
  
    test('deve desmarcar uma tarefa concluída', () => {
      const task = createTask('Tarefa pendente');
      const completed = toggleTask(task);
      const uncompleted = toggleTask(completed);
  
      expect(uncompleted.completed).toBe(false);
    });
  
    test('deve manter o id e o título inalterados', () => {
      const task = createTask('Minha tarefa');
      const toggled = toggleTask(task);
  
      expect(toggled.id).toBe(task.id);
      expect(toggled.title).toBe(task.title);
    });
  
    test('deve retornar um novo objeto (imutabilidade)', () => {
      const task = createTask('Tarefa original');
      const toggled = toggleTask(task);
  
      expect(toggled).not.toBe(task);
      expect(task.completed).toBe(false);
    });
  });

describe('removeTask', () => {
 let tasks;

  beforeEach(() => {
    resetId();
    tasks = addTask([], 'Tarefa 1');
    tasks = addTask(tasks, 'Tarefa 2');
    tasks = addTask(tasks, 'Tarefa 3');

  });

 
  test('deve remover uma tarefa pelo ID', () => {
   const updated = removeTask(tasks, 2);

    expect(updated).toHaveLength(2);
    expect(updated.find((t) => t.id === 2)).toBeUndefined();
  });

  test('deve manter as outras tarefas intactas', () => {
    const updated = removeTask(tasks,2);

    expect(updated[0].title).toBe('Tarefa 1');
    expect(updated[1].title).toBe('Tarefa 3');
  });

  test('deve retornar um novo array (imutabilidade)', () => {
    const updated = removeTask(tasks, 1);

    expect(updated).not.toBe(tasks);
    expect(tasks).toHaveLength(3);
  });

  test('deve retornar a lista completa se o ID não existir', () => {
    const updated = removeTask(tasks, 999);

    expect(updated).toHaveLength(3);
  });

  test('Lista vazia retorna array vazio', () => {
    expect(removeTask([], 1)).toHaveLength(0);
});

});

describe('filterTask', () => {
  let tasks;

  beforeEach(() => {
    resetId();
    tasks = addTask([], 'Tarefa 1');
    tasks = addTask(tasks, 'Tarefa 2');
    tasks = addTask(tasks, 'Tarefa 3');

    tasks = tasks.map((t) => (t.id === 2 ? { ...t, completed: !t.completed } : t));
  });

  test('deve retornar todas as tarefas com o filtro "all"', () => {
    const result = filterTask(tasks, 'all');
  expect(result).toHaveLength(3);
});
  test('deve retornar apenas pendentes com filtro "pending"', () => {
    const result = filterTask(tasks, 'pending');

    expect(result).toHaveLength(2);
    result.forEach((t) => expect(t.completed).toBe(false));
  });

  test('deve retornar apenas concluídas com filtro "completed"', () => {
    const result = filterTask(tasks, 'completed');

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Tarefa 2');
    expect(result[0].completed).toBe(true);
  });
})

describe('countTasks', () => { 
  test('deve retornar 0 para lista vazia', () => {
   expect(countTasks([])).toBe(0);
  });

  test('deve retornar o total de tarefas', () => {
    resetId();
    let tasks = addTask([], 'Tarefa 1');
    tasks = addTask(tasks, 'Tarefa 2');
    tasks = addTask(tasks, 'Tarefa 3');

    expect(countTasks(tasks)).toBe(3);
  });

  });
 describe('countCompleted', () => {
    let tasks;

  beforeEach(() => {
    resetId();
    tasks = addTask([], 'Tarefa 1');
    tasks = addTask(tasks, 'Tarefa 2');
    tasks = addTask(tasks, 'Tarefa 3');
    tasks = tasks.map((t) => (t.id <= 2 ? { ...t, completed: !t.completed } : t));
  });

  test('deve retornar 0 para lista vazia', () => {
    expect(countCompleted([])).toBe(0);
  });

  test('deve contar corretamente as tarefas concluídas', () => {
   expect(countCompleted(tasks)).toBe(2);
  });

  test('deve retornar 0 quando nenhuma tarefa está concluída', () => {
    resetId();
    let noCompleted = addTask([], 'Tarefa A');
    noCompleted = addTask(noCompleted, 'Tarefa B');

    expect(countCompleted(noCompleted)).toBe(0);
  });
  });

describe('countPending', () => {
  let tasks;

  beforeEach(() => {
    resetId();
    tasks = addTask([], 'Tarefa 1');
    tasks = addTask(tasks, 'Tarefa 2');
    tasks = addTask(tasks, 'Tarefa 3');
    tasks = tasks.map((t) => (t.id === 1 ? { ...t, completed: !t.completed } : t));
  });

    test('deve retornar 0 para lista vazia', () => {
    expect(countCompleted([])).toBe(0);
  });

  test('deve contar corretamente as tarefas pendentes', () => {
    expect(countPending(tasks)).toBe(2);
  });

  test('deve retornar 0 quando todas as tarefas estão concluídas', () => {
    const allCompleted = tasks.map((t) => ({ ...t, completed: true }));

    expect(countPending(allCompleted)).toBe(0);
  });
  });
  
describe('createTask', () => {

   test('deve retornar objeto com priority: high', () => {
    const task = createTask('Estudar', 'high');

    expect(task.priority).toBe('high');
  });

  test('deve usar medium quando priority não for informada', () => {
  const task = createTask('Tarefa');

  expect(task.priority).toBe('medium');
});
})

describe('validatepriority', () => {

   test('deve retornar true para objeto com priority: high', () => {
    const task = createTask('Estudar', 'high');

    expect(validatePriority(task.priority)).toBe(true);
  });

  test('deve retornar false para prioridade inválida', () => {
  const task = createTask('Tarefa');
  task.priority = 'urgente'

  expect(validatePriority(task.priority)).toBe(false);
});
})

describe('filterByPriority', () => {
  let tasks;

  beforeEach(() => {

 resetId();
    tasks = addTask([], 'Tarefa 1');
    tasks = addTask(tasks, 'Tarefa 2');
    tasks = addTask(tasks, 'Tarefa 3');
    tasks = tasks.map((t) => (t.id === 1 ? { ...t, priority: 'high'} : t));
  });

   test('deve retornar apenas tarefas de alta prioridade', () => {
    expect(filterByPriority(tasks,'high')).toHaveLength(1);
  });  
})

describe('isDuplicated', () => {

  test('deve retornar true para título igual', () => {
    const tasks = [{ title: 'Estudar' }];
    expect(isDuplicate(tasks, 'Estudar')).toBe(true);
  });

  test('deve retornar true para título igual ignorando maiuscula/minuscula', () => {
    const tasks = [{ title: 'Estudar' }];
  expect(isDuplicate(tasks, 'estudar')).toBe(true);
});

  test('deve retornar false para título diferente', () => {
  const tasks = [{ title: 'Estudar' }];
  expect(isDuplicate(tasks, 'Trabalhar')).toBe(false);
});

  test('deve retornar erro quando existir título igual', () => {
  const tasks = [{title: 'Estudar'}];
  expect(() => addTask(tasks, 'Estudar')).toThrow('Tarefa duplicada')

})
  })

  describe('sortTasks', () => {

    test('deve encontrar tarefas que contêm o texto', () => {
      const tasks = [
        { title: 'Estudar' },
        { title: 'Testar' },
        { title: 'Trabalhar' }
      ];
    
      const result = searchTasks(tasks, 'est');
    
      expect(result).toHaveLength(2);
    });
  
    test('deve funcionar case-insensitive', () => {
      const tasks = [
        { title: 'Estudar' },
        { title: 'Testar' }
      ];
    
      const result = searchTasks(tasks, 'EST');
    
      expect(result).toHaveLength(2);
    });
  
    test('deve retornar vazio quando não encontra', () => {
      const tasks = [{ title: 'Estudar' }];
    
      const result = searchTasks(tasks, 'xyz');
    
      expect(result).toEqual([]);
    });
  
    test('deve retornar vazio com lista vazia', () => {
      const result = searchTasks([], 'algo');
    
      expect(result).toEqual([]);
    });

    test('deve retornar todas as tarefas quando query vazia', () => {
      const tasks = [
        { title: 'Estudar' },
        { title: 'Testar' }
      ];
    
      const result = searchTasks(tasks, '');
    
      expect(result).toHaveLength(2);
    });
    })