import { useState, useCallback } from 'react';

import { loadTodos, saveTodos } from '../storage/storage';
import { Todo } from '../types';

interface UseTodosReturn {
  todos: Todo[];
  reload: () => Promise<void>;
  addTodo: (title: string, description: string) => Promise<void>;
  finishTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

export function useTodos(): UseTodosReturn {
  const [todos, setTodos] = useState<Todo[]>([]);

  const reload = useCallback(async (): Promise<void> => {
    const data = await loadTodos();
    setTodos(data);
  }, []);

  const addTodo = useCallback(
    async (title: string, description: string): Promise<void> => {
      const current = await loadTodos();
      const newTodo: Todo = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        finished: false,
      };
      const updated = [...current, newTodo];
      await saveTodos(updated);
      setTodos(updated);
    },
    []
  );

  const finishTodo = useCallback(
    async (id: string): Promise<void> => {
      const updated = todos.map((t) => (t.id === id ? { ...t, finished: true } : t));
      setTodos(updated);
      await saveTodos(updated);
    },
    [todos]
  );

  const deleteTodo = useCallback(
    async (id: string): Promise<void> => {
      const updated = todos.filter((t) => t.id !== id);
      setTodos(updated);
      await saveTodos(updated);
    },
    [todos]
  );

  return { todos, reload, addTodo, finishTodo, deleteTodo };
}
