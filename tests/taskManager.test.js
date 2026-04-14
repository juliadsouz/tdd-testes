import { describe, test, expect, beforeEach } from 'vitest';
import {removeTask, resetId, addTask } from '../src/taskManager.js';


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
