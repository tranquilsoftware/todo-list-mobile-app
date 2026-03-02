import AsyncStorage from '@react-native-async-storage/async-storage';

import { STORAGE_KEY } from '../constants';
import { Todo } from '../types';

export const saveTodos = async (todos: Todo[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (e) {
    console.error('Failed to save todos:', e);
  }
};

export const loadTodos = async (): Promise<Todo[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? (JSON.parse(data) as Todo[]) : [];
  } catch (e) {
    console.error('Failed to load todos:', e);
    return [];
  }
};
